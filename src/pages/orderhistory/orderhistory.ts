import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FeedbackPage } from '../feedback/feedback';
import { OrdersPage } from '../orders/orders';

@Component({
  selector: 'page-orderhistory',
  templateUrl: 'orderhistory.html',
})
export class OrderhistoryPage {
  section: string;
  loading: any;
  public order: Array<any> = [];
  public bulkorder: Array<any> = [];
  public orderlist: Array<any> = [];
  public bulklist: Array<any> = [];
  public Data: any;
  public usermobile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,

  ) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content:"Loading..."
    });
    console.log('ionViewDidLoad OrderhistoryPage');
    this.usermobile = localStorage.getItem('usermobile');
    this.getorderlist();
  }
  getorderlist() {
    this.Data = {
      mobile: this.usermobile,
    }
    this.loading.present();
    console.log('datas....' + JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_users/order_history.php';
    var link = 'https://www.freshcangrocery.in/cppi/order_history.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        
        this.orderlist = JSON.parse(data["_body"]);
        this.orderlist.forEach(element => {
          this.order.push(element);
        });
        console.log(this.orderlist);
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  nextpage(item) {
    if (item.feedback == 0 && item.status == "Delivered") {
      var modal = this.modalCtrl.create(FeedbackPage, { id: item });
      modal.present();
      modal.onDidDismiss((data) => {
        console.log(data);
        this.order = [];
        this.ionViewDidLoad();

      });
    }
  }
  orderpage(item) {
    var modal = this.modalCtrl.create(OrdersPage, { id: item });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
    });
  }
}
