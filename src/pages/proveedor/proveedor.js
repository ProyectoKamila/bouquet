var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Login } from '../login/login';
import { Auth } from '@ionic/cloud-angular';
/*
  Generated class for the Proveedor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var Proveedor = (function () {
    function Proveedor(navCtrl, navParams, menuCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.auth = auth;
    }
    Proveedor.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Proveedor');
    };
    Proveedor.prototype.toggleRightMenu = function () {
        this.menuCtrl.toggle('right');
    };
    Proveedor.prototype.salir = function () {
        console.log('salir');
        this.auth.logout();
        this.navCtrl.push(Login);
    };
    return Proveedor;
}());
Proveedor = __decorate([
    Component({
        selector: 'page-proveedor',
        templateUrl: 'proveedor.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MenuController, Auth])
], Proveedor);
export { Proveedor };
//# sourceMappingURL=proveedor.js.map