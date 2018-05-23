import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RankingPage } from '../ranking/ranking';
import { EnigmasProvider } from '../../providers/enigmas/enigmas';
import { LoginProvider } from '../../providers/login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
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
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
     ) {}

    ionViewDidEnter() {
        this.usuario = this.loginProvider.getUsuario();
        // console.log(this.usuario.login);
        this.niveis = this.usuario.levels;
    }


    verRegras(){
      this.navCtrl.push(AboutPage);
    }

    ranking(){
      this.navCtrl.push(RankingPage);
    }

    private tocando = true;
    musica(){
        let x: any = document.getElementById("myAudio");
        if(this.tocando){
            x.pause();
            this.tocando = false;
        } else{
            x.loop = true;
            x.play();
            this.tocando = true;
        }
    }

    acessarLevel(nivel){
        this.enigmasProvider.setLevelSelecionado(nivel);
        this.navCtrl.push(HomePage);
    }

    verCreditos(){
        let toast = this.toastCtrl.create({
            message: 'Créditos: Trilha Sonora: Mark Petrie - Destiny Falls, Efeitos Sonoros: Daniel Toloto, Imagens: Daniel Toloto, Feito por: Daniel Toloto e Diogo Pinheiro.',
            duration: 5000,
            position: 'bottom'
          });

          toast.onDidDismiss(() => {
          });

          toast.present();
    }

    sair(){

        let alert = this.alertCtrl.create({
            title: 'Deseja sair?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  // console.log('Cancel clicked');
                }
              },
              {
                text: 'Sair',
                handler: () => {
                  // console.log('Buy clicked');
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
