import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { Http} from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Market } from '@ionic-native/market';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';

import { OrderhistoryPage } from '../pages/orderhistory/orderhistory';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { PasswordPage } from '../pages/password/password';
import { NotificationPage } from '../pages/notification/notification';
import { OffersPage } from '../pages/offers/offers';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ShopsettingsPage } from '../pages/shopsettings/shopsettings';
// import { Signup2Page } from '../pages/signup2/signup2';

import { SubcategoryPage } from '../pages/subcategory/subcategory';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public Data: any;
  public response: any;
  public list: any;
  public usermobile: any;
  public canshopmobile: any;
  public groceryshopmobile: any;
  public username: any;
  public type: any;
  public offer: any;
  public shoptype:any;
  public version: any = "0.0.3";
  pages: Array<{ title: string, icon: string, component: any }>;
  pushPages: Array<{ title: string, icon: string, component: any }>;


  constructor(
    public platform: Platform,
    public menu: MenuController,
    public app: App,
    public http: Http,
    private androidPermissions: AndroidPermissions,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public _OneSignal: OneSignal,
    public alertCtrl: AlertController,
    private market:Market
  ) {
    this.initializeApp();
    this.rootPage = TabsNavigationPage;
    this.usermobile = localStorage.getItem('usermobile');
    this.canshopmobile = localStorage.getItem('canshopmobile');
    this.groceryshopmobile = localStorage.getItem('groceryshopmobile');
    this.username = localStorage.getItem('username');
    // this.getactivatemenu()
    this.getversion();
    
    if (this.usermobile == null) {
      this.rootPage = WalkthroughPage;
    }
    else {
      this.rootPage = TabsNavigationPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, 
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
        ]);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._OneSignal.startInit("eb0f8c59-43ac-438a-a909-84a2dd82e398", "183990619215");
      this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
      this._OneSignal.setSubscription(true);
      this._OneSignal.handleNotificationReceived().subscribe(() => {
        // handle received here how you wish.
      });
      this._OneSignal.handleNotificationOpened().subscribe((data) => {
        // handle opened here how you wish.
      });
      this._OneSignal.endInit();
    });
  }

  // getactivatemenu() {
  //   this.Data = {
  //     mobile: this.shopmobile,
  //   }
  //   console.log('datas....' + JSON.stringify(this.Data));
  //   console.log(this.Data);
  //   var link = 'https://www.freshcangrocery.in/cppi/menu_active_check.php';
  //   var myData = JSON.stringify(this.Data);
  //   this.http.post(link, myData)
  //     .subscribe(data => {
  //       console.log(data["_body"]);
  //       this.response = JSON.parse(data["_body"]);
  //       console.log(this.response);
  //         this.shoptype=this.response.shop_type;
  //         localStorage.setItem('shoptype', this.shoptype);
  //         console.log(this.shoptype);
          
  //       if (this.response.activate_offers == "1") {
  //           this.type = "true";
  //         console.log(this.type);
  //         console.log('offer activated');
  //       }
  //       else {
  //         console.log('offer deactivated');
  //       }
  //     }, error => {
  //       console.log("Oooops!");
  //     });
      
  // }
  getversion() {
    this.Data = {
      data: 'user',
    }
    console.log('datas....' + JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_users/version_check.php';
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/cppi/version_check.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.list = JSON.parse(data["_body"]);
        console.log(this.list);
        
        if (this.list.version == this.version) {
          console.log("updated version");
        }
        else {
          this.showupdate();
          console.log('update available');
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  showupdate() {
    let confirm = this.alertCtrl.create({
      title: 'Update Available',
      message: 'There is a newer version of Fresh Can Available. Update now? ',
      buttons: [
        {
          text: ' Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.market.open('io.freshcan.user');
          }
        }
      ]
    });
    confirm.present();
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goHome() {
    this.nav.push(TabsNavigationPage);
  }
  Home() {
    this.nav.push(HomePage);
  }
  Order() {
    this.nav.push(OrderhistoryPage);
  }
  profile() {
    this.nav.push(ProfilePage);
  }
  changepassword() {
    this.nav.push(PasswordPage);
  }
  notification() {
    this.nav.push(NotificationPage);
  }
  Settings(){
    this.nav.push(ShopsettingsPage);
  }
  contact() {
    this.nav.push(ContactPage);
  }
  Grocery(){
    this.nav.push(SubcategoryPage); //CategoryPage
  }
  offers() {
    this.nav.push(OffersPage);
  }
  termsconditions() {
    this.nav.push(TermsOfServicePage);
  }
  about() {
    this.nav.push(AboutPage);
  } 
}
