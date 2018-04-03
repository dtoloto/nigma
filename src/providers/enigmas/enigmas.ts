// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EnigmasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnigmasProvider {

private listaEnigmas = [
    {
        level: 'Level 01',
        status: false,
        enigmas: [
          {
            numero: 'N01',
            
            descricao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Leite de capivaris, leite de mula manquis sem cabeça.',
            icon: 'book',
            status: 'false',
            resposta: '123'
          },
          {
            numero: 'N02',
            
            descricao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Leite de capivaris, leite de mula manquis sem cabeça.',
            icon: 'cafe',
            status: 'false',
            resposta: '123'
          },
          {
            numero: 'N03',
            
            descricao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Leite de capivaris, leite de mula manquis sem cabeça.',
            icon: 'sunny',
            status: 'false',
            resposta: '123'
          },
          {
            numero: 'N04',
            
            descricao: 'Enigma 4',
            icon: 'flask',
            status: 'false',
            resposta: ''
          },
          {
            numero: 'N05',
            // descricao: 'Enigma 5',
            img: 'https://i.pinimg.com/originals/47/14/81/471481ba85ef5261229c66fb43fe1298.jpg',
            icon: 'musical-notes',
            status: 'false',
            resposta: ''
          },
          {
            numero: 'N06',
            
            descricao: 'Enigma 6',
            icon: 'md-restaurant',
            status: 'false',
            resposta: ''
          }

        ]
    },
    {
        level: 'Level 02',
        status: false,
        enigmas:[]
    }
]

private levelSelecionado: any;
private EnigmaSelecionado: any;

  constructor() {

  }

  getListaEnigmas(){
      return this.listaEnigmas;
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
