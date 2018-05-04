import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';

@Injectable()
export class DataServiceProvider {

  constructor(
	public db: AngularFireDatabase
	) {
		console.log('Hello DataService Provider');
        
    }

    requestMeeting(userId, friendId, solomeId){        
        return this.db.list('request').push({
            friendId : friendId,
            toUserId : solomeId,
            fromUserId : userId
        });
    }

    getUsersList(options){

    }

    getUserProfile(userId){

    }

    getFriendList(userId, options){

    }

    getSoloemeList(userId, options){

    }

    getRequestList(userId,friendId, options){

    }

    getAllRequestList(userId){

    }

    addUser(userId){

    }

    updateUserProfile(profile){

    }

    applyFriend(user, friend){

    }

    agreeFriend(user, friend){

    }

    rejectFriend(user, friend){
        
    }

    getFriendStatus(user, friend){

    }
}   
	