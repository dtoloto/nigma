import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
    public loader;
    public refresher;
    public isRefreshing: boolean = false;
    public ranking;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public http: Http
  ) {}

  ionViewDidEnter() {
    this.carregarRanking();
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Ranking"
    });
    this.loader.present();
  }

  fechaCarregando(){
      this.loader.dismiss();
  }

  doRefresh(refresher) {
      this.refresher = refresher;
      this.isRefreshing = true;
      this.carregarRanking();
    }


    carregarRanking(){
        let url = 'https://hidden-depths-99670.herokuapp.com/usuarios/ranking';
        // let url = 'http://localhost:8000/usuarios/ranking';
          this.abreCarregando();
          this.http.get(url).subscribe(
              data=>{
                  const response = (data as any);
                  const objeto_retorno = JSON.parse(response._body);

                  this.ranking = objeto_retorno;
                  console.log(this.ranking);
                  this.fechaCarregando();

                  if(this.isRefreshing){
                      this.refresher.complete();
                      this.isRefreshing = false;
                  }

              }, error =>{
                  console.log(error);
                  this.fechaCarregando();

                  if(this.isRefreshing){
                      this.refresher.complete();
                      this.isRefreshing = false;
                  }
              }
          );
      }

}
