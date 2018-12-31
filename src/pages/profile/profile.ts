import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
// import { WalkthroughPage } from '../walkthrough/walkthrough';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: any;
  public name: any;
  public usernum: any;
  public email: any;
  public password: any;
  public address: any;
  public landmark: any;
  public shopnum: any;
  public updatedata: any;
  public list: any;
  public profile: Array<any> = [];
  public getdata: any;
  public usermobile: any;
  public response: any;
  public toggle: boolean = true;
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public toastCtrl: ToastController,
    public http: Http,
    public loadingCtrl: LoadingController,

  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.usermobile = localStorage.getItem('usermobile');
    this.getprofile();
  }

  logout() {
    // this.nav.setRoot(WalkthroughPage);
    localStorage.removeItem('mobile');
    localStorage.clear();
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

  getprofile() {
    this.getdata = {
      mobile: this.usermobile,
    }
    this.loading.present();
    console.log('datas....' + JSON.stringify(this.getdata));
    // var link = 'http://freshcan.in/api/shop_users/getprofile.php';
    var link = 'https://www.freshcangrocery.in/cppi/getprofile.php';
    var myData = JSON.stringify(this.getdata);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.list = JSON.parse(data["_body"]);
        console.log(this.list);
        this.name = this.list.name;
        localStorage.setItem('username', this.name);
        this.usernum = this.list.mobile;
        this.email = this.list.email;
        //  this.password= this.list.password;
        this.address = this.list.address;
        this.landmark = this.list.landmark;
        // this.shopnum = this.list.shop_mobileno;

        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  update() {
    this.updatedata = {
      name: this.name,
      mobile: this.usernum,
      landmark: this.landmark,
      address: this.address,
      // shop_mobileno: this.shopnum,
    };
    console.log(this.updatedata);
    // var link = 'http://freshcan.in/api/shop_users/updateProfile.php';
    var link = 'https://www.freshcangrocery.in/cppi/updateProfile.php';
    var myData = JSON.stringify(this.updatedata);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        // data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log("success");
          this.presentToast("Your Profile has been updated successfully!");
        }
        // else if (this.response.status == "2") {
        //   console.log("success");
        //   this.presentToast("Shop mobile number will be updated shortly. Please wait for confirmation.");
        // }
        // else if (this.response.status == "3") {
        //   console.log("success");
        //   this.presentToast("Updated Shop mobile is Not Available");
        // }
        else {
          console.log('Profile updating process failed!');
          this.presentToast('Profile updating process failed, please retry!')

        }
      }, error => {
        console.log("Oooops!");
      });
    console.log(this.updatedata);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  notify() {
    console.log(this.toggle);
  }
}
