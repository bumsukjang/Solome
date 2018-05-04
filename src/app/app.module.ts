import { NgModule, ErrorHandler, Injectable, Injector, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { UserListPage } from '../pages/user-list/user-list';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';

import { AngularFirestore } from 'angularfire2/firestore';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DataServiceProvider } from '../providers/data-service/data-service';

// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
/*
import { Pro } from '@ionic/pro';

Pro.init('f956f863', {
  appVersion: '0.0.1'
})

/*
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
*/

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    UserListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
	  AngularFireModule.initializeApp(environment.firebase),
  	AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicModule.forRoot(MyApp),
  ],  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    UserListPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	  IonicErrorHandler,
  	Facebook,
  	AngularFirestore,
    AngularFireDatabase,
    AuthServiceProvider,
    DataServiceProvider
    /*{provide: ErrorHandler, useClass: MyErrorHandler}*/
  ]
})
export class AppModule {}
