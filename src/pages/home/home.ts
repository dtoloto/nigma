import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnigmasProvider } from '../../providers/enigmas/enigmas';
import { EnigmaPage } from '../enigma/enigma';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public cards: any;
  public usuario: any;
  public teste = true;
    constructor(
        public navCtrl: NavController,
        private enigmasProvider: EnigmasProvider
    ) {}

    ionViewDidEnter(){
        this.cards = this.enigmasProvider.getLevelSelecionado();
    }

    verEnigma(enigma){
        this.enigmasProvider.setEnigmaSelecionado(enigma);
        this.navCtrl.push(EnigmaPage);
    }

}
