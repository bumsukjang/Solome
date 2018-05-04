import { HomePage } from './../../pages/home/home';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DateTime } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User{
	id: string;
	password: string;
	name: string;
	gender: string;
	work: string;
	relationship_status: string;
	email: string;
	location: string;
	languages: string[];
	age_range: number[];
	education: string;
	sports: string[];
	books: string[];
	foods: string[];
	movies: string[];
	interested_in: string[];
	hometown: string;
	inspirational_people: string[];
	meeting_for: string;
	religion: string;
	updated_time: DateTime;
	photoUrl: string;

	constructor(id, name){
		this.id = id;
		this.name = name;
	}

	
}

@Injectable()
export class AuthServiceProvider {
	
	public currentUser;

  constructor(/*public http: HttpClient, private http: HTTP*/
	public afAuth: AngularFireAuth
	, public db: AngularFireDatabase
	) {
		console.log('Hello AuthService Provider');
		afAuth.authState.subscribe(user => {
			console.log("[auth-service] constructor : authState subscribe user");
			console.log(user);
			console.log(user != null);
			if(user != null){
				this.currentUser = user;
				this.currentUser.id = user.uid;
				this.db.object('users/'+user.uid).valueChanges().subscribe(newUser =>{
					console.log("Auth State Changed!!");
					console.log(newUser);
					if(newUser != null){
						this.updateUser(newUser);
					}
				});
			}
		});
		this.signOut();
		
	
	}
	
	public updateUser(user) {
		this.currentUser = user;		
		/* if (user) {
			console.log("[auth-service] user state changed : user");
			console.log(user);
			if(!this.currentUser){
				this.currentUser = new User(user.uid, user.displayName);
			} else {
				this.currentUser.id = user.uid; 
				this.currentUser.name = user.displayName; 
			}
			this.currentUser.email = user.email;
			this.currentUser.photoUrl = user.photoURL;
			//this.currentUser.emailVerified = user.emailVerified;
			console.log("getuserInfo");
			//this.db.list('users/'+this.currentUser.id).valueChanges().subscribe(console.log);
		
		} else {
			console.log("none user");
		} */
	}

	public login(credentials, data) {
		let access = false;
		let jsonData;
		console.log('username' + credentials.username);
		console.log('data');
		console.log(data.data);
		jsonData = JSON.parse(data.data);
		console.log(jsonData);
		/*
		if(data.data.substr(data.data.indexOf("Farming")+8,3).indexOf(',') > 0){
			access = true;
			siteId = data.data.substr(data.data.indexOf("Farming")+8,3).split(',')[0];
		}
		*/
		if(jsonData['logFlag'] == true){
			access = true;
		}
		if (credentials.username === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			return Observable.create(observer => {
				
				// At this point make a request to your backend to make a real check!
				
				this.currentUser = new User(credentials.username, jsonData['name']);
				console.log(this.currentUser);
				console.log('access : ' + access);
				observer.next(access);
				observer.complete();
			});
		}
	}
	
	/**
	 * signInWithEmail(registerCredentis)
	 */
	public signInWithEmail(registerCredentials) {		
		// console.log("[auth-service] signInWithEmail : try login with email");
		// console.log(this.currentUser);
		return this.afAuth.auth.signInWithEmailAndPassword(registerCredentials.email, registerCredentials.password);
	}

	public signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);

	}

	public saveUserInfo(user){
		console.log("save user info");
		console.log(user);
		this.db.object('users/'+user.id).set(user);
	}
	
	public getUserInfo() : User {
		console.log("[Auth] getUserInfo");
		console.log(this.currentUser);
		return this.currentUser;
	}

	public signInWithFacebook(){
		return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}
	public signInWithGoogle(){
		return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}
	 
	public logout() {		
		this.afAuth.auth.signOut();
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}
	get authenticated(): boolean{
		return this.currentUser !== null;
	}

	getEmail(){
		return this.currentUser && this.currentUser.email;
	}

	

	public signOut(): Promise<void>{
		return this.afAuth.auth.signOut();
	}
}
