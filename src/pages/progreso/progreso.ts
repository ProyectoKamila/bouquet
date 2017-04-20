import { Listaprocesos } from './../listaprocesos/listaprocesos';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';
import {Push,PushToken } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import * as io  from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the Progreso page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-progreso',
  templateUrl: 'progreso.html'
})
export class Progreso {
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  categories;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,  public push: Push,  public loadingCtrl: LoadingController) {
      this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
      });
       let  loader = this.loadingCtrl.create({
       content: "Cargando"      
     });
      loader.present();
      this.socket = io.connect(this.socketHost);
      this.socket.emit('conf',{'project': 'bouquet.com'});
      this.socket.emit('get_categories',{'type':'proveedores','taxonomy':'categoria','key':'scroll'})
       this.socket.on('get_categories', (data, key) => {
        if(key == 'scroll'){
          if(data != null){
            this.categories = data;
            console.log(this.categories);
            let x = 0;
             for(let value of data){
              let namecat = 'icons' + x;
                this.socket.emit('field_name',{'field_name':'icons','term_id':value.term_id,'key':namecat});
              x++;
            }
          }
              loader.dismiss();          
        }
      });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Progreso');
  }
  presentModal(slug) {  
    let modal = this.modalCtrl.create(Listaprocesos,{slug:slug});
    this.navCtrl.push(modal);
    // modal.present(slug);
  }

}
