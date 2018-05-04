import { UserListPage } from '../user-list/user-list';
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ANNOTATIONS } from '@angular/core/src/util/decorators';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  connections = new Array();
  constructor(public navCtrl: NavController
    , public db: AngularFireDatabase
    , public auth: AuthServiceProvider) {
      this.showConnections();
  }
  setShow(connection){
    console.log("setShow()");
    console.log(connection);
    console.log(this.connections);
    //this.connections.forEach(connection =>{
    this.db.object("friendLists/"+this.auth.currentUser.id+"/"+connection.id).update({isShow:connection.isShow});      
    //});
  }

  public addFriend(){
    this.navCtrl.push(UserListPage);
  }

  

  agreeFriend(connection){
    connection.status = "agreed";
    this.db.object("friendLists/"+this.auth.currentUser.id+"/"+connection.id).update({
      status:connection.status
    });
    this.db.object("friendLists/"+connection.id+"/"+this.auth.currentUser.id).update({
      status:connection.status
    });
  }

  showConnections(){
    this.connections = new Array();    
      console.log('[connections] showConnections');
      if(this.auth.currentUser){
        console.log(this.auth.currentUser.id);
        this.db.list('friendLists/'+this.auth.currentUser.id).snapshotChanges().map(actions => {
          console.log("friend list changed!");
          return actions.map(action => ({
            id: action.key,
            ...action.payload.val()
          }));
        }).subscribe(friends =>{        
          //this.connections= friends;
          console.log(this.connections);
          
          if(friends.length != this.connections.length){  
            this.connections=new Array();          
              friends.forEach(friend => {
                //if(friend.status == "agreed"){
                  //this.db.list('users', ref => ref.orderByChild('id').equalTo(friend.id))
                  this.db.object('users/'+friend.id)
                  .valueChanges().subscribe(fi => {             
                      // console.log("friendInfo");
                      // console.log(friendInfo);
                      friend.name = fi['name'];
                      friend.picture_url = fi['picture_url'];
                      friend.email = fi['email'];
                      //friendInfo['isShow']=friend.isShow;  
                      console.log(this.connections.values());
                      //if(friends.length > this.connections.length){
                      this.db.list('friendList/'+this.auth.currentUser.id+'/'+friend.id+'/requests').snapshotChanges().map(actions => {
                        return actions.map(action => ({
                          id: action.key,
                          ...action.payload.val()
                        }));
                      }).subscribe(requests=>{
                        friend.requests = new Array();
                        requests.forEach(request =>{
                          friend.requests.push(request);
                        });
                        this.connections.push(friend);
                      });
                      
                      //}
                    });
                    //this.connections.push(this.db.object('users/'+friend.id).valueChanges());
                //}
                
            }); 
          }
        }); 
      }
      
        console.log("[connections]");
        console.log(this.connections);
  };
}
