import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

    private usuarioLogado: any;

    constructor(public http: Http) {

    }

    setUsuario(usuario){
        this.usuarioLogado = usuario;
    }

    getUsuario(){
        return this.usuarioLogado;
    }


}
