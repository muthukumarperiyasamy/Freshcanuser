import { Component } from '@angular/core';
import {  NavController, NavParams , ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
  public offersData: any
  public quantity: any;
  public response: any;
  public usermobile: any;
  public Data: any;
  public shopmobile: any;
   public items: Array<any> = [];
  public list: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
    this.usermobile = localStorage.getItem('usermobile');
    this.shopmobile = localStorage.getItem('shopmobile');
    this.getoffers();
  }
  
  getoffers() {
    this.offersData = {
      shop_mobile: this.shopmobile,
    }
    console.log('datas....' + JSON.stringify(this.offersData));
    console.log(this.offersData);
    var link = 'https://www.freshcangrocery.in/cppi/offers_json.php';
    var myData = JSON.stringify(this.offersData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.list = JSON.parse(data["_body"]);
        this.list.forEach(element => {
          // console.log(element);
          this.items.push(element);
        });
        console.log(this.items);

      }, error => {
        console.log("Oooops!");
      });

  }
  buy(item,quantity) {
    this.quantity = quantity;
    var code =item.product_code
    console.log(this.quantity);
    console.log(code);
    this.Data = {
      product_id: code,
      usermobile:this.usermobile,
      shopmobile:this.shopmobile,
      quantity: this.quantity,
    };
    console.log(JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_users/offers_buy.php';
    var link = 'https://www.freshcangrocery.in/cppi/offers_buy.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Your Order has been accepted successfully');
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry,Please Try Again ')
        }
      }, error => {
        console.log("Oooops!");
      });
    
  }

  showPrompt(item) {
    let prompt = this.alertCtrl.create({
      title: 'Confirmation',
      message: "Enter a number of products interested to Buy",
      inputs: [
        {
          name: 'title',
          placeholder: '123...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: data => {
            console.log('Buy clicked');
            
            this.buy(item,data.title);
          }
        }
      ]
    });
    prompt.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
        // duration: 3000,
      position: 'bottom',
      // dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

