import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as io from 'socket.io-client';

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
  socket:any;
  chat_input:string;
  chats = [];
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.socket = io.connect(this.socketHost);

    this.socket.on('message', (msg) => {
      console.log("message", msg);
      this.chats.push(msg);
    });
  }

  send(msg) {
        if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chat_input = '';
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenchatPage');
  }

}
