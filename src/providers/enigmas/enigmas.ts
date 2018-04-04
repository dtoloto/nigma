import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the EnigmasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnigmasProvider {

private levelSelecionado: any;
private EnigmaSelecionado: any;

private urlApi = "https://hidden-depths-99670.herokuapp.com/enigmas";

  constructor(public http: Http) {

  }

  private listaLevels: any;

  getListaEnigmas(){

    //   this.http.get(this.urlApi)
    //   .map(res => res)
    //   .subscribe(dados => {
    //
    //
    //       const response = (dados as any);
    //       const objeto_retorno = JSON.parse(response._body);
    //       console.log(objeto_retorno);
    //
    //      this.listaLevels = objeto_retorno;
    //
    //       console.log(this.listaLevels);
    //   }
    // );

    return this.listaLevels;
  }

  setLevelSelecionado(level){
      this.levelSelecionado = level;
  }

  getLevelSelecionado(){
      return this.levelSelecionado.enigmas;
  }

  setEnigmaSelecionado(enigma){
      this.EnigmaSelecionado = enigma;
  }

  getEnigmaSelecionado(){
      return this.EnigmaSelecionado;
  }



}
