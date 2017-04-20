var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Login } from '../login/login';
import { Perfil } from '../perfil/perfil';
import { Catering } from '../catering/catering';
import { Auth, User } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';
/// <reference path="../../typings/globals/socket.io-client/index.d.ts" />
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var Dashboard = (function () {
    function Dashboard(navCtrl, navParams, viewCtrl, auth, user, loadingCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.auth = auth;
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        // messages:any = [];
        this.socketHost = "https://adminbj-proyectokamila.c9users.io:8082";
        var loader = this.loadingCtrl.create({
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
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.socket.emit('conf', { 'project': 'proyectokamila.com' });
        this.socket.emit('query_post', { 'condition': { 'post_type': 'proveedores' }, 'key': 'index' });
        this.socket.on('query_post', function (data, key) {
            console.log(data);
            if (key == 'index') {
                _this.proveedores = data;
                socket.emit('field_name', { 'field_name': 'direccion', 'post_id': data[0].post_id, 'key': 'direccion' });
                loader.dismiss();
            }
        });
        this.socket.on("field_name", function (data, key) {
            if (key == 'direccion') {
                _this.direccion = data;
            }
        });
    }
    Dashboard.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    Dashboard.prototype.ionViewWillEnter = function () {
        console.log('oculta boton');
        this.viewCtrl.showBackButton(false);
    };
    Dashboard.prototype.perfil = function () {
        this.navCtrl.push(Perfil);
    };
    Dashboard.prototype.catering = function () {
        this.navCtrl.push(Catering);
    };
    Dashboard.prototype.salir = function () {
        console.log('salir');
        this.auth.logout();
        this.navCtrl.push(Login);
    };
    return Dashboard;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], Dashboard.prototype, "content", void 0);
Dashboard = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController, Auth, User, LoadingController, Storage])
], Dashboard);
export { Dashboard };
//# sourceMappingURL=dashboard.js.map