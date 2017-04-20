import { Component } from '@angular/core';
import { Login } from '../login/login';
import { NavController, MenuController  } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private menu: MenuController ) {
    
  }
 login(){
    this.navCtrl.push(Login);
}
 ionViewDidEnter() {
    
  }

}
