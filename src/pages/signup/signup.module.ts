import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    BrMaskerModule,
  ],
})
export class SignupPageModule {}
