import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocePage } from './voce';

@NgModule({
  declarations: [
    VocePage,
  ],
  imports: [
    IonicPageModule.forChild(VocePage),
  ],
})
export class VocePageModule {}
