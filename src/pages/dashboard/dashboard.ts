import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Login } from '../login/login';
import { Perfil } from '../perfil/perfil';
import { Catering } from '../catering/catering';
import { Bebidas } from '../bebidas/bebidas';
import { Comidas } from '../comidas/comidas';
import { Fotografia } from '../fotografia/fotografia';
import { Musicas } from '../musicas/musicas';
import { Vehiculos } from '../vehiculos/vehiculos';
import { Progreso } from '../progreso/progreso';
import { Chat } from '../chat/chat';
import { MenuController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import * as io  from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import {Push,PushToken } from '@ionic/cloud-angular';
 /// <reference path="../../typings/globals/socket.io-client/index.d.ts" />

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  proveedores;
  proveedor;
  page;
  pages;
  categories;
  listacat;
  datos;
  nombre;
  correo;
  img;
  direccion;
  @ViewChild(Content) content: Content;
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  chat:any;
  username:string;
  zone:any;
  meta = new Array<{any}>();
  public id: any;


  constructor(public navCtrl: NavController,public menuCtrl: MenuController, public navParams: NavParams, public viewCtrl: ViewController, public auth: Auth, public user: User  ,   public loadingCtrl: LoadingController , storage: Storage,  public push: Push) { 
           
        if (this.auth.isAuthenticated()) {
            this.push.rx.notification()
                        .subscribe((msg) => {
                          alert(msg.title + ': ' + msg.text);
                        });
            console.log(this.user.details);
            // this.nombre = this.user.get('usuario' , '');
            this.nombre = this.user.details.name;
            this.correo = this.user.details.email;
            this.img = this.user.get('photo' , '');
            if(this.img == null){
              this.img = this.user.details.image
            }
            
          }
          
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
      //this.socket.emit('query_post',{'condition': {'post_type':'proveedores','posts_per_page':10, 'categoria':'fotografia'},'key':'index'});
       this.socket.on('conf', (data) => {
        //  console.log('aquii');
      this.socket.emit('query_post',{'condition': {'post_type':'page','ID':414},'key':'home'});
     // this.socket.emit('get_categories',{'condition':{'type':'proveedores','taxonomy':'categoria'},'key':'scroll'})
      this.socket.emit('get_categories',{'type':'proveedores','taxonomy':'categoria','key':'scroll'})
      
      this.socket.on('get_categories', (data, key) => {
        console.log('aquiiii2');
        console.log(data);
        console.log(key);
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
        }
      });
 
         this.socket.on('query_post', (data, key) => {
          // this.id = navParams.get("id");
          // if(key== 'index'){
            
          //   //console.log('lol');
          //   if(data != null){
          //      this.proveedores =data;
          //      let x = 0;
          //      for (let value of data) {
          //       //  console.log(x);
          //     // //storage.set('event-'+value.ID , value);
          //     let dir = 'direccion' + x;
          //     let hora = 'hora' + x;
          //     let logo = 'logo' + x;
          //     let imgdetail = 'imgdetail' + x;
          //     this.socket.emit('field_name',{'field_name':'direccion','post_id':value.ID,'key':dir});
          //     this.socket.emit('field_name',{'field_name':'hora','post_id':value.ID,'key':hora});
          //     this.socket.emit('field_name',{'field_name':'logo','post_id':value.ID,'key':logo});
          //     this.socket.emit('field_name',{'field_name':'imgdetail','post_id':value.ID,'key':imgdetail});
          //     x++;
          //   }
          
          // }
          //      loader.dismiss();
          // }

           if(key == 'home'){
              console.log(data);
              if(data != null){
                this.page=data[0];
              }
              loader.dismiss();
            }
      });
 });
           
       //     this.socket.emit('field_name',{'field_name':'direccion','post_id':data[0].post_id,'key':'direccion'});
       
      //  this.socket.on("field_name", (data, key) => {
      //       console.log(data);
      //       let pos = this.proveedores;  
      //       let x = 0;
      //          for (let value of  this.proveedores) {
      //                let dir = 'direccion' + x;
      //                 let hora = 'hora' + x;
      //                 let logo = 'logo' + x;
      //                 let imgdetail = 'imgdetail' + x;
      //                  if(key == dir){
      //                     // console.log(this.proveedores[x]);
      //                     this.proveedores[x].direccion = data[0].meta_value;
      //                       console.log(this.proveedores[x].direccion);
      //                   }
      //                    if(key == hora){
      //                     // console.log(this.proveedores[x]);
      //                     this.proveedores[x].hora = data[0].meta_value;
      //                       console.log(this.proveedores[x].hora);
      //                   }
      //                      if(key == logo){
      //                           console.log(data);
      //                           if(data != null){
      //                                // this.proveedores[x].logo =  data[0].guid;
      //                                  console.log(this.proveedores[x].logo);
      //                           }
      //                   }
      //                    if(key == imgdetail){
      //                          // console.log(data);
      //                           if(data != null){
      //                                this.proveedores[x].imgdetail =  data[0].guid;
      //                                 console.log(this.proveedores[x].imgdetail);
      //                           }
      //                   }
                         
      //                 x++;
      //          }
              //  for(let value of  this.categories){
              //    let icons = 'icons' + x;
              //    if(key == icons){
              //             // console.log(this.proveedores[x]);
              //             this.proveedores[x].icons = data[0].meta_value;
              //               console.log(this.proveedores[x].icons);
              //           }
              //         x++;
              //  }

      
        // console.log(data + key);
      //  });

           // this.socket.on("field_name", (data, key) => {
           //       if(key == 'direccion'){
                   
           //          this.meta.push(data);
           //          console.log(this.meta);
           //       }
           //     });

 }


  // detail(id){
  //   console.log(id);  
  // this.navCtrl.push(Catering,{ id: id });
  // }
    ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');   
   
  }
  ionViewWillEnter() {
    console.log('oculta boton');
      this.viewCtrl.showBackButton(false);
    
  }
  perfil(){
    this.menuCtrl.close();
      this.navCtrl.push(Perfil);
}
bebidas(){
      this.navCtrl.push(Bebidas);
}
comidas(){
      this.navCtrl.push(Comidas);
}
fotografia(slug){
      this.navCtrl.push(Fotografia,{ url: slug });
}
musicas(){
      this.navCtrl.push(Musicas);
}
vehiculos(){
      this.navCtrl.push(Vehiculos);
}
progreso(){
      this.menuCtrl.close();
      this.navCtrl.push(Progreso);
}
chatOnline(){
  // this.menuCtrl.close();
    this.navCtrl.push(Chat);
}
  salir(){
    console.log('salir');
    this.menuCtrl.enable(false); 
    this.auth.logout();
    this.navCtrl.push(Login);
  }
  openMenu() {
    console.log('se abrio');
   //this.menuCtrl.open();
   //this.menuCtrl.isEnabled();
   console.log(this.menuCtrl.open);
 }


}
