var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Contrasena } from '../pages/contrasena/contrasena';
import { Registro } from '../pages/registro/registro';
import { Menu } from '../pages/menu/menu';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Perfil } from '../pages/perfil/perfil';
import { Proveedor } from '../pages/proveedor/proveedor';
import { Catering } from '../pages/catering/catering';
import { Chat } from '../pages/chat/chat';
import { CloudModule } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
/// <reference path="../../typings/globals/socket.io-client/index.d.ts" />  
import {enableProdMode} from '@angular/core';
enableProdMode();
var cloudSettings = {
    'core': {
        'app_id': 'dce3fb91'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            Login,
            Contrasena,
            Registro,
            Menu,
            Dashboard,
            Perfil,
            Proveedor,
            Chat,
            Catering
        ],
        imports: [
            IonicModule.forRoot(MyApp, {
                backButtonText: ' ',
            }),
            CloudModule.forRoot(cloudSettings)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            Login,
            Contrasena,
            Registro,
            Menu,
            Dashboard,
            Perfil,
            Proveedor,
            Chat,
            Catering
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map