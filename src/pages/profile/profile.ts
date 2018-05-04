import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public db: AngularFireDatabase,
  public auth: AuthServiceProvider,
  public fb: FormBuilder,) {
    console.log("[profile page]");
    console.log(auth.currentUser); 
    this.user = auth.currentUser;   
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      relationship_status: ['', Validators.compose([Validators.required])],
      meeting_for: ['', Validators.compose([Validators.required])],
			description: ['', Validators.compose([Validators.required])]
    });

  }
  saveSetting(){
    console.log("[profile] saveSetting : user setting info:");
    console.log(this.user);
    if(this.user !=null)
    {
      this.auth.saveUserInfo(this.user);
      this.navCtrl.setRoot(TabsPage);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
