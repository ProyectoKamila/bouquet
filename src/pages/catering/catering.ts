import { Dashboard } from '../dashboard/dashboard';
import { Component, NgZone, ViewChild } from '@angular/core';
import { Login } from '../login/login';
import { Chat } from '../chat/chat';
import { Perfil } from '../perfil/perfil';
import { Citas } from '../citas/citas';
import { Progreso } from '../progreso/progreso';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { MenuController,ModalController, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import * as io  from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// import { AlertController } from 'ionic-angular';



/*
  Generated class for the Catering page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-catering',
  templateUrl: 'catering.html'
})
export class Catering {
   public tap: number = 0;
   x;
   classone;
   classtwo;
   classthree;
   classfour;
   proveedor;
   nombre;
   correo;
   img;

   @ViewChild(Content) content: Content;
  // messages:any = [];
  socketHost: string = "https://adminbj-proyectokamila.c9users.io:8082";
  socket:any;
  meta = new Array<{any}>();
   public id:any;
   constructor(public modalCtrl: ModalController, public navCtrl: NavController,public user: User, public navParams: NavParams, public auth: Auth,  public loadingCtrl: LoadingController,public menuCtrl: MenuController,public viewCtrl:ViewController) {
    

     if (this.auth.isAuthenticated()) {
          

            // console.log(this.user.details);
            // this.nombre = this.user.get('usuario' , '');
            this.nombre = this.user.details.name;
            this.correo = this.user.details.email;
            this.img = this.user.get('photo' , '');
            if(this.img == null){
              this.img = this.user.details.image
            }
            //this.menuCtrl.enable(false); 
          }
           
     this.id = navParams.get("id");
     console.log("Catering" + this.id);
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
      this.socket.emit('query_post',{'condition': {'post_type':'proveedores','ID':this.id},'key':'index'});
         this.socket.on('query_post', (data, key) => {
          console.log(data);
         
          if(key== 'index'){
            //console.log('lol');
            if(data != null){
            this.proveedor =data[0];
             console.log(this.proveedor);
            this.socket.emit('field_name',{'field_name':'imgdetail','post_id':this.proveedor.ID,'key':'imgdetail'});
            this.socket.emit('field_name',{'field_name':'descripcion','post_id':this.proveedor.ID,'key':'descripcion'});
            this.socket.emit('field_name',{'field_name':'ofrecemos','post_id':this.proveedor.ID,'key':'ofrecemos'});
            this.socket.emit('field_name',{'field_name':'capacidad','post_id':this.proveedor.ID,'key':'capacidad'});
            this.socket.emit('field_name',{'field_name':'telefonos','post_id':this.proveedor.ID,'key':'telefonos'});
            
            }
              
              loader.dismiss();

          }
      });

    this.socket.on("field_name", (data, key) => {
         if(key == 'imgdetail'){
           // console.log(data[0].meta_value);
           console.log('imagedetl');
           console.log(data[0]);
             this.proveedor.imgdetail = data[0].guid;
           // console.log(   this.proveedor.imgdetail);
         }
         if(key == 'descripcion'){
            //console.log(data);
             this.proveedor.descripcion = data[0].meta_value;
             console.log(   this.proveedor.descripcion);
         }

         if(key == 'ofrecemos'){
            //console.log(data);
             this.proveedor.ofrecemos = data[0].meta_value;
             console.log(   this.proveedor.ofrecemos);
         }

         if(key == 'capacidad'){
           // console.log(data);
             this.proveedor.capacidad = data[0].meta_value;
             console.log(   this.proveedor.capacidad);
         }
         if(key == 'telefonos'){
            //console.log(data);
            // this.proveedor.telefonos = data[0].meta_value;
             //console.log(   this.proveedor.telefonos);
         }
       });
 
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CateringPage');
  }
  salir(){
    console.log('salir');
    this.auth.logout();
    this.navCtrl.push(Login);
    
  }
  chat(){
    this.menuCtrl.close();
    this.navCtrl.push(Chat);
    
}
perfil(){
    this.menuCtrl.close();
    this.navCtrl.push(Perfil);
    
}
inicio(){
    this.menuCtrl.close();
    this.navCtrl.push(Dashboard);
    
}
progreso(){
    this.menuCtrl.close();
    this.navCtrl.push(Progreso);
}

   tapEvent(x) {
     console.log(x);
    if(x == 'event0'){
        this.tap++;
          this.classone ='active';
             this.classtwo ='';
                this.classthree ='';
                  this.classfour ='';
        }
    if(x == 'event1'){
        this.tap++;
          this.classone ='';
             this.classtwo ='active';
                this.classthree ='';
                  this.classfour ='';
        }if(x == 'event2'){
        this.tap++;
          this.classone ='';
             this.classtwo ='';
                this.classthree ='active';
                  this.classfour ='';
        }if(x == 'event3'){
        this.tap++;
          this.classone ='';
             this.classtwo ='';
                this.classthree ='';
                  this.classfour ='active';
        }
  }
  presentModal() {
    let modal = this.modalCtrl.create(Citas);
    modal.present();
  }

//   presentPrompt() {
//   let alert = this.alertCtrl.create({
//     title: 'Calendario',
//     message:'Selecciona la fecha',
//     inputs: [
//       {
//         type:'datetime-local',
//         name: 'date'
//       }
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Solicitar',
//         role: '',
//         handler: data => {
//           console.log('Solicitar clicked');
//           console.log(data.date);
//           let startDate = new Date(data.date);
//              let endDate = new Date(data.date);
//           console.log(startDate);
//           Calendar.createEvent('Solicitud de cita ', 'location', 'notes', startDate, endDate);
//         }
//       }
//     ]
//   });
//   alert.present();
// }


}
