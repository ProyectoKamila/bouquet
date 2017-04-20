import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Contrasena } from '../pages/contrasena/contrasena';
import { Registro } from '../pages/registro/registro';
import { Menu } from '../pages/menu/menu';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Perfil } from '../pages/perfil/perfil';
import { Proveedor } from '../pages/proveedor/proveedor';
import { Chat } from '../pages/chat/chat';
import { Bebidas } from '../pages/bebidas/bebidas';
import { Comidas } from '../pages/comidas/comidas';
import { Fotografia } from '../pages/fotografia/fotografia';
import { Musicas } from '../pages/musicas/musicas';
import { Vehiculos } from '../pages/vehiculos/vehiculos';
import { Progreso } from '../pages/progreso/progreso';
import { Catering } from '../pages/catering/catering';
import { Citas } from '../pages/citas/citas';
import { Openchat } from '../pages/openchat/openchat';
import { ProveePerfil } from '../pages/provee-perfil/provee-perfil';
import { Proveecitas } from '../pages/proveecitas/proveecitas';
import { Modcitas } from '../pages/modcitas/modcitas';
import { Listaprocesos } from '../pages/listaprocesos/listaprocesos';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
/// <reference path="../../typings/globals/socket.io-client/index.d.ts" />
@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage;

  constructor(platform: Platform, public auth: Auth, public user: User) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      if (this.auth.isAuthenticated()) {
        // this.user is authenticated!
        console.log(this.user.id);
        if(this.user.id == '0ad2aff0-e405-49dc-885d-30beab99aa37'){
          this.rootPage = Proveedor;
        }else{
        this.rootPage = Dashboard;
        }
      }else{
        this.rootPage = HomePage;
      }
      
    });
  }
}
