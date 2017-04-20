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
import { Login } from '../login/login';
import { Chat } from '../chat/chat';
import { Perfil } from '../perfil/perfil';
import { Auth } from '@ionic/cloud-angular';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the Catering page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var Catering = (function () {
    function Catering(navCtrl, navParams, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.tap = 0;
    }
    Catering.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CateringPage');
    };
    Catering.prototype.salir = function () {
        console.log('salir');
        this.auth.logout();
        this.navCtrl.push(Login);
    };
    Catering.prototype.chat = function () {
        this.navCtrl.push(Chat);
    };
    Catering.prototype.perfil = function () {
        this.navCtrl.push(Perfil);
    };
    Catering.prototype.tapEvent = function (x) {
        console.log(x);
        if (x == 'event0') {
            this.tap++;
            this.classone = 'active';
            this.classtwo = '';
            this.classthree = '';
            this.classfour = '';
        }
        if (x == 'event1') {
            this.tap++;
            this.classone = '';
            this.classtwo = 'active';
            this.classthree = '';
            this.classfour = '';
        }
        if (x == 'event2') {
            this.tap++;
            this.classone = '';
            this.classtwo = '';
            this.classthree = 'active';
            this.classfour = '';
        }
        if (x == 'event3') {
            this.tap++;
            this.classone = '';
            this.classtwo = '';
            this.classthree = '';
            this.classfour = 'active';
        }
    };
    return Catering;
}());
Catering = __decorate([
    Component({
        selector: 'page-catering',
        templateUrl: 'catering.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Auth])
], Catering);
export { Catering };
//# sourceMappingURL=catering.js.map