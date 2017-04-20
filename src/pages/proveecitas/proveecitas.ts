import { Modcitas } from '../modcitas/modcitas';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

/*
  Generated class for the Proveecitas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-proveecitas',
  templateUrl: 'proveecitas.html'
})
export class Proveecitas {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProveecitasPage');
  }
  citaspendientes(){
    this.menuCtrl.close();
    this.navCtrl.push(Modcitas);
  }

}
