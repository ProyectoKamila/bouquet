import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Login } from '../login/login';
import { Camera } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { ActionSheetController, Platform } from 'ionic-angular';
/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {
  nombre;
  correo;
  img;
  telefono;
  tipo;
  fecha;
  dates = { direccion:'',instagram:'',telefono:'',photo:''}
  data;
  profile;
  public base64Image:string;

  constructor(public platform: Platform, public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public auth: Auth,public user: User, public loadingCtrl: LoadingController) {
   
    if (this.auth.isAuthenticated()) {
          

            console.log(this.user);
            this.dates.telefono = this.user.get('telefono' , '');
            this.dates.direccion = this.user.get('direccion' , '');
            this.dates.instagram = this.user.get('instagram' , '');
            this.dates.photo = this.user.get('photo' , '');
            if(this.dates.photo == null){
              this.dates.photo = this.user.details.image
            }
            this.nombre = this.user.details.name;
            this.correo = this.user.details.email;
            // this.img = this.user.details.image;
            
            
          }
          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Perfil');
  }
  toggleRightMenu() {
  this.menuCtrl.toggle('right');
}
salir(){
    console.log('salir');
    this.auth.logout();
    this.navCtrl.push(Login);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pefil',
      buttons: [
        {
          text: 'Camara',
          role: 'camara',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            Camera.getPicture({
              destinationType:Camera.DestinationType.DATA_URL,
              targetWidth: 1000,
              targetHeight: 1000,
            }).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.dates.photo = this.base64Image;
          this.user.set('photo', this.base64Image);
            this.user.save();
            }, (err) => {
            console.log(err);
            });
  
            console.log('camara clicked');
          }
        },{
          text: 'Galeria',
          icon: !this.platform.is('ios') ? 'albums' : null,
          handler: () => {
            Camera.getPicture({
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
              targetWidth: 1000,
              targetHeight: 1000,
            }).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.dates.photo = this.base64Image;
          this.user.set('photo', this.base64Image);
            this.user.save();
            }, (err) => {
            console.log(err);
            });
            console.log('galeria clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  ionperfil(){
    let loader = this.loadingCtrl.create({
		  content: "Espere"
	  });
    console.log(this.dates);
    this.user.set('direccion', this.dates.direccion);
    this.user.set('instagram', this.dates.instagram);
    this.user.set('telefono', this.dates.telefono);
        // this.user.set('photo',this.dates.photo)
   
		 this.user.save();
    loader.present();
    
    // let details: UserDetails = { 'custom':	{'direccion': this.dates.direccion,'instagram': this.dates.instagram}	};
					//this.auth.signup(details ).then(() => {
		 				// `this.user` is now registered
		 			//	console.log(this.user.details);
		 				
					loader.dismiss();
		 			//	this.navCtrl.push(Login);
				//	 }
         //  );
  }
}
