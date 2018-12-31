import { Component } from '@angular/core';
import {  NavController, NavParams ,App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {
  main_page: { component: any };  
  constructor(
    public navCtrl: NavController,   
    public app: App,
    public dataService: DataServiceProvider,
    public navParams: NavParams) {
      this.main_page = { component: TabsNavigationPage };
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
  }
home(){
  this.app.getRootNav().setRoot(HomePage);
  this.navCtrl.setRoot(this.main_page.component);
  this.dataService.removeCart();
}
}
