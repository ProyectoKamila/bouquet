import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Calendar} from 'ionic-native';
import { ToastController } from 'ionic-angular';
import * as io  from 'socket.io-client';
@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class Citas {
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
    socket:any;
dates = { fecha:'', hora:'',msg:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,  public loadingCtrl: LoadingController,public auth: Auth, public user: User,public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitasPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  showToast(position: string) {
      this.socket = io.connect(this.socketHost);
console.log(this.dates);
let datefinisk=this.dates.fecha+" "+this.dates.hora;
     //this.zone = new NgZone({enableLongStackTrace:false});
      this.socket.emit('conf',{'project': 'bouquet.com'});
      //this.socket.emit('query_post',{'condition': {'post_type':'proveedores','posts_per_page':10, 'categoria':'fotografia'},'key':'index'});
       this.socket.on('conf', (data) => {
      this.socket.emit('insert_post',{'condition': {'post_type':'cita','post_date':datefinisk,'post_content':this.dates.msg},'key':'index'});
        //  console.log('aquii');
      //this.socket.emit('query_post',{'condition': {'post_type':'page','ID':414},'key':'home'});
 
    });
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
