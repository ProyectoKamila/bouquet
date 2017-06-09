import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroproPage } from './registropro';

@NgModule({
  declarations: [
    RegistroproPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroproPage),
  ],
  exports: [
    RegistroproPage
  ]
})
export class RegistroproPageModule {}
