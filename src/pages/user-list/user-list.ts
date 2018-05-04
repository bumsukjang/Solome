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
    , public db: AngularFireDatabase
    , public auth: AuthServiceProvider) {
      db.list('users').valueChanges().subscribe(val => {     
        console.log("userlistpage");
        console.log(auth.currentUser);   
        db.list('friendLists/'+auth.currentUser.id).snapshotChanges().map(actions => {
          return actions.map(action => ({
            id: action.key,
            ...action.payload.val()
          }));
        }).subscribe(friends =>{
          this.friendList = new Array();
          friends.forEach(friend => {
            if(friend.status == "agreed"){
              this.friendList.push(friend.id);
            } else {
              this.appliedFriendList.push(friend.id);              
            }
            
          })
          this.friendList.push(auth.currentUser.id);
          console.log(this.friendList);
        });
        //this.userList = val;
        this.originalUserList = val;
      });
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
    this.db.object("friendLists/"+this.auth.currentUser.id+"/"+fid).set({
      status:"applied",
      isShow:false
    });
    this.db.object("friendLists/"+fid+"/"+this.auth.currentUser.id).set({
      status:"received",
      isShow:false
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }
  

}
