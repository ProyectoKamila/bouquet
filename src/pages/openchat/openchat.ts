import { Component } from '@angular/core';
import { NavController, NavParams,Content, LoadingController  } from 'ionic-angular';
import * as io from 'socket.io-client';
import { ViewChild,NgZone } from '@angular/core';
import { Auth, User } from '@ionic/cloud-angular';



/*
  Generated class for the Openchat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-openchat',
  templateUrl: 'openchat.html'
})
export class Openchat {
  @ViewChild(Content) content:Content
  messages:any = [];
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  chat:any;
  username:string;
  zone:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: Auth, public user: User, public loadingCtrl: LoadingController  ) {

    if (this.auth.isAuthenticated()) {
            // this.push.rx.notification()
            //             .subscribe((msg) => {
            //               alert(msg.title + ': ' + msg.text);
            //             });
            console.log(this.user.details);
            this.username = this.user.details.email; 
            
            
          }
    let  loader = this.loadingCtrl.create({
    content: "Cargando"      
    });
    loader.present();

    this.socket = io.connect(this.socketHost);
    this.socket.emit('conf',{'project': 'bouquet.com'});
    this.socket.on('conf', (data) => {
    this.socket.emit('insert_post',{'condition': {'post_type':'chat','post_title':this.username},'key':'post'});
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("chat message", (msg) =>{
      this.zone.run(() =>{
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
    this.socket.on('insert_post', (data, key) => {
      if(key == 'post'){
             console.log('acacacaca');
              console.log(data);
              if(data != null){
                loader.dismiss();
              }
              
            }
     }); 
    });
  }

  chatSend(v){
  let data = {
    message: v.chatText,
    username: this.username
  }
  this.socket.emit('new message', data);
  this.chat= '';

 }

}
