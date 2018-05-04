import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
	solomes;
	requests;
	
	friendIds = new Array();;
	solomeIds = new Array();;

	showLogs: boolean = true;

  constructor(/*private fb: Facebook, */
	public navCtrl: NavController
	, public db: AngularFireDatabase
	, public auth: AuthServiceProvider
	, public data: DataServiceProvider) {
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
		console.log('[home.ts]-current user');
		console.log(this.auth.currentUser);
		this.showSolomes();
	  }
  }

  noWantShow(solome){
	console.log(solome);
  }

  request(friend, solome){
	// console.log(solome);
	// this.db.object('friendLists/'+solome.friend[0].id+'/'+solome.id+'/requests/'+this.auth.currentUser.id).update({
	// 	status: "request"
	// })
	this.data.requestMeeting(this.auth.currentUser.id, friend.id, solome.id);
  }

	showSolomes(){

		this.solomes = this.data.getSoloemeList;
		this.requests = this.data.getAllRequestList(this.auth.currentUser.id);
		
		/* console.log('[home.ts] showSolomes() of'+ this.auth.currentUser);
		this.db.list('friendLists/'+this.auth.currentUser.id).snapshotChanges().map(actions => {
			return actions.map(action => ({
				id: action.key,
				...action.payload.val()
			}));
		}).subscribe(friends =>{
			//this.users = users;
			console.log(friends);
			friends.forEach(friend => {				
				console.log("friend status");
				console.log(friend.status);
				if(friend.status == "agreed"){
					this.db.list('users', ref => ref.orderByChild('id').equalTo(friend.id))
					.valueChanges().subscribe(friendInfo => {
						this.db.list('friendLists/'+friend.id).snapshotChanges().map(actions => {
							return actions.map(action => ({
								id: action.key,
								...action.payload.val()
							}));
						}).subscribe(solomes =>{
							//this.users = users;
							//console.log(friends);
							if(this.solomes == null || this.solomes.length != solomes.length){
								this.solomes = null;
								solomes.forEach(solome => {
									let isFriend = false;								
									friends.forEach(friend => {
										if(friend.id == solome.id){									
											isFriend = true;
										}									
									});
									console.log("solome");
									console.log(solome);
									if(solome.isShow && solome.id != this.auth.currentUser.id && !isFriend){							
										console.log("[home.ts - constructor()] show solome("+solome.id+") from " + friend.id);
										this.solomeIds.push(solome.id);	
										this.db.list('users', ref => ref.orderByChild('id').equalTo(solome.id))
										.snapshotChanges(['child_added']).map(solomeInfos => {
											return solomeInfos.map(soloemInfo => ({
												id: soloemInfo.key,
												friend: friendInfo,
												...soloemInfo.payload.val()
											}));
										}).subscribe(solomeInfo => {
											console.log("[home.ts - constructor()] show solomeInfo("+solome.id+") from " + friend.id);
											console.log(solomeInfo);
											if(this.solomes == null){
												this.solomes = solomeInfo;
											} else {
												console.log("[home.ts - constructor()] solome info");
												console.log(solomeInfo[0]);
												this.solomes.push(solomeInfo[0]);
											}
											
											if(this.showLogs){
												console.log("[home.ts - constructor()] solomes");
												console.log(this.solomes);
											}
										});
									}
								});
							}
						});
					});
				}
				
			});
			
			if(this.showLogs){
				console.log("[home.ts - constructor()] solome ids");
				console.log(this.solomeIds);
				console.log("[home.ts - constructor()] solomes");
				console.log(this.solomes);
			}
		}); */
	}
}
