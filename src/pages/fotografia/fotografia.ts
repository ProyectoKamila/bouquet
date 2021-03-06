import { Component, NgZone, ViewChild } from '@angular/core';
import { MenuController,NavController, NavParams, ViewController, Content } from 'ionic-angular';
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
  selector: 'page-fotografia',
  templateUrl: 'fotografia.html'
})
export class Fotografia {
  proveedores;
  proveedor;
  page;
  pages;
  datos;
  nombre;
  correo;
  img;
  direccion;
  @ViewChild(Content) content: Content;
  // messages:any = [];
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  chat:any;
  username:string;
  zone:any;
   public slug:any;
  meta = new Array<{any}>();

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public user: User  ,   public loadingCtrl: LoadingController , storage: Storage) { 
      
      this.slug = navParams.get("url");
       console.log("esto es " + this.slug);

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
      this.socket.emit('conf',{'project': 'bouquet.com'});
      this.socket.on('conf', (data) => {
      this.socket.emit('query_post',{'condition': {'post_type':'proveedores','posts_per_page':10, 'category':['categoria', this.slug]},'key':'index'});
  //this.socket.emit('query_post',{'condition': {'post_type':'proveedores','posts_per_page':10, 'category':[this.slug,'fotografia']},'key':'index'});

      
         this.socket.on('query_post', (data, key) => {
          console.log(data);
          if(key== 'index'){

            if(data != null){
               this.proveedores =data;
            let x = 0;
               for (let value of data) {
                //  console.log(x);
              // //storage.set('event-'+value.ID , value);
              let dir = 'direccion' + x;
              let hora = 'hora' + x;
              let logo = 'logo' + x;
              let imgdetail = 'imgdetail' + x;
              this.socket.emit('field_name',{'field_name':'direccion','post_id':value.ID,'key':dir});
              this.socket.emit('field_name',{'field_name':'hora','post_id':value.ID,'key':hora});
              this.socket.emit('field_name',{'field_name':'logo','post_id':value.ID,'key':logo});
              this.socket.emit('field_name',{'field_name':'imgdetail','post_id':value.ID,'key':imgdetail});
              x++;
            }
          
          }
               loader.dismiss();
          }
      });
      this.socket.on("field_name", (data, key) => {
            let pos = this.proveedores.length;
            let x = 0;
               for (let value of  this.proveedores) {
                     let dir = 'direccion' + x;
                      let hora = 'hora' + x;
                      let logo = 'logo' + x;
                        let imgdetail = 'imgdetail' + x;
                       if(key == dir){
                          // console.log(this.proveedores[x]);
                          this.proveedores[x].direccion = data[0].meta_value;
                           // console.log(this.proveedores[x].direccion);
                        }
                         if(key == hora){
                          // console.log(this.proveedores[x]);
                          this.proveedores[x].hora = data[0].meta_value;
                           // console.log(this.proveedores[x].hora);
                        }
                           if(key == logo){
                                console.log(data);
                                if(data != null){
                                      //this.proveedores[x].logo =  data[0].guid;
                                       //console.log(this.proveedores[x].logo);
                                }
                        }
                         if(key == imgdetail){
                               // console.log(data);
                                if(data != null){
                                     this.proveedores[x].imgdetail =  data[0].guid;
                                    //  console.log(this.proveedores[x].imgdetail);
                                }
                        }
                      x++;
               }
      
        // console.log(data + key);
       });

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


  perfil(){
      this.menuCtrl.close();
      this.navCtrl.push(Perfil);
}
  detail(id){
    console.log(id);  
  this.navCtrl.push(Catering,{ id: id });
  }
  salir(){
    console.log('salir');
    this.menuCtrl.close();
    this.auth.logout();
    this.navCtrl.push(Login);
  }

}
