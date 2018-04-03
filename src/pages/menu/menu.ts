import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { EnigmasProvider } from '../../providers/enigmas/enigmas';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

    public niveis: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public enigmasProvider: EnigmasProvider
     ) {}

    ionViewDidLoad() {
        this.niveis = this.enigmasProvider.getListaEnigmas();
    }


    verRegras(){
      this.navCtrl.push(AboutPage);
    }

    acessarLevel(nivel){
        this.enigmasProvider.setLevelSelecionado(nivel);
        this.navCtrl.push(HomePage);
    }

}
