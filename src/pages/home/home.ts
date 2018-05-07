import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ANNOTATIONS } from '@angular/core/src/util/decorators';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataServiceProvider } from './../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'	
})

export class HomePage {
	solomes = new Array();
	requests;

	friendIds = new Array();;
	solomeIds = new Array();;

	showLogs: boolean = true;
	showToast: boolean = false;

  constructor(/*private fb: Facebook, */
	public navCtrl: NavController
	, public db: AngularFireDatabase
	, public auth: AuthServiceProvider
	, public data: DataServiceProvider
	, public toastCtrl: ToastController) {
		/* auth.afAuth.auth.onAuthStateChanged(user => {
			if(user){
				this.db.object('users/'+user.uid).valueChanges().subscribe(newUser =>{
					console.log("Auth State Changed!!");
					console.log(newUser);
					auth.updateUser(newUser);
					
				});
			}
		}); */

	//this.showFriend();
	// if(this.showLogs){
	// 	console.log("[home.ts - constructor()] user's id");
	// 	console.log(auth.getUserInfo().id);
	// }	
	

	/*
	db.list('users/').snapshotChanges().map(actions => {
		return actions.map(action => ({
			id: action.key,
			...action.payload.val()
		}));
	}).subscribe(users =>{
		this.users = users;
		//console.log(users);
	});
	

	db.list('users').valueChanges().subscribe(val => {
		val.map(user => {
			db.list('comments', ref => ref.orderByChild('to').equalTo(user.id)).valueChanges().subscribe(val =>{
				//console.log('val : ');
				//console.log(val);
				user.comment = val;				
				console.log(user);
			});  
		});
		db.list('comments').valueChanges().subscribe(val => {
		})
		this.users = val;
		
	});
	*/
	
	
	

	//console.log(this.users.length);
	//var db = firebase.firestore();

		/*
	  db.collection("users").add({
			first: "Ada",
			last: "Lovelace",
			born: 1815
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
*/
	  
  }
		  
  ionViewWillEnter(){
		console.log("home ionViewWillEnter");
		console.log(this.auth.currentUser);
		if(this.auth.currentUser != null){
			if(!this.auth.currentUser.profile){
				this.toastCtrl.create({
					message: "사용자 정보를 추가하세요",
					duration: 3000,
					position: 'bottom'
				}).present();
			}
			console.log('[home.ts]-current user');
			console.log(this.auth.currentUser);
			this.showSolomes();
		}

  }

  noWantShow(solome){
	console.log(solome);
  }

  request(solome){
	// console.log(solome);
	// this.db.object('friendLists/'+solome.friend[0].id+'/'+solome.id+'/requests/'+this.auth.currentUser.id).update({
	// 	status: "request"
	// })
	console.log(solome);
	//this.data.requestMeeting(this.auth.currentUser.id, solome.friend.id, solome.id);
  }

	showSolomes(){
		console.log("home.ts - showSolomes - this.solomes from "+this.auth.currentUser.id);
		this.solomes = this.data.getSolomeList(this.auth.currentUser.id);
		if(this.solomes.length == 0){
			if(!this.showToast){
				this.toastCtrl.create({
					message: "솔로미가 없습니다.친구를 추가하거나 새로운 친구를 초대하세요.",
					duration: 3000,
					position: 'middle'
				}).present();
				this.showToast = true;
			}
		}
		
		//console.log(this.solomes);
	}
}
