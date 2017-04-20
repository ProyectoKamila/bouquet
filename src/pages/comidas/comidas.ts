import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Login } from '../login/login';
import { Perfil } from '../perfil/perfil';
import { Catering } from '../catering/catering';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import * as io  from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
 /// <reference path="../../typings/globals/socket.io-client/index.d.ts" />

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comidas',
  templateUrl: 'comidas.html'
})
export class Comidas {
  proveedores;
  datos;
  direccion;
  @ViewChild(Content) content: Content;
  // messages:any = [];
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  chat:any;
  username:string;
  zone:any;
  meta = new Array<{any}>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public user: User  ,   public loadingCtrl: LoadingController , storage: Storage) { 
      let  loader = this.loadingCtrl.create({
       content: "Cargando"      
     });
 loader.present();
  // storage.ready().then(() => {

  //      // set a key/value
  //      storage.set('name', 'Max');

  //      // Or to get a key/value pair
  //      storage.get('name').then((val) => {
  //        console.log('Your age is', val);
  //      })
  //    });
     this.socket = io.connect(this.socketHost);
     //this.zone = new NgZone({enableLongStackTrace:false});
      this.socket.emit('conf',{'project': 'proyectokamila.com'});
      this.socket.emit('query_post',{'condition': {'post_type':'proveedores','posts_per_page':10, 'categoria':'fotografia'},'key':'index'});
         this.socket.on('query_post', (data, key) => {
          console.log(data);
          if(key== 'index'){
           
            if(data != null){
               this.proveedores =data;
            //    for (let value of data) {
            // //storage.set('event-'+value.ID , value);
            // this.socket.emit('field_name',{'field_name':'direccion','post_id':value.ID,'key':'direccion'});
          
            // }
          
            }
              
               loader.dismiss();

          }
      });

           
       //     this.socket.emit('field_name',{'field_name':'direccion','post_id':data[0].post_id,'key':'direccion'});
       // this.socket.on("field_name", (data, key) => {
       //   if(key == 'direccion'){
       //     console.log(data);
       //       this.direccion = data;
       //   }
       // });

           // this.socket.on("field_name", (data, key) => {
           //       if(key == 'direccion'){
                   
           //          this.meta.push(data);
           //          console.log(this.meta);
           //       }
           //     });
 }



  nowDireccion(){
    

  }
    ionViewDidLoad() {
    console.log('ionViewDidLoad Comidas');   
   
  }
  perfil(){
      this.navCtrl.push(Perfil);
}
  catering(){
      this.navCtrl.push(Catering);
}
  salir(){
    console.log('salir');
    this.auth.logout();
    this.navCtrl.push(Login);
  }

}
