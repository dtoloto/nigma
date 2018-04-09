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

  constructor() {}

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
