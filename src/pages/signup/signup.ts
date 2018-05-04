import { TabsPage } from './../tabs/tabs';
import { ProfilePage } from './../profile/profile';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'as-page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {
  signupError: string;
  loginError: string;
	form: FormGroup;
  credentials;
	constructor(
		fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthServiceProvider,
    public db:AngularFireDatabase) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([])],
      age: ['', Validators.compose([])],
      gender: ['', Validators.compose([])],
			description: ['', Validators.compose([])]
    });
  }

  signup() {
    console.log("[singUp] : singup");
    
		let data = this.form.value;
		this.credentials = {
			email: data.email,
			password: data.password
    };
		this.auth.signUp(this.credentials).then(
      (user) => {
        this.auth.signInWithEmail(this.credentials)
		  	.then(() => {		
            this.db.object('users/'+user.uid).set({
              id: user.uid,
              email : this.credentials.email
            }).then(()=>{
              this.navCtrl.push(ProfilePage);
            });
            //this.navCtrl.setRoot(TabsPage);
          },
          error => this.loginError = error.message
			  );    
        
      },
			error => this.signupError = error.message
		);
  }
}