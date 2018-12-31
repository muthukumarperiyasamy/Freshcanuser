import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-subcategory2',
  templateUrl: 'subcategory2.html',
})
export class Subcategory2Page {
  static notifier: number = 0;
  noti: number;
  static show: boolean = false;
  terms: string = '';
  sortName: string = 'default';
  products: Array<any> = [];
  filterData: any;
  product: any;
  item: number = 1;
  cartProduct: any;
  modifiedCost: any;
  responed: any;
  sbcategory: any;
  loading: any;

  @ViewChild('weightSelect') weightSelect: ElementRef;

  constructor(
    // private vibration: Vibration,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public dataService: DataServiceProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.responed = this.navParams.get('category');
    this.sbcategory = this.navParams.get('sub_category');
     console.log(this.responed);
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Please wait..."
    
    });
    this.noti = this.dataService.getcount();
    Subcategory2Page.notifier = this.noti ;
    this.loading.present();
    this.cartProduct = this.dataService.getCartProduct();
    this.dataService.getProducts(this.responed)
      .then((response) => {
        this.product = response;
        this.product.forEach(element => {
          this.products.push(element);
        });
        console.log(this.products);
        this.loading.dismiss();
      });
    // this.getdata();
  }

  selectCost(p, e: any) {
    p.unit.forEach(element => {
      if (element.weight === e) {
        p.mrp_price = element.mrp_price;
        p.weight = element.weight;
        p.price = element.price;
        p.discount = element.discount;
      }
    });
  }


  cartItem() {
    if (this.products !== undefined) {
      this.products.filter((object) => {
        this.cartProduct.forEach(element => {
          if (element === object) {
            object['item'] = element['item'];
          }
        });
      });
    }
  }

  itemIncrease(product) {
    this.dataService.cartProduct.forEach(element => {
      if (element == product) {
        if (product.item < 5) {
          product.item++;
          this.dataService.cartCost = product.price * product.item;
        }
      }
    });
  }

  itemDecrease(product) {
    this.dataService.cartProduct.forEach(element => {
      if (element == product) {
        if (product.item !== 1) {
          product.item--;
          this.dataService.cartCost = product.price * product.item;
        } else if (product.item === 1) {
          product.inCart = "Add";
          product.disabled = false;
          this.dataService.removeCartProduct(product, product.price);
          Subcategory2Page.notifier--;
          if (Subcategory2Page.notifier === 0) {
            Subcategory2Page.show = false;
          }
        }
      }
    });
  }

  addOrNot(p) {
    if (p.inCart === "Add") {
      p.inCart = "Added";
      p.disabled = true;
    }
  }

  getItem() {
    return CartPage.item;
  }

  notification() {
    return Subcategory2Page.notifier;
  }
  show() {
    return Subcategory2Page.show;
  }

  addProduct(product) {
    console.log(product);

    let weight = this.weightSelect["_text"]
    product.unit.filter((data) => {
      if (data.weight === weight) {
        product.price = data.price;
        product.weight = data.weight;
      }
    });
    product.prcountprice=product.price*product.item;
    
    this.addOrNot(product);
    let item = this.dataService.cartProduct.find(p => p == product);
    if (item === undefined || Subcategory2Page.notifier === undefined) {
      console.log(product);
      this.dataService.addToCart(product);
      ++Subcategory2Page.notifier;
      Subcategory2Page.show = true;
      this.show();
      this.cartItem();
      // let toast = this.toastCtrl.create({
      //   message: product.product + ' added in cart successfully',
      //   duration: 2500
      // });
      // toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: product.product + ' is already in cart',
        duration: 4500,
        // showCloseButton: true,
        // closeButtonText: 'Ok',
      });
      toast.present();
    }
  }

  cart() {
    if (this.dataService.item != 0) {
      this.navCtrl.push(CartPage);
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'No item in cart',
        duration: 2500
      });
      toast.present();
    }
  }
detail(p){
console.log(p);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Subcategory2Page');
  }
  ionViewWillEnter() {
    this.cartItem();
  }
} 
