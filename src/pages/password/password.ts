import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  public old:any;
  public new:any;
  public new1:any;
  public response: any;
  public Data: any;
  public usermobile: any;
  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http: Http,
     public toastCtrl: ToastController,
     
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
    this.usermobile = localStorage.getItem('usermobile');
  }
  update() {
    this.Data = {
      mobile: this.usermobile,
      currentpassword: this.old,
      enteredpassword: this.new,
      confirmedpassword: this.new1,
    };
    // var link = 'http://freshcan.in/api/shop_users/changepwd.php';
    var link = 'https://www.freshcangrocery.in/cppi/changepwd.php';
    var myData = JSON.stringify(this.Data);
    console.log(myData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
        console.log("success");        
          this.presentToast("Your new password updated, please logout and login again.");
        }
        else {
          console.log('Profile updated Failed');
          this.presentToast('We are unable to update your password ! Please retry')

        }
      }, error => {
        console.log("Oooops!");
      });
   
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
       // duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
