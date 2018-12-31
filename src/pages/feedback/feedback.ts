import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public item: any;
  public id: any;
  public name: any;
  public cans: any;
  public deliverystatus: any;
  public payment: any;
  public Data: any;
  public address: any;
  public response: any;
  public type: any;
  public time: any;
  public deltime: any;
  public Description: any;
  public Opinion: any;
  public usermobile: any;
  public shopmobile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
  ) {
    this.item = this.navParams.get('id');
    this.id = this.item.order_id;
    this.name = this.item.name;
    this.cans = this.item.no_of_cans;
    this.deliverystatus = this.item.status;
    this.payment = this.item.payment;
    this.address = this.item.address;
    this.shopmobile = this.item.shop_mobile;
    this.type = this.item.type;
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this.usermobile = localStorage.getItem('usermobile');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  feedback() {
    if (this.Opinion == undefined) {
      this.presentToast('Please Select your Opinion')
    }
    else {
      this.feedback1();
    }
  }
  feedback1() {
    console.log(this.Description);
    
    if (this.Description == undefined) {
      this.Description = "";
    }
    this.Data = {
      order_id: this.id,
      user_no: this.usermobile,
      shop_no: this.shopmobile,
      type: this.Opinion,
      description: this.Description,
    };
    console.log(JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_users/feedback.php';
    var link = 'https://www.freshcangrocery.in/cppi/feedback.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Thank you for your feedback !');
          this.viewCtrl.dismiss();
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry, please Try Again')
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
}
