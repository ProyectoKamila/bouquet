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
import { Contrasena } from '../contrasena/contrasena';
import { Registro } from '../registro/registro';
import { Dashboard } from '../dashboard/dashboard';
import { Auth, User } from '@ionic/cloud-angular';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var Login = (function () {
    function Login(navCtrl, navParams, auth, user, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.user = user;
        this.toastCtrl = toastCtrl;
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    Login.prototype.contrasena = function () {
        this.navCtrl.push(Contrasena);
    };
    Login.prototype.registro = function () {
        this.navCtrl.push(Registro);
    };
    Login.prototype.dashboard = function () {
        var _this = this;
        console.log('login');
        console.log(this.email);
        console.log(this.password);
        if (this.email != undefined || this.password != undefined) {
            var details = { 'email': this.email, 'password': this.password };
            this.auth.login('basic', details).then(function () {
                // `this.user` is now registered
                console.log(_this.user);
                // loader.dismiss();
                _this.navCtrl.push(Dashboard);
            }, function (err) {
                console.log('error  ');
                console.log(err);
                var toast = _this.toastCtrl.create({
                    message: 'Su email o Password son incorrectos',
                    duration: 3000
                });
                toast.present();
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Verifique sus datos',
                duration: 3000
            });
            toast.present();
        }
        // this.navCtrl.push(Dashboard);
    };
    return Login;
}());
Login = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Auth, User, ToastController])
], Login);
export { Login };
//# sourceMappingURL=login.js.map