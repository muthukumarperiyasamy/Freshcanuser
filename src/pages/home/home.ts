import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { SubcategoryPage } from '../subcategory/subcategory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tap: number = 0;
  public usermobile: any;
  public username: any;
  public canshopmobile: any;
  public canshopname: any;
  public groceryshopmobile: any;
  public cost: any;
  public costdis: boolean = false;
  public data: any;
  public shopname: any;
  public usertype: any;
  public orderdata: any;
  public response: any;
  images: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public app: App,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public http: Http,
    public dataService: DataServiceProvider,
  ) {
    this.images = [
      'http://www.freshcangrocery.in/images/user_slider_1.jpg',
      'http://www.freshcangrocery.in/images/user_slider_2.jpg',
      'http://www.freshcangrocery.in/images/user_slider_3.jpg',
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.usermobile = localStorage.getItem('usermobile');
    this.username = localStorage.getItem('username');
    this.usertype = localStorage.getItem('usertype');
    this.canshopmobile = localStorage.getItem('canshopmobile');
    this.canshopname = localStorage.getItem('canshopname');
    this.groceryshopmobile = localStorage.getItem('groceryshopmobile');
    this.getcost()
  }


  tapEvent1(e) {
    if (this.tap < 25)
      this.tap++
    else {
      this.presentToast('Please Enter No of cans to be less than 25')
    }
  }
  tapEvent2(e) {
    if (this.tap > 0)
      this.tap--
  }
  purchasegrocery() {
    if (this.groceryshopmobile == 'null') {
      this.presentToast('Please update GROCERY - Shop mobile no in “shop settings” page!')
    }
    else{
    this.dataService.getcandetails(this.tap);
    // this.app.getRootNav().push(SubcategoryPage)
    this.navCtrl.push(SubcategoryPage);}
  }
  purchasecan() {
    // this.shopmobile
    this.orderdata = {
      user_mobile: this.usermobile,
      shop_mobile: this.canshopmobile,
      no_of_cans: this.tap,
      grocerry: []
    };
    console.log(JSON.stringify(this.orderdata));
    var link = 'https://www.freshcangrocery.in/cppi/user_orders.php';

    var myData = JSON.stringify(this.orderdata);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          this.tap= 0;
          console.log('success');
          this.presentToast('Your Order has been placed, You will get notified about the delivery Time !');
        }
        else if (this.response.status == "2") {
          console.log(' Bulk order');
          this.presentToast('Your Order has been placed, Your shop is offline, you will get notified about the delivery time!')
        }
        else if (this.response.status == "0") {
          console.log('order failed');
          this.presentToast('We are unable to place order, please retry!')
        }

        else {
          console.log('Failed');
          this.presentToast('We are unable to place order, please retry!')
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  getcost() {
    this.data = {
      shop_mobile: this.canshopmobile,
    };
    console.log(JSON.stringify(this.data));
    // var link = 'http://freshcan.in/api/shop_users/getcost.php';
    var link = 'https://www.freshcangrocery.in/cppi/get_price.php';

    var myData = JSON.stringify(this.data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        this.cost = this.response.can_cost
        this.canshopname = this.response.name
        localStorage.setItem('canshopname', this.canshopname);
        console.log(this.cost);
        console.log('success');
        if (this.cost != ('' || undefined)) {
          this.costdis = true;
        }
        console.log(this.costdis);
      }, error => {
        console.log("Oooops!");
      });
  }
  order() {
    // console.log(this.tap);
    if (this.tap == 0)
      this.presentToast('Please add the can to place order. Minimum 1 Water can  !!')
    else if (this.tap > 25) {
      this.presentToast('Please Enter No of cans to be less than 25 ')
    }
    else {
      console.log(this.usertype);
      if (this.canshopmobile != 'null') {
        if (this.usertype == '1') { this.showgrocery(); }
        else { this.showConfirm(); }
      }
      else{
      this.presentToast('Please update CAN - Shop mobile no in “shop settings” page!')
      }
    }

  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom',
      // dismissOnPageChange: true,
      // cssClass: "toast"
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Order Confirmation',
      message: 'Do you want to Confirm your order ',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('purchasecan confirmed');
            this.purchasecan();
          }
        }
      ]
    });
    confirm.present();
  }
  showgrocery() {
    let confirm = this.alertCtrl.create({
      title: 'Order Confirmation',
      message: 'Do you want to purchase Grocerry ',
      buttons: [
        {
          text: 'Can Only',
          handler: () => {
            console.log('purchasecan confirmed');
            this.purchasecan();
          }
        },
        {
          text: 'grocery',
          handler: () => {
            console.log('purchasegrocery confirmed');
            this.purchasegrocery();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }

      ]
    });
    confirm.present();
  }
  logout() {
    this.app.getRootNav().setRoot(LoginPage);
    // localStorage.removeItem('mobile');
    localStorage.clear();
  }
}
