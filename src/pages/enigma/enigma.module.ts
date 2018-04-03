import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnigmaPage } from './enigma';

@NgModule({
  declarations: [
    EnigmaPage,
  ],
  imports: [
    IonicPageModule.forChild(EnigmaPage),
  ],
})
export class EnigmaPageModule {}
