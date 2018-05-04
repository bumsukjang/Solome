import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user;
  constructor(public navCtrl: NavController,
  private auth : AuthServiceProvider,
  private afStorage: AngularFireStorage) {
    console.log("[contacts]");
    console.log(auth.currentUser);
    this.user = auth.currentUser;
  }
  saveSetting(){
    console.log("[contact] saveSetting : user setting info:");
    console.log(this.user);
    this.auth.saveUserInfo(this.user);
  }

  upload(event) {
    this.afStorage.upload('/upload/to/this-path', event.target.files[0]);  
  }

  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
