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
import { Auth, User } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import { Login } from '../login/login';
/*
  Generated class for the Registro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var Registro = (function () {
    function Registro(navCtrl, navParams, auth, user, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.dates = { email: '', password: '' };
    }
    Registro.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroPage');
    };
    Registro.prototype.salir = function () {
        console.log('salir');
        this.navCtrl.push(Login);
    };
    Registro.prototype.registrar = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Espere"
        });
        loader.present();
        console.log(this.dates);
        if (this.dates != null) {
            if (this.dates.email != undefined) {
                var details = { 'email': this.dates.email, 'password': this.dates.password };
                this.auth.signup(details).then(function () {
                    // `this.user` is now registered
                    console.log(_this.user);
                    loader.dismiss();
                    _this.navCtrl.push(Login);
                }, function (err) {
                    for (var _i = 0, _a = err.details; _i < _a.length; _i++) {
                        var e = _a[_i];
                        if (e === 'conflict_email') {
                            alert('Email already exists.');
                        }
                        else {
                        }
                    }
                });
            }
        }
    };
    return Registro;
}());
Registro = __decorate([
    Component({
        selector: 'page-registro',
        templateUrl: 'registro.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Auth, User, LoadingController])
], Registro);
export { Registro };
//# sourceMappingURL=registro.js.map