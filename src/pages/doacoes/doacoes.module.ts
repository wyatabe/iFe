import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoacoesPage } from './doacoes';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    DoacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(DoacoesPage),
    BrMaskerModule,
  ],
})
export class DoacoesPageModule {}
