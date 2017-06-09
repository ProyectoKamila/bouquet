import { Login } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegistroproPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registropro',
  templateUrl: 'registropro.html',
})
export class RegistroproPage {

dates = { email:'', password:'',nombre:'',usuario:'',telefono:'',rif:''}
	 
	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  salir(){
    console.log('registropro');
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
				
				  let details: UserDetails = { 'email': this.dates.email, 'password': this.dates.password ,'name': this.dates.nombre, 'custom':	{'usuario': this.dates.usuario,'telefono': this.dates.telefono,'rif': this.dates.rif }	};
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
