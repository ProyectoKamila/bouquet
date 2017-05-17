import { Proveedor } from '../proveedor/proveedor';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contrasena } from '../contrasena/contrasena';
import { Registro } from '../registro/registro';
import { Dashboard } from '../dashboard/dashboard';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Push,PushToken } from '@ionic/cloud-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  email;
  password;
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public toastCtrl: ToastController, public  storage: Storage, public push: Push) { 
      this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   contrasena(){
      this.navCtrl.push(Contrasena);
}
   registro(){
    this.navCtrl.push(Registro);
}
   dashboard(){
     console.log('login');
     console.log(this.email);
       console.log(this.password);
     if(this.email != undefined ||  this.password != undefined){
       let details = { 'email': this.email, 'password': this.password };
       this.auth.login('basic' , details).then(() => {
      //   this.push.register().then((t: PushToken) => {
      //     console.log('reg push');
      //   return this.push.saveToken(t);
      // }).then((t: PushToken) => {
      //   console.log('Token saved:', t.token);
      // });
      if(this.user.details.email == 'proveedor@gmail.com'){
         this.navCtrl.push(Proveedor);
      }else{
         this.navCtrl.push(Dashboard);
      }
        
         
       }, (err) => {
           console.log('error  ');
             console.log(err);
              let toast = this.toastCtrl.create({
                message: 'Su email o Password son incorrectos',
                duration: 3000
            });
            toast.present();
          });
     }else {
      let toast = this.toastCtrl.create({
        message: 'Verifique sus datos',
        duration: 3000
    });
    toast.present();
     }
    // this.navCtrl.push(Dashboard);
}
}
