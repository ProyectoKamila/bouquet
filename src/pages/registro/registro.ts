import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import * as io  from 'socket.io-client';
import { LoadingController } from 'ionic-angular';
import { Login } from '../login/login';
import { RegistroproPage } from './../registropro/registropro';
import { ToastController } from 'ionic-angular';
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
	dates = { email:'', password:'',novios:'',usuario:'',telefono:'',tipo:'',fecha:'' , types: false}
	socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
	type = "u-";
	 
	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
			this.socket = io.connect(this.socketHost);
      this.socket.emit('conf',{'project': 'bouquet.com'});
	 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  proveedor(){
    console.log('registropro');
    this.navCtrl.push(RegistroproPage);
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
						if(this.user.details == this.user.details){

									let data = {'insert' : {
									'user_login': this.type+this.dates.novios,
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
										'meta_value': this.dates.novios
										
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
										'meta_value': 'a:1:{s:7:"usuario";b:1;}'
										
									}
								};

								this.socket.emit('add_user_meta' , meta3 );
								this.socket.on('add_user_meta', (data) => {
									console.log('user meta akiiii');
									console.log(data);
									console.log(meta3);
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
						 let toast = this.toastCtrl.create({
                message: 'Se registro correctamente',
                duration: 3000
            });
            toast.present();
					}, (err: IDetailedError<string[]>) => {
						for (let e of err.details) {
							if (e === 'conflict_email') {
								let toast = this.toastCtrl.create({
                message: 'Este email esta registrado',
                duration: 3000
								});
								toast.present();
								loader.dismiss();
							} else {
								// handle other errors
								let toast = this.toastCtrl.create({
                message: 'Verifique los datos',
                duration: 3000
								});
								toast.present();
								loader.dismiss();
							}
						}
					});
			  }
		}
  }
	prov(t){
		console.log(t);
	}
}
