import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

import { EnigmasProvider } from '../../providers/enigmas/enigmas';
import { LoginProvider } from '../../providers/login/login';


/**
 * Generated class for the EnigmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enigma',
  templateUrl: 'enigma.html',
})
export class EnigmaPage {

    public enigma: any;
    public lat: any;
    public lng: any;
    public loader;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      public enigmasProvider: EnigmasProvider,
      private http: Http,
      public loadingCtrl: LoadingController,
      public loginProvider: LoginProvider
  ) {
  }

  ionViewDidEnter() {
    this.enigma = this.enigmasProvider.getEnigmaSelecionado();
    console.log(this.enigma.status);
  }

  resolverEnigma() {
    let alert = this.alertCtrl.create({
      title: 'Resposta',
      inputs: [
        {
          name: 'resposta',
          placeholder: 'Tente a sorte...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            if(data.resposta == this.enigma.resposta){
                this.enigma.status = true;
                this.atualizarEnigma();

            } else{
              this.errou();
              // this.enigma.status = false;
            }

          }
        }
      ]
    });
    alert.present();
  }

  errou() {
    let alert = this.alertCtrl.create({
      title: 'Resposta Errada',
      subTitle: 'Não foi dessa vez...',
      buttons: ['Entendi']
    });
    alert.present();
  }

  atualizarEnigma(){

      // let url = 'https://hidden-depths-99670.herokuapp.com/';
      let url = 'http://localhost:8000/';
      let body = this.loginProvider.getUsuario();
      this.abreCarregando();

      let erro;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put(url + 'usuarios/update', JSON.stringify(body), {headers: headers})
      .map(res => res)
      .subscribe(

        dados => {

            this.fechaCarregando();
            this.alerta('Parabéns','Você acertou!');

      },
      err => {
                this.fechaCarregando();
                this.alerta('Ups!','Houve algum erro, tente novamente.');
                this.enigma.status = false;
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

  alerta(titulo, mensagem) {
      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: mensagem,
        buttons: ['Entendi']
      });
      alert.present();
    }

}
