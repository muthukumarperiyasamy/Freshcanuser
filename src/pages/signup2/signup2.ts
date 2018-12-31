import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { Otppage } from '../otppage/otppage';
import { OverlayPage } from '../overlay/overlay';
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html',
})
export class Signup2Page {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  signupData: any;
  public response: any;
  public value: any;
  public visible: boolean;
  public usermobile: any;
  public Can: boolean = false;
  public Both: boolean = false;
  public Grocery: boolean = false;
  constructor(
    public nav: NavController,
    public toastCtrl: ToastController,
    public http: Http,
    public navParams: NavParams,
    public modal: ModalController,
    public loadingCtrl: LoadingController
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.signup = new FormGroup({
      mobile: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
    });

    this.usermobile = this.navParams.get('mobile');
    console.log(this.usermobile);

  }

  doSignup() {
    if (this.visible == true) {
      this.register();
    }
    else {
      this.presentToast("Please Select the Shoptype");
    }
  }
  register() {

    this.signupData = {
      shop_mobile: this.signup.value.mobile,
      type: this.value,
      user_mobile: this.usermobile
    };
    console.log(this.signupData);
    var link = 'https://www.freshcangrocery.in/cppi/user_register.php';
    var myData = JSON.stringify(this.signupData);
    this.http.post(link, myData)
      .subscribe(data => {
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Signup Success')
          this.nav.push(Otppage);
          if (this.value == "can") {
            localStorage.setItem('canshopmobile', this.signup.value.mobile);
            localStorage.setItem('groceryshopmobile', 'null');
            localStorage.setItem('canshopname',this.response.name);
            localStorage.setItem('groceryshopname','null');
            localStorage.setItem('usertype', '1');
            localStorage.setItem('usermobile1', this.usermobile);
            
          }
          if (this.value == "grocery") {
            localStorage.setItem('canshopmobile', 'null');
            localStorage.setItem('groceryshopmobile', this.signup.value.mobile);
            localStorage.setItem('canshopname','null');
            localStorage.setItem('groceryshopname',this.response.name);
            localStorage.setItem('usertype', '1');
            localStorage.setItem('usermobile1', this.usermobile);
          }
          if (this.value == "both") {
            localStorage.setItem('canshopmobile', this.signup.value.mobile);
            localStorage.setItem('groceryshopmobile', this.signup.value.mobile);
            localStorage.setItem('canshopname',this.response.name);
            localStorage.setItem('groceryshopname',this.response.name);
            localStorage.setItem('usertype', '0');
            localStorage.setItem('usermobile1', this.usermobile);
          }
        }
        else if (this.response.status == "-2") {
          console.log('Failed');
          this.presentToast('This mobile number already registered with us, If needed you can reset password.')
        }
        else if (this.response.status == "-1") {
          console.log('Failed');
          this.presentToast('This shop mobile number doesn’t complete the Signup process.')
        }
        else if (this.response.status == "-4") {
          console.log('Failed');
          let msg= 'Your '+this.response.name+' is Selling the "Water can",Please Select the "Water Can" Only !';
          this.presentToast(msg);
        }
        else {
          console.log('already exist');
          this.presentToast('Signup Failed')

        }
      }, error => {
        console.log("Oooops!");
      });

  }
  check(val) {
    if (this.Can == true || this.Both == true || this.Grocery == true) {
      this.visible = true;
      console.log("visible......." + this.visible);
    }
    if (this.Can == false && this.Both == false && this.Grocery == false) {
      this.visible = false;
      console.log("visible......." + this.visible);

    }
    console.log("both" + this.Both);
    console.log("can" + this.Can);
    console.log("grocery" + this.Grocery);
    if (val == "can") { this.value = val; this.Can = true; this.Both = false; this.Grocery = false; }
    if (val == "grocery") { this.value = val; this.Grocery = true; this.Both = false; this.Can = false; }
    if (val == "both") { this.value = val; this.Both = true; this.Can = false; this.Grocery = false; }
    console.log("visible........!!!!!!!!!!!!!!!!!!!" + this.visible);


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


  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }
  showoverlay() {
    let modal = this.modal.create(OverlayPage);
    modal.present();
  }
  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

}
