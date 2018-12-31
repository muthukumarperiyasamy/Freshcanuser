import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-overlay',
  templateUrl: 'overlay.html',
})
export class OverlayPage {

  constructor(public navCtrl: NavController,public view: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverlayPage');
  }
  dismiss() {
    this.view.dismiss();
  }
}
