import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { EnigmasProvider } from '../../providers/enigmas/enigmas';
import { LoginProvider } from '../../providers/login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
    private usuario: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public enigmasProvider: EnigmasProvider,
        public loginProvider: LoginProvider,
        private alertCtrl: AlertController
     ) {}

    ionViewDidEnter() {
        this.usuario = this.loginProvider.getUsuario();
        console.log(this.usuario.levels);
        this.niveis = this.usuario.levels;
    }


    verRegras(){
      this.navCtrl.push(AboutPage);
    }

    acessarLevel(nivel){
        this.enigmasProvider.setLevelSelecionado(nivel);
        this.navCtrl.push(HomePage);
    }

    sair(){

        let alert = this.alertCtrl.create({
            title: 'Deseja sair?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Sair',
                handler: () => {
                  console.log('Buy clicked');
                  this.loginProvider.setUsuario({});
                  this.enigmasProvider.setLevelSelecionado({});
                  this.enigmasProvider.setEnigmaSelecionado({});
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();



    }

}
