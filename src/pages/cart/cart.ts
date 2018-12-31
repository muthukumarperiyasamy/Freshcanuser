import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ThankyouPage } from '../thankyou/thankyou';
import { Subcategory2Page } from '../subcategory2/subcategory2';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  static cost: number = 0;
  cartProduct: any;
  products: any;
  grocery_shopmobile: any;
  usermobile: any;
  cancount: any;
  cartdetails: Array<any> = [];
  static item: number = 0;
  static dataservice: any;
  static navctrl: any;
  public response: any;
  public grocery_shopname: any;
  
  constructor(public toastCtrl: ToastController,
    public dataService: DataServiceProvider,
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams
  ) {
    CartPage.dataservice = dataService;
    CartPage.navctrl = navCtrl;
    CartPage.item = this.dataService.item;
    this.cartProduct = this.dataService.getCartProduct();
    CartPage.cost = this.dataService.cartCost;
    this.products = this.dataService.getProductsjson();
    console.log(this.cartProduct);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.grocery_shopmobile = localStorage.getItem("groceryshopmobile");
    this.usermobile = localStorage.getItem("usermobile");
    this.grocery_shopname = localStorage.getItem('groceryshopname');
    this.Cancount();
  }

  getCartCost() {
    return CartPage.cost;
  }
  getCartItem() {
    return CartPage.item;
  }

  removeProduct(product) {
    product.inCart = "Add";
    product.disabled = false;
    CartPage.item--;
    --Subcategory2Page.notifier;
    if (Subcategory2Page.notifier === 0) {
      Subcategory2Page.show = false;
    } 
    // console.log(CartPage.dataservice);
    CartPage.cost = CartPage.dataservice.removeCartProduct(product, CartPage.cost);
    if (CartPage.cost === 0) {
      CartPage.navctrl.pop();
    }
  }

  itemIncrease(product) {
    console.log(product);
    
    this.cartProduct.forEach(function (pro) {
      if (product.productCode === pro.productCode) {
        if (pro.item !== 5) {
          pro.item++;
          pro.prcountprice=pro.item*pro.price;
          CartPage.cost += pro.price;
        }
      }
    });
  }

  itemDecrease(product) {
    console.log(product);
    this.cartProduct.forEach(function (pro) {
      if (product.productCode === pro.productCode) {
        if (pro.item !== 1) {
          pro.item--;
          CartPage.cost -= pro.price;
          pro.prcountprice=pro.item*pro.price;
          console.log(CartPage.cost);
        } else if (pro.item === 1) {
          console.log(CartPage.prototype.removeProduct(pro));
        }
      }
    });
  }

  checkout() {
    this.cartdetails = [];
    this.cartProduct.forEach(element => {
      let array = {
        name: element.product,
        weight: element.weight,
        quantity: element.item
      }
      console.log(array);
      this.cartdetails.push(array);
    });
    this.senddata();

  }
  Cancount() {
    this.cancount = this.dataService.getCancount();
  }
  senddata() {
    let data = {
      shop_mobile: this.grocery_shopmobile,
      user_mobile: this.usermobile,
      no_of_cans: this.cancount,
      grocery: this.cartdetails
    }
    console.log(JSON.stringify(data));
    var myData = JSON.stringify(data);
    var link = 'https://www.freshcangrocery.in/cppi/user_orders.php';
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response.status == "1") {
          console.log('success');
          // this.presentToast('Your Order has been accepted successfully');
        this.navCtrl.setRoot(ThankyouPage);
        }
        else if (this.response.status == "2") {
          console.log(' Bulk order');
          this.presentToast(' Your Shop Owner is not available right now, but your order has been accepted. Product will be delivered on next working day')
          this.navCtrl.setRoot(ThankyouPage);
        }
        else if (this.response.status == "0") {
          console.log('order failed');
          this.presentToast('Your Order confirmation has failed')
        }

        else {
          console.log('Failed');
          this.presentToast('Sorry, please Try Again ')
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
      position: 'bottom',
      // dismissOnPageChange: true,
      // cssClass: "toast"
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
