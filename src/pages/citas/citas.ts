import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Calendar} from 'ionic-native';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class Citas {

dates = { fecha:'', hora:'',msg:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,  public loadingCtrl: LoadingController,public auth: Auth, public user: User,public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitasPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Su solicitud Fue Enviada',
      duration: 4000,
      position: position
    });

    toast.present(toast);
  }
  solicitar(){
	  let loader = this.loadingCtrl.create({
		  content: "Espere"
	  });
	  loader.present();
	 console.log(this.dates);
		if(this.dates != null){	
      let start = this.dates.fecha +' , ' + this.dates.hora  ;
      let end = this.dates.fecha +' , ' + this.dates.hora  ;
      console.log(start);
         let startDate = new Date(start);
             let endDate = new Date(end);
          console.log(startDate);
          console.log(endDate);
          Calendar.createEvent('Solicitud de cita ' + this.user.details.name, this.dates.msg, 'notes', startDate, endDate);
          	loader.dismiss();
        };

				
			  
		}

}
