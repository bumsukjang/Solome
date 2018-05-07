import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { validateArgCount } from '@firebase/util';

@Injectable()
export class DataServiceProvider {
    users = new Array();
    friendLists = new Array();

  constructor(
	public db: AngularFireDatabase
	) {
		//console.log('Hello DataService Provider');
        db.list('users').valueChanges().subscribe(val =>{
            //console.log("[data service] - constructor : users ");                
            this.users = val;
            //console.log(this.users);    
        });

        db.list('friendLists').snapshotChanges().map(actions =>{
            //console.log("[data service] - constructor : friendLists ");      
            return actions.map(action => ({
				withId: action.key,
                data : action.payload.val()
			}));
        }).subscribe(val => {                      
            this.friendLists = val;
            //console.log(this.friendLists);    
        });
        
    }

    requestMeeting(userId, friendId, solomeId){        
        return this.db.list('request').push({
            friendId : friendId,
            toUserId : solomeId,
            fromUserId : userId
        });
    }

    getUsersList(options?){
        return this.users;
    }

    getUserProfile(userId){
        let userProfile = this.users.filter((user)=>{
            if(userId != null){
                return (user.id == userId);
            } else {
                return false;
            }
        });
        return userProfile[0];
    }
    
    getFriendList(userId, options?){
        //console.log("[data service] - getFriendList from " + userId);    
        let friendList = this.friendLists.filter((user) => {
            console.log(user);
            if(user.withId != null){
                return (user.withId == userId);
            } else {
                return false;
            }
        });
        let friends = new Array();
        
        if(friendList.length > 0){
            Object.keys(friendList[0].data).forEach((friendId)=>{
                let friend = friendList[0].data[friendId];
                friends.push(friend);
            })
        }
        return friends;
    }

    getSolomeList(userId, options?){        
        // console.log("[data service] - getSolomeList from "+userId);
        // console.log("[data service] - getSolomeList : friends ");
        let solomes = new Array();
        let friends = this.getFriendList(userId);     
        friends.forEach(friend => {     
            //friend = friend.data[Object.keys(friend.data)[0]];
            // console.log("friend data");
            // console.log(friend);
            this.getFriendList(friend.id).forEach(solome =>{
                solome.profile = this.getUserProfile(solome.id);
                solome.friend = this.getUserProfile(friend.id);
                if(solome.id != userId){
                    if(friends.findIndex((friend) =>(
                        friend.id == solome.id
                    )) == -1){
                        solomes.push(solome);
                        // console.log("[data service] getSolomeList : push solome");
                        // console.log(solome);
                    }
                }                
            })
        });
        return solomes.filter((solome, index, self) =>
        index === self.findIndex((s) => (
           s.id === solome.id 
        )));
    }

    setShow(userId, connection){
        this.db.object('friendLists/'+userId+'/'+connection.id).update({
            isShow: connection.isShow
        })
    }

    getRequestList(userId,friendId, options){

    }

    getAllRequestList(userId){

    }
    singUp(user){
        return this.addUser(user);
    }
    addUser(user){
        return this.db.object('users/'+user.id).update({
            id : user.uid,
            email: user.email
        });
    }

    updateUserProfile(profile){

    }

    applyFriend(user, friend){
        this.db.list('friendLists/'+user.id+'/'+friend.id).push({
            id: friend.id
        })
    }

    agreeFriend(user, friend){

    }

    rejectFriend(user, friend){
        
    }

    getFriendStatus(user, friend){

    }
}   
	