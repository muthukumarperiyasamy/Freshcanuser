import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { MapPage } from '../map/map';
import { Signup2Page } from '../signup2/signup2';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  signupData: any;
  public response: any;
  public item: any;
  public name: any;
  public mobileno: any;
  public email: any;
  public password: any;
  public landmark: any;
  public address: any;
  constructor(
    public nav: NavController,
    public toastCtrl: ToastController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    private locationAccuracy: LocationAccuracy,
    private diagnostic: Diagnostic
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.signup = new FormGroup({
      name: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    this.item = this.navParams.get('map');
    console.log(this.item);
    if (this.item != undefined) {
      if (this.item.name != undefined)
        this.name = this.item.name
      if (this.item.mobile != undefined)
        this.mobileno = this.item.mobile
      if (this.item.landmark != undefined)
        this.landmark = this.item.landmark
      if (this.item.email != undefined)
        this.email = this.item.email
      if (this.item.password != undefined)
        this.password = this.item.password
      if (this.item.address != undefined)
        this.address = this.item.address
    }
    this.getrequest();
    
  }
  doSignup() {

    this.signupData = {
      name: this.signup.value.name,
      mobile: this.signup.value.mobileno,
      landmark: this.signup.value.landmark,
      email: this.signup.value.email,
      password: this.signup.value.password,
      address: this.signup.value.address,
    }
    var link = 'https://www.freshcangrocery.in/cppi/temp_register.php';
    var myData = JSON.stringify(this.signupData);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        // data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          // this.presentToast('Signup Success')
          window["plugins"].OneSignal.sendTag('mobile', this.signup.value.mobileno);
          window["plugins"].OneSignal.sendTag('type', "User");
          localStorage.setItem('username', this.signup.value.name);
          let data = {
            mobile: this.signup.value.mobileno
          }
          console.log(data);
          this.nav.push(Signup2Page, data);
        }
        else {
          console.log('already exist');
          this.presentToast('This mobile number already registered with us, If needed you can reset password.')
          
        }
      }, error => {
        console.log("Oooops!");
        this.presentToast('Sorry, please retry the signup process !')
        
      });

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
  // showalert() {
  //   let confirm = this.alertCtrl.create({
  //     title: 'Location service Disabled',
  //     message: 'Your Device Location is Off,please Turn on ',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //          this.getrequest();
  //         }
  //       },
  //       {
  //         text: 'Go To Settings',
  //         handler: () => {
  //           console.log('Refresh page');
  //          this.diagnostic.switchToLocationSettings();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }
  
  MapModal() {
    let datas = {
      name: this.signup.value.name,
      mobile: this.signup.value.mobileno,
      landmark: this.signup.value.landmark,
      email: this.signup.value.email,
      password: this.signup.value.password,
      address: this.signup.value.address,
    }
    this.nav.push(MapPage, { info: datas });


  }
  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

  getrequest() {
    console.log('***************inside*********');
    let successCallback = (isAvailable) => { 
      console.log('Is available? ' + isAvailable);
      if(isAvailable==false){
        console.log("your location is false");
    
        this.request();
        
      }
      else{

      }
     };
    let errorCallback = (e) => console.error(e);
    
    this.diagnostic.isLocationAvailable().then(successCallback).catch(errorCallback);

  }

  request(){
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () =>  console.log('Request successful'),
      error =>  console.log('Error requesting location permissions',error)
    );
  }
}
