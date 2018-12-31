import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subcategory2Page } from './../subcategory2/subcategory2';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {
  public shoptype: any;
  static notifier: number = 0;
  noti: number;
  static show: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public dataService: DataServiceProvider,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
    // this.shoptype = localStorage.getItem('shoptype');
    // console.log(this.shoptype);
    this.noti = this.dataService.getcount();
    Subcategory2Page.notifier = this.noti ;
  
  }
  product(data,sub) {
    let value = {
      category: data,
      sub_category: sub,
      
    }
    console.log(data);
    this.navCtrl.push(Subcategory2Page, value);
  
}
notification() {
  return Subcategory2Page.notifier;
}
show() {
  return Subcategory2Page.show;
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

}
