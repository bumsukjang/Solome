import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ANNOTATIONS } from '@angular/core/src/util/decorators';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'	
})

export class HomePage {
	solomes;
	friendIds = new Array();;
	solomeIds = new Array();;

	showLogs: boolean = true;

  constructor(/*private fb: Facebook, */
	public navCtrl: NavController
	, db: AngularFireDatabase
	, auth: AuthServiceProvider) {
	//this.showFriend();
	if(this.showLogs){
		console.log("[home.ts - constructor()] user's id");
		console.log(auth.getUserInfo().id);
	}	
	
	db.list('friendLists/'+auth.getUserInfo().id).snapshotChanges().map(actions => {
		return actions.map(action => ({
			id: action.key,
			isShow: action.payload.val()
		}));
	}).subscribe(friends =>{
		//this.users = users;
		console.log(friends);
		friends.forEach(friend => {
			/*
			console.log("[home.ts - constructor()] show friend list from " + friend.id);
			db.list('friendLists/'+friend.id).valueChanges().subscribe(console.log);
			*/
			db.list('users', ref => ref.orderByChild('id').equalTo(friend.id))
			.valueChanges().subscribe(friendInfo => {
				db.list('friendLists/'+friend.id).snapshotChanges().map(actions => {
					return actions.map(action => ({
						id: action.key,
						isShow: action.payload.val()
					}));
				}).subscribe(solomes =>{
					//this.users = users;
					//console.log(friends);
					solomes.forEach(solome => {
						let isFriend = false;
						friends.forEach(friend => {
							if(friend.id == solome.id){									
								isFriend = true;
							}
						});
						if(solome.isShow && solome.id != auth.getUserInfo().id && !isFriend){							
							console.log("[home.ts - constructor()] show solome("+solome.id+") from " + friend.id);
							this.solomeIds.push(solome.id);	
							db.list('users', ref => ref.orderByChild('id').equalTo(solome.id))
							.snapshotChanges(['child_added']).map(solomes => {
								return solomes.map(soloemInfo => ({
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
						/*
						db.list('users/'+solome.id).valueChanges().subscribe(value =>{
							let isFriend = false;
							friends.forEach(friend => {
								if(friend.id == solome.id){									
									isFriend = true;
								}
							});
							if(solome.isShow && solome.id != auth.getUserInfo().id && !isFriend){							
								console.log("[home.ts - constructor()] show solome("+solome.id+") from " + friend.id);
								console.log(this.solomes);
								console.log(value);
								if(this.solomes == null){
									this.solomes = solomes;
								}
								this.solomes.push(value);
								
								console.log(this.solomes);
								
							}
						});					
						*/
					});
				});
				/*
				solomes.forEach(solome => {
					if(solome.isShow && this.solomeIds.indexOf(solome.id) == -1){
						this.solomeIds.push(solome.id);
					}
				});
				*/
			});
		});
		
		if(this.showLogs){
			console.log("[home.ts - constructor()] solome ids");
			console.log(this.solomeIds);
			console.log("[home.ts - constructor()] solomes");
			console.log(this.solomes);
		}
	});

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
		  
	  
	showFriend(){
		console.log('showFriend');
		/*
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
		*/
	}
}
