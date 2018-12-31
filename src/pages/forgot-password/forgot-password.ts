import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl, } from '@angular/forms';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  forgetData: any;
  public response: any;
  constructor(
    public nav: NavController,
    public http: Http,
    public toastCtrl: ToastController) {

    this.forgot_password = new FormGroup({
      mobile: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
    });
  }

  recoverPassword() {
    console.log(this.forgot_password.value);
    this.forgetData = { mobile: this.forgot_password.value.mobile };

    console.log(this.forgetData);
    var link = 'https://www.freshcangrocery.in/cppi/forgetpwd.php';

    var myData = JSON.stringify(this.forgetData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('Check your Msg for Password');
          this.presentToast('We sent you the password through SMS Message !')
          this.nav.setRoot(LoginPage);
        }
        else if (this.response.status == "-1") {
          console.log('Mobile Number is not available');
          this.presentToast('The mobile no is invalid, please signup !')
        }
        else {
          //  console.log('error in connection');
          this.presentToast('There was a technical error, please try after sometime')
        }


      }, error => {
        console.log("Oooops!");
      });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok', // dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  login() {
    this.nav.push(LoginPage);
  }
}

