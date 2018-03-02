import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtratoPage } from './extrato';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    ExtratoPage,
    ProgressBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(ExtratoPage),
  ],
})
export class ExtratoPageModule {}
