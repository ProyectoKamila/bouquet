import { Chat } from '../chat/chat';
import { Proveechat } from '../proveechat/proveechat';
import { Proveecitas } from '../proveecitas/proveecitas';
import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams,MenuController, LoadingController, ViewController, Content } from 'ionic-angular';
import { Login } from '../login/login';
import { ProveePerfil } from '../provee-perfil/provee-perfil';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {Push,PushToken } from '@ionic/cloud-angular';
import * as io  from 'socket.io-client';
/*
  Generated class for the Proveedor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-proveedor',
  templateUrl: 'proveedor.html'
})
export class Proveedor {
  nombre;
  correo;
  img;
  page;
  pages;
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  public id: any;
  @ViewChild(Content) content: Content;

  constructor( public push: Push,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public auth: Auth, public user: User, public loadingCtrl: LoadingController,public viewCtrl: ViewController) {
     this.push.rx.notification()
            .subscribe((msg) => {
              alert(msg.title + ': ' + msg.text);
            });
        if (this.auth.isAuthenticated()) {
          

            console.log(this.user.details);
           
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
 
      this.socket = io.connect(this.socketHost);
    
      this.socket.emit('conf',{'project': 'bouquet.com'});
      this.socket.emit('query_post',{'condition': {'post_type':'page','ID':419},'key':'home'});
       this.socket.on('query_post', (data, key) => {
          

           if(key == 'home'){
              console.log(data);
              if(data != null){
                this.page=data[0];
              }
              loader.dismiss();
            }
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proveedor');
  }
  ionViewWillEnter() {
    console.log('oculta boton');
      this.viewCtrl.showBackButton(false);
    
  }

salir(){
    console.log('salir');
    this.auth.logout();
    this.navCtrl.push(Login);
  }
  perfil(){
      this.navCtrl.push(ProveePerfil);
}
citas(){
      this.navCtrl.push(Proveecitas);
}
chat(){
      this.navCtrl.push(Chat);
}

}
