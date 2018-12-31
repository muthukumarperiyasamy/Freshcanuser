import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  loading: any;
  public orderlist: any;
  public order: Array<any> = [];
  public item: any;
  public id: any;
  public Data: any;
  public mrp: any;
  public deliverystatus: any;
  public can: any;
  public save: any;
  public shopprice: any;
  public deliveryprice: any;
  public cashcollect: any;
  public discountprice: any;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Loading...",
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.item = this.navParams.get('id');
    console.log(this.item);
    this.can = this.item.no_of_cans;
    this.deliverystatus = this.item.status;
    this.id = this.item.order_id;
    this.mrp = this.item.mrp;
    this.shopprice = this.item.shop_price;
    this.deliveryprice = this.item.delivery_price;
    this.cashcollect = this.item.cash_collect;
    this.discountprice = this.item.discount_price;
    if(this.discountprice == "0"){
      this.discountprice ="-";
    }
    this.orderlist = this.item.grocery;
    console.log(this.orderlist);
    console.log(this.can);
    if (this.orderlist != "null") {
      // this.orderlist.forEach(element => {
      //   this.order.push(element);
      // });
      this.getgrocery();
      // console.log(this.order);
    }
    if (this.shopprice != '0' && this.mrp != '0') {
      this.save = this.mrp - this.shopprice;
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getgrocery() {
    this.loading.present();
    if (this.deliverystatus == "on progress") {
      this.Data = {
        order_id: this.id,
      };
    }
    else {
      this.Data = {
        order_id: this.id + "-s",
      };
    }
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/cppi/updategroceries.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.orderlist = JSON.parse(data["_body"]);
        console.log(this.orderlist);
        // if (this.response.status == "1") {
        this.orderlist.forEach(element => {
          this.order.push(element);
        });
        console.log(this.order);
        this.loading.dismiss();
        
        // }
        // else {
        //   console.log('Failed');
        //   this.presentToast('Sorry. Please Try Again')
        // }
      }, error => {
        console.log("Oooops!");
      });
  }
}
