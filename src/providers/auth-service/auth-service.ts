//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DateTime } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User{
	id: string;
	passwrod: string;
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
	

	constructor(id, name){
		this.id = id;
		this.name = name;
	}

	
}

@Injectable()
export class AuthServiceProvider {
	
	currentUser: User;
  
  constructor(/*public http: HttpClient, private http: HTTP*/) {
    console.log('Hello AuthServiceProvider Provider');
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
	 
	  	 
	public getUserInfo() : User {
		return this.currentUser;
	}
	 
	public logout() {
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}
}
