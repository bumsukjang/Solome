import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private fb: Facebook, public navCtrl: NavController) {
	this.showFriend();	
  }
		  
	  
	showFriend(){
		console.log('showFriend');
		this.fb.api("me?fields=friends.limit(10){gender,about,age_range,birthday,email,languages,name,picture}",[])
		.then(userData => {
			//API success callback
			console.log(JSON.stringify(userData));
		})
		.catch(error => {
			//API error callback
			console.log(JSON.stringify(error));
		});
		
		this.fb.getLoginStatus()
		.then((res: any) => function(res){
			console.log('get login status one solome page');
			console.log(res);
		})
		.catch(e => console.log(e));
	}
}
