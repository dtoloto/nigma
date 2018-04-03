import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { EnigmasProvider } from '../../providers/enigmas/enigmas';


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

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      public enigmasProvider: EnigmasProvider
  ) {
  }

  ionViewDidEnter() {
    this.enigma = this.enigmasProvider.getEnigmaSelecionado();
    console.log(this.enigma);
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
              this.enigma.status = !this.enigma.status;
           
            } else{
              this.errou();
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

}
