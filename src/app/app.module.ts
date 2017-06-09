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
import { RegistroproPage } from '../pages/registropro/registropro';
import { Bebidas } from '../pages/bebidas/bebidas';
import { Comidas } from '../pages/comidas/comidas';
import { Fotografia } from '../pages/fotografia/fotografia';
import { Musicas } from '../pages/musicas/musicas';
import { Vehiculos } from '../pages/vehiculos/vehiculos';
import { Progreso } from '../pages/progreso/progreso';
import { Citas } from '../pages/citas/citas';
import { Openchat } from '../pages/openchat/openchat';
import { ProveePerfil } from '../pages/provee-perfil/provee-perfil';
import { Proveecitas } from '../pages/proveecitas/proveecitas';
import { Modcitas } from '../pages/modcitas/modcitas';
import { Listaprocesos } from '../pages/listaprocesos/listaprocesos';
import { Auth, User } from '@ionic/cloud-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import * as io from "../../../node_modules/socket.io-client";
import { IonicStorageModule } from '@ionic/storage'
import { BrowserModule } from '@angular/platform-browser';

 /// <reference path="../../typings/globals/socket.io-client/index.d.ts" />  

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'dce3fb91'
  },
    'push': {
    'sender_id': '171363184724',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
@NgModule({
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
    Catering,
    Bebidas,
    Comidas,
    Fotografia,
    Musicas,
    Vehiculos,
    Progreso,
    Citas,
    ProveePerfil,
    Openchat,
    Proveecitas,
    Modcitas,
    Listaprocesos,
    RegistroproPage
  

  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        backButtonText: ' ',

  }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    BrowserModule 
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
    Catering,
    Bebidas,
    Comidas,
    Fotografia,
    Musicas,
    Vehiculos,
    Progreso,
    Citas,
    ProveePerfil,
    Openchat,
    Proveecitas,
    Modcitas,
    Listaprocesos,
    RegistroproPage
  
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
