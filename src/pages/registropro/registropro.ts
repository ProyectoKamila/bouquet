import { Login } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import * as io  from 'socket.io-client';

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
socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
socket:any;
type = "p-";
	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public loadingCtrl: LoadingController) { 
			this.socket = io.connect(this.socketHost);
      this.socket.emit('conf',{'project': 'bouquet.com'});
	}

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
						if(this.user.details == this.user.details){

									let data = {'insert' : {
									'user_login': this.type+this.dates.nombre,
									'user_email':this.dates.email,
									'user_pass': this.dates.password,
									'user_nicename': this.dates.usuario,
								}
							};
						
							console.log(data);
							this.socket.emit('insert_user', data );
							this.socket.on('insert_user', (data) => {
								
								console.log('user akiiii');
								console.log(data);
								console.log(data.insertId);

								let meta = {'insert' : {
				
										'user_id': data.insertId,
										'meta_key':'first_name',
										'meta_value': this.dates.nombre
										
									}
								};
								let meta2 = {'insert' : {
				
										'user_id': data.insertId,
										'meta_key':'validar',
										'meta_value': '0'
										
									}
								};
								let meta5 = {'insert' : {
				
										'user_id': data.insertId,
										'meta_key':'_validar',
										'meta_value': 'field_593eb42ac5088'
										
									}
								};
								let meta3 = {'insert' : {
				
										'user_id': data.insertId,
										'meta_key':'nickname',
										'meta_value': this.dates.usuario
										
									}
								};
								let meta4 = {'insert' : {
				
										'user_id': data.insertId,
										'meta_key':'wp_capabilities',
										'meta_value': 'a:1:{s:9:"proveedor";b:1;}'
										
									}
								};

								this.socket.emit('add_user_meta' , meta3 );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta3);
									console.log(data.insertId);
								});
								this.socket.emit('add_user_meta' , meta2 );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta2);
									console.log(data.insertId);
								});
								this.socket.emit('add_user_meta' , meta5 );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta5);
									console.log(data.insertId);
								});
								this.socket.emit('add_user_meta' , meta );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta);
									console.log(data.insertId);
								});
								this.socket.emit('add_user_meta' , meta4 );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta4);
									console.log(data.insertId);
								});
								

							});
								}
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
