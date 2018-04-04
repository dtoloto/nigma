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
    private urlApi = "https://hidden-depths-99670.herokuapp.com/enigmas";
    public loader;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public enigmasProvider: EnigmasProvider,
        public loginProvider: LoginProvider,
        public http: Http,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController
     ) {}

    ionViewDidLoad() {
        this.abreCarregando();

        this.http.get(this.urlApi)
        .map(res => res)
        .subscribe(dados => {

            const response = (dados as any);
            const objeto_retorno = JSON.parse(response._body);

            this.fechaCarregando();
            this.niveis = objeto_retorno;


        }
      );

    }

    abreCarregando() {
      this.loader = this.loadingCtrl.create({
        content: "Aguarde"
      });
      this.loader.present();
    }

    fechaCarregando(){
        this.loader.dismiss();
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
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();



    }

}
