import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { Otppage } from '../pages/otppage/otppage';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AboutPage } from '../pages/about/about';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { ContactPage } from '../pages/contact/contact';
import { NotificationPage } from '../pages/notification/notification';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { MapPage } from '../pages/map/map';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { Subcategory2Page } from '../pages/subcategory2/subcategory2';
import { CartPage } from '../pages/cart/cart';
import { OrderhistoryPage } from '../pages/orderhistory/orderhistory';
import { OffersPage } from '../pages/offers/offers';
import { OrdersPage } from '../pages/orders/orders';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ProfilePage } from '../pages/profile/profile';
import { ShopsettingsPage } from '../pages/shopsettings/shopsettings';
import { PasswordPage } from '../pages/password/password';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { Signup2Page } from '../pages/signup2/signup2';
import { OverlayPage } from '../pages/overlay/overlay';
import { DataServiceProvider } from '../providers/data-service/data-service';

import { SearchPipe } from './../pipes/search/search';
import { PreloadImage } from '../components/preload-image/preload-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';

import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from "@ionic-native/google-maps";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { OneSignal } from '@ionic-native/onesignal';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Market } from '@ionic-native/market';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,

    TabsNavigationPage,
    LoginPage,
    SignupPage,
    Otppage,
    ForgotPasswordPage,
    AboutPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    ContactPage,
    NotificationPage,
    ThankyouPage,
    MapPage,
    SubcategoryPage,
    Subcategory2Page,
    CartPage,
    OrderhistoryPage,
    OffersPage,
    OrdersPage,
    FeedbackPage,
    ProfilePage,
    PasswordPage,
    WalkthroughPage,
    ShopsettingsPage,
    Signup2Page,
    OverlayPage,

    SearchPipe,
    PreloadImage,
    ShowHideContainer,
    ShowHideInput,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

    TabsNavigationPage,
    LoginPage,
    SignupPage,
    Otppage,
    ForgotPasswordPage,
    AboutPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    ContactPage,
    NotificationPage,
    ThankyouPage,
    MapPage,
    SubcategoryPage,
    Subcategory2Page,
    CartPage,
    OrderhistoryPage,
    OffersPage,
    OrdersPage,
    FeedbackPage,
    ProfilePage,
    PasswordPage,
    WalkthroughPage,
    ShopsettingsPage,
    Signup2Page,
    OverlayPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    InAppBrowser,
    EmailComposer,
    CallNumber,
    OneSignal,
    Diagnostic,
    AndroidPermissions ,
    LocationAccuracy,
    Market,
    
    DataServiceProvider,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
