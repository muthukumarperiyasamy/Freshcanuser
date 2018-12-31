import { Component } from '@angular/core';
import {  NavController, NavParams ,ViewController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  
  website: string;
  options:any;
  constructor(
    public navCtrl: NavController,
    public inAppBrowser: InAppBrowser,
    public view: ViewController,
    public navParams: NavParams) {
      this.website="http://freshcan.in";      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  InAppBrowser(){
    console.log(this.website);
    this.options= {
      location: 'yes',
      // hidden:'yes'
    }
    this.inAppBrowser.create(this.website, '_blank',this.options);
  }
  dismiss() {
    this.view.dismiss();
  }
}
