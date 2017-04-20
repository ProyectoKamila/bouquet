import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import { Login } from '../login/login';
/*
  Generated class for the Registro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class Registro{
	dates = { email:'', password:'',novios:'',usuario:'',telefono:'',tipo:'',fecha:''}
	 
	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  salir(){
    console.log('salir');
    this.navCtrl.push(Login);
  }
  registrar(){
	  let loader = this.loadingCtrl.create({
		  content: "Espere"
	  });
	  loader.present();
	 // console.log(this.dates);
		if(this.dates != null){	  
			  if(this.dates.email != undefined){
				
				  let details: UserDetails = { 'email': this.dates.email, 'password': this.dates.password ,'name': this.dates.novios, 'custom':	{'usuario': this.dates.usuario,'telefono': this.dates.telefono,'tipo': this.dates.tipo,'fecha': this.dates.fecha }	};
					this.auth.signup(details ).then(() => {
						// `this.user` is now registered
						console.log(this.user.details);
						// this.user.set('usuario', 'this.dates.usuario');
						// this.user.save();
						loader.dismiss();
						this.navCtrl.push(Login);
					}, (err: IDetailedError<string[]>) => {
						for (let e of err.details) {
							if (e === 'conflict_email') {
								alert('Email already exists.');
								loader.dismiss();
							} else {
								// handle other errors
								alert('Email already exists.');
								loader.dismiss();
							}
						}
					});
			  }
		}
  }
}
