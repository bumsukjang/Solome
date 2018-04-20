import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

//import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
	
	loading: Loading;
	registerCredentials = { username: '', password: '' };
 
 
	constructor(private fb: Facebook, public navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController/*, private http: HTTP, private auth: AuthServiceProvider */) {
	  /*if(auth.getUserInfo() != null){
		  this.navCtrl.setRoot(TabsPage);
	  }
	  */
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
	  
	fbLogin(){
		//this.showLoading();
		this.fb.login(['public_profile', 'user_friends', 'email'])
		.then((res: FacebookLoginResponse) => this.login())
		.catch(e => this.showMessage('error', e));


	//this.fb.logEvent(fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
	
	}
   
	login(){	 
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
	}
	
	showLoading() {
		this.loading = this.loadingCtrl.create({
		  content: '로그인 중입니다.',
		  dismissOnPageChange: true
		});
		this.loading.present();
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
