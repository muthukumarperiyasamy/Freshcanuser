import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Http } from '@angular/http';
// import { OneSignal } from '@ionic-native/onesignal';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  loginData: any;
  public response: any;

  constructor(
    public nav: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      mobile: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
      password: new FormControl('', Validators.required)
    });
  }


  doLogin(loginData) {
    this.loginData = { mobile: this.login.value.mobile, password: this.login.value.password };
    var link = 'https://www.freshcangrocery.in/cppi/login.php';
    console.log(JSON.stringify(this.loginData));
    var myData = JSON.stringify(this.loginData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          // console.log('user name.....' + this.response.name);
          localStorage.setItem('usermobile', this.login.value.mobile);
          localStorage.setItem('username', this.response.name);
          localStorage.setItem('canshopmobile', this.response.can_shop_mobileno);
          localStorage.setItem('groceryshopmobile', this.response.grocery_shop_mobileno);
          localStorage.setItem('canshopname', this.response.shop_name_can);
          localStorage.setItem('groceryshopname', this.response.shop_name_grocery);
          localStorage.setItem('usertype', this.response.user_type);
          window["plugins"].OneSignal.sendTag('mobile', this.login.value.mobile);
          window["plugins"].OneSignal.sendTag('type', "User");
          this.nav.setRoot(this.main_page.component);
        }
        // else if (this.response.result == "-1") {
        //   console.log(' id Experied Failed');
        //   this.presentToast('Your Id has Expired')
        //   localStorage.clear();
        // }

        else {
          console.log('Failed');
          this.presentToast('Sorry, There was an error with your Mobile No / Password. Please try again.')
        }
      }, error => {
        console.log("Oooops!");
      });



  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      //  duration: 3000,
      position: 'bottom',
      // dismissOnPageChange: true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
