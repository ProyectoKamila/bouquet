import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import {Push,PushToken } from '@ionic/cloud-angular';
@Component({
  selector: 'page-listaprocesos',
  templateUrl: 'listaprocesos.html'
})
export class Listaprocesos{
    items = [
          // {title: 'item1',id:0,listo:false,edito:true},
          // {title: 'item2',id:1,listo:false,edito:true},
          // {title: 'item3',id:2,listo:false,edito:true},
          // {title: 'item4',id:3,listo:false,edito:true},
          // {title: 'item5',id:4,listo:false,edito:true},
          // {title: 'item6',id:5,listo:false,edito:true}
             ];
    text;
    classone;
    x;
    ni;
    slug;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public auth: Auth,public user: User, public loadingCtrl: LoadingController) {
  this.slug = navParams.get("slug");
  let x =  this.user.get('lista'+this.slug, null);
  console.log(x);
  this.items = x;
  console.log(this.slug);
    if (this.auth.isAuthenticated()) {
            console.log(this.user);
            // this.lista = this.user.get('listafoto' , '');
          }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaprocesosPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  listprocess(){
    let loader = this.loadingCtrl.create({
		  content: "Espere"
	  });
    loader.present();
    if(this.text != ''){
      console.log(this.text);
      console.log(this.items.length +1);
      this.ni = { title: this.text, id:this.items.length +1, listo:false, edito:true}; 
      this.items.push(this.ni);
      console.log(this.items);
      this.user.set('lista'+this.slug, this.items);
      this.user.save();
      loader.dismiss();
    }else{
      this.user.set('lista'+this.slug, this.items);
      this.user.save();
      loader.dismiss();
    }
 
  }

  removeItem(item){
  console.log(item);
      for(let i = 0; i < this.items.length; i++) {
        console.log(i);
        if(this.items[i].id == item){
          console.log('encontre');
          this.items.splice(this.items[i], 1);
          console.log(this.items.splice(i, 1));
          this.user.set('lista'+this.slug, this.items);
          this.user.save();
        } 
      } 
    }

    edit(item,slidingItem: ItemSliding){
      slidingItem.close(); 
      
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].id == item){
          console.log(i);
          this.items[i].edito = false;
          
        }
      }
    }

    check(item,slidingItem: ItemSliding){
    slidingItem.close();      
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].id == item){
          console.log(i);
          this.items[i].listo = true;
        }
      }

    }


}
