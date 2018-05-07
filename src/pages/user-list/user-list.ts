import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  userList = new Array();
  originalUserList = new Array();
  friendList = new Array();
  appliedFriendList = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public db: DataServiceProvider
    , public auth: AuthServiceProvider) {
      db.getFriendList(this.auth.currentUser.id).forEach(friend =>{
        this.friendList.push(friend.id);
      })
      this.originalUserList = db.getUsersList().filter((user) =>{
        if(user != null){
          if(user.status == "applied"){
            this.appliedFriendList.push(user);
          }
          return user.id != this.auth.currentUser.id;
        }
      });
      console.log("applied friend list");
      console.log(this.appliedFriendList);
      console.log("friend list");
      console.log(this.friendList);
  }

  getUsers(ev: any) {
    // Reset items back to all of the items
     // set val to the value of the searchbar
    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items    )
    if (val && val.trim() != '' && val.length > 2) {     
      this.userList = this.originalUserList.filter((user) => {
        if(user.email != null){
          return (user.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
        } else {
          return false;
        }

      })
    } else {
      this.userList = null;
    }
  }

  applyFriend(fid){
    // this.db.object("friendLists/"+this.auth.currentUser.id+"/"+fid).set({
    //   status:"applied",
    //   isShow:false
    // });
    // this.db.object("friendLists/"+fid+"/"+this.auth.currentUser.id).set({
    //   status:"received",
    //   isShow:false
    // });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }
  

}
