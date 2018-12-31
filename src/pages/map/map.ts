import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation } from '@ionic-native/google-maps';
import { SignupPage } from '../signup/signup';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  myloc: any;
  info: boolean = false;
  public item: any;
  constructor(public navCtrl: NavController,
    public view: ViewController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private locationAccuracy: LocationAccuracy,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    this.item = this.navParams.get('info');
    console.log(this.item);
    console.log(this.myloc);
  }

  dismiss() {
    // this.view.dismiss();
    let datas = {
      name: this.item.name,
      mobile: this.item.mobile,
      landmark: this.myloc,
      email: this.item.email,
      password: this.item.password,
      address: this.item.address,
      // can_shop_mobileno: this.item.can_shop_mobileno,
      // grocery_shop_mobileno: this.item.grocery_shop_mobileno,
    }
    this.navCtrl.setRoot(SignupPage, { map: datas });

  }
  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
    });
    // this.onButtonClick();
  }
  onButtonClick() {
    console.log('button click');
    this.map.clear();
    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));
        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 18,
          tilt: 30
        })
          .then(() => {
            // add a marker
            var lat = location.latLng.lat;
            var lng = location.latLng.lng;

            this.myloc = lat + "," + lng;
            let marker: Marker = this.map.addMarkerSync({
              title: 'Delivered to this location',
              map: this.map,
              snippet: 'Drag and set your home Location',
              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE,
              draggable: true
            });
            // show the infoWindow
            marker.showInfoWindow();
            // If clicked it, display the alert
            marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((data) => {
              // this.spiner = true;
              console.log(data);
              let loc = data;
              this.myloc = loc[0].lat + ',' + loc[0].lng;
              console.log("..................." + this.myloc);
              console.log(loc[0].lat, loc[0].lng);
              console.log(loc);
              loc = JSON.stringify(data);
              console.log(loc[0]);
              console.log(loc.LatLng);
            });
          });
      }, error => {
        console.log(error);
        if (error.status == false) {
          this.info = true;
          this.request();
        }
        else {
          console.log("no error");
        }
      });
  }
  setloc() {
    this.dismiss();
  }
  showalert() {
    let confirm = this.alertCtrl.create({
      title: 'Location service Disabled',
      message: 'Your Device Location is Off,please Turn on ',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Refresh',
          handler: () => {
            console.log('Refresh page');
            this.onButtonClick();
          }
        }
      ]
    });
    confirm.present();
  }
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok',
      //  duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
  request(){
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () =>  console.log('Request successful'),
      error =>  console.log('Error requesting location permissions',error)
    );
  }
}
