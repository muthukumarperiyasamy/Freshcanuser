import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-shopsettings',
  templateUrl: 'shopsettings.html',
})
export class ShopsettingsPage {
  public can_shopmobile: any;
  public grocery_shopmobile: any;
  public can_shopmobile1: any;
  public grocery_shopmobile1: any;
  public can_shopname: any;
  public grocery_shopname: any;
  public response: any;
  public Data: any;
  public usermobile: any;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopsettingsPage');
    this.can_shopmobile1 = localStorage.getItem('canshopmobile');
    if (this.can_shopmobile1 != 'null') {
      this.can_shopmobile = this.can_shopmobile1;
    }
    this.grocery_shopmobile1 = localStorage.getItem('groceryshopmobile');
    if (this.grocery_shopmobile1 != 'null') {
      this.grocery_shopmobile = this.grocery_shopmobile1;
    } 
    this.can_shopname = localStorage.getItem('canshopname');
    this.grocery_shopname = localStorage.getItem('groceryshopname');
    this.usermobile = localStorage.getItem('usermobile');
    console.log('canshopmobile...........'+this.can_shopmobile);
    console.log('canshopmobile1..........'+this.can_shopmobile1);
    
  }
  updatecan() {
    this.Data = {
      usermobile: this.usermobile,
      can_shop_no: this.can_shopmobile,
    };
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/cppi/update_can_shop.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          this.presentToast('Water Can - Shop Mobile No has been added !');
          localStorage.setItem('canshopmobile', this.can_shopmobile);
          localStorage.setItem('canshopname', this.response.shopname);
        }
        else if (this.response.status == "2") {
          this.presentToast('We are unable to add Shop mobile no, because they didn’t complete the Signup !.');
        }
        else {
          this.presentToast(' We are not able to add mobile no, please try !');
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  updategrocery() {
    this.Data = {
      usermobile: this.usermobile,
      grocery_shop_no: this.grocery_shopmobile,
    };
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/cppi/update_grocery_shop.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          localStorage.setItem('groceryshopmobile', this.grocery_shopmobile);
          localStorage.setItem('groceryshopname', this.response.shopname);
          this.presentToast('Grocery-Shop  Mobile No has been added !');
        }
        else if (this.response.status == "2") {
          this.presentToast('We are unable to add Shop mobile no, because they didn’t complete the Signup !.');
        } else {
          this.presentToast('We are not able to add mobile no, please try !');
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
