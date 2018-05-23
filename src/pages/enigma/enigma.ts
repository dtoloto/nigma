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
    private usuario: any;

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
    this.usuario = this.loginProvider.getUsuario();
    // console.log(this.enigma.status);
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
                this.usuario.pontuacao += 70;
                this.enigma.status = true;
                this.enigma.dica.status = true;
                this.atualizarEnigma(false);

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
      let x:any = document.getElementById("errou");
      x.play();
    let alert = this.alertCtrl.create({
      title: 'Resposta Errada',
      subTitle: 'Eu esperava mais de você...',
      buttons: ['Entendi']
    });
    alert.present();
  }

  atualizarEnigma(dica){

      let url = 'https://hidden-depths-99670.herokuapp.com/';
      // let url = 'http://localhost:8000/';
      let body = this.loginProvider.getUsuario();
      console.log(body.pontuacao);
      this.abreCarregando();

      let erro;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put(url + 'usuarios/update', JSON.stringify(body), {headers: headers})
      .map(res => res)
      .subscribe(

        dados => {

            this.fechaCarregando();

            if(!dica){
                let x:any = document.getElementById("acertou");
                x.play();
                this.alerta('Parabéns','Você acertou!');
            }


      },
      err => {
                this.fechaCarregando();
                this.alerta('Ups!','Houve algum erro, tente novamente.');
                this.usuario.pontuacao -= 70;
                this.enigma.status = false;
        }

    );

  }

  obterDica(){
      if(this.usuario.pontuacao >= 50){
          this.enigma.dica.status = true;
          this.usuario.pontuacao -= 50;
          this.atualizarEnigma(true);
      } else{
          this.alerta('Ups!', 'Você não possui pontos suficientes para obter a dica');
      }
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
