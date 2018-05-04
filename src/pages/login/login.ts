import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';


//import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  /* template: `
    <div *ngIf="afAuth.authState | async as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
  ` */
})

export class LoginPage {
	
	loading: Loading;
	registerCredentials = { email: 'bsjang@bs-soft.co.kr', password: '1q2w3e4r' };
	loginForm: FormGroup;
	loginError: string;
 
	constructor(
		//private fb: Facebook, 
		public navCtrl: NavController,
		private alertCtrl: AlertController, 
		private loadingCtrl: LoadingController, 
		private auth: AuthServiceProvider,
		public fb: FormBuilder
		/*, private http: HTTP */) {
	  /*if(auth.getUserInfo() != null){
		  this.navCtrl.setRoot(TabsPage);
	  }
	  */
	  		this.loginForm = fb.group({
				email: ['', Validators.compose([Validators.required, Validators.email])],
				password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
			  });
			  //this.registerCredentials = { email: auth.currentUser.email ,  password: auth.currentUser.password };
	}
	
	showLoading() {
		this.loading = this.loadingCtrl.create({
		  content: '로그인 중입니다.',
		  dismissOnPageChange: true
		});
		this.loading.present();
	  }
	  
	showMessage(title, text) {
		this.loading.dismiss();
	 
		let alert = this.alertCtrl.create({
		  title: title,
		  subTitle: text,
		  buttons: ['OK']
		});
		alert.present();
	  }
	  /*
	fbLogin(){
		this.showLoading();
		this.fb.login(['public_profile', 'user_friends', 'email'])
		.then((res: FacebookLoginResponse) => this.login())
		.catch(e => this.showMessage('error', e));


	//this.fb.logEvent(fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
	
	}
   */
	logout() {
		this.auth.signOut();
	  }

	signup(){
		console.log("[loginPage] signup");
		this.navCtrl.push(SignupPage);
	}

	loginWithFacebook(){
		this.auth.signInWithFacebook()
		.then(result => {
			// The firebase.User instance:
			var user = result.user;
			console.log("[login] loginWithFacebook : user");
			console.log(user);
			// The Facebook firebase.auth.AuthCredential containing the Facebook
			// access token:
			var credential = result.credential;
			
		})
	}
	loginWithGoogle(){
		this.auth.signInWithGoogle()
		.then(result => {
				// The firebase.User instance:
			var user = result.user;
			console.log("[login] loginWithGoogle : user");
			console.log(user);
			// The Facebook firebase.auth.AuthCredential containing the Facebook
			// access token:
			var credential = result.credential;
			});
	}

	login(){
		this.showLoading();
		this.auth.signInWithEmail(this.registerCredentials)
			.then(
				() => {					
					// console.log("[loingPage] login : success");
					// console.log(this.auth.getUserInfo());					
					this.navCtrl.setRoot(TabsPage);
				},
				error => this.loginError = error.message
			);


		//this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		// new firebase.auth.EmailAuthProvider();
		// this.afAuth.auth.createUserWithEmailAndPassword("bsjang@bs-soft.co.kr","1q2w3e4r");
		// this.afAuth.auth.signInWithEmailAndPassword("bsjang@bs-soft.co.kr","1q2w3e4r");
		
		/*
		if(this.registerCredentials.username == "_4" && this.registerCredentials.password == "_4"){
			this.auth.login(this.registerCredentials, { 'data' : '{"logFlag": true,"modified": true,"reqType": 1,"siteId": 10}'}).subscribe(allowed => {
				console.log("subscribe");
				console.log(allowed);
				if (allowed) {
					//AboutPage.reload();
					this.navCtrl.setRoot(TabsPage);
				} else {
					//this.showError("Access Denied");
				}
			},
			error => {
				//this.showError(error);
			});			
		}
		*/

		/*	 
		this.showLoading();
		this.fb.getLoginStatus()
		.then((res: any) => {
			console.log('get login status on login page');
			console.log(res);
		})
		.catch(e => this.showMessage('error', e));

		console.log('login page');
		console.log('username : ' + this.registerCredentials.username);
		console.log('password : ' + this.registerCredentials.password);
		this.navCtrl.setRoot(TabsPage);
		*/
	}
	
	
  /*
	if(this.registerCredentials.username == "admin" && this.registerCredentials.password == "admin"){
		this.auth.login(this.registerCredentials, { 'data' : '{"logFlag": true,"modified": true,"reqType": 1,"siteId": 10}'}).subscribe(allowed => {
			console.log("subscribe");
			console.log(allowed);
			if (allowed) {
				//AboutPage.reload();
				this.navCtrl.setRoot(TabsPage);
			} else {
				this.showError("Access Denied");
			}
		},
		error => {
			this.showError(error);
		});			
	} else {
		
		this.http.post('http://59.0.228.137:80/login', 
		{ 
		  'username': this.registerCredentials.username,
		  'password': this.registerCredentials.password
		},
		{
		  
		})
		.then(data => {
			console.log(data);
			this.auth.login(this.registerCredentials, data).subscribe(allowed => {
				console.log("subscribe");
				console.log(allowed);
				if (allowed) {        
					this.navCtrl.setRoot(TabsPage);
				} else {
					this.showError("Access Denied");
				}
			},
			error => {
				this.showError(error);
			});			
		}).catch(error => {
			console.log('error');
			console.log(error);
			console.log(error.status);			
		});
		
	}
	*/
			
		  
	  //console.log('login function');
	  /*
	  var user = users.getUser($scope.user.username, $scope.user.password);
        if(user !== null){
            users.user = user;
            $state.go('tabsController.farmingDataLogger');
        } else {
            $ionicPopup.alert({
                title: "ID와 비밀번호를 확인하십시오"
            });
        }
		
		
	//console.log(this.username);
	
	//var username = auth.getUserInfo().username;
	
	
	//this.navCtrl.push(TabsPage)
	
	}
  
  
  
 */
  
  
  
}
