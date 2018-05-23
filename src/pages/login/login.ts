import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
// import { NativeAudio } from '@ionic-native/native-audio';
import 'rxjs/Rx';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    public formEntrar: boolean = true;
    public loader;
    public userLogin: string;
    public senhaLogin: string;
    public userCadastro: string;
    public emailCadastro: string;
    public senhaCadastro: string;
    public confirmarSenhaCadastro: string;
    private urlApi = "https://hidden-depths-99670.herokuapp.com/enigmas";
    public levels: any;

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public loginProvider: LoginProvider,
    // private nativeAudio: NativeAudio
  ) {}

  ionViewDidLoad(){
      // this.nativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(onSuccess, onError);
  }

  entrar(){

      if(this.userLogin == null || this.senhaLogin == null){
          this.alerta("Por favor, preencha todos os campos!");

      } else{

          let body = {
               login: this.userLogin,
               senha: this.senhaLogin
           };

           this.postRequest("usuarios/login", body, "login");
      }

  }

  criarConta(){
      this.formEntrar = false;
  }

  voltar(){
      this.formEntrar = true;
  }

  cadastrar(){

      if(this.userCadastro == null || this.senhaCadastro == null || this.confirmarSenhaCadastro == null || this.emailCadastro == null){
          this.alerta('Por favor, preencha todos os campos!');
      } else{

          if(this.senhaCadastro != this.confirmarSenhaCadastro){
              this.alerta('As senhas não conferem!');
          } else{

              this.getRequest();

          }

      }


  }


  getRequest(){

      this.abreCarregando();

      this.http.get(this.urlApi)
      .map(res => res)
      .subscribe(dados => {

          const response = (dados as any);
          const objeto_retorno = JSON.parse(response._body);

          this.levels = objeto_retorno;

          let body = {
               login: this.userCadastro,
               senha: this.senhaCadastro,
               email: this.emailCadastro,
               levels: this.levels,
               pontuacao: 100
           };

           this.postRequest("usuarios", body, "cadastro");


      },
      err => {
                this.fechaCarregando();

                console.log(err);

                this.alerta("Houve algum erro, tente novamente.");
        }
    );
  }


  postRequest(rota, body, form){

      let url = 'https://hidden-depths-99670.herokuapp.com/';
      // let url = 'http://localhost:8000/';

      if(form == 'login'){
          this.abreCarregando();
      }

      let erro;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(url + rota, JSON.stringify(body), {headers: headers})
      .map(res => res)
      .subscribe(

        dados => {


          const response = (dados as any);
          const objeto_retorno = JSON.parse(response._body);
          // console.log(objeto_retorno);

          this.fechaCarregando();

          if(objeto_retorno){
                this.userLogin = '';
                this.senhaLogin = '';
                this.userCadastro = '';
                this.senhaCadastro = '';
                this.confirmarSenhaCadastro = '';
                this.emailCadastro = '';
                erro = false;
                this.loginProvider.setUsuario(objeto_retorno);
                this.formEntrar = true;
                this.navCtrl.push(MenuPage);
          } else{

                if(form == "login"){
                    this.alerta("Usuário e/ou Senha inválidos");
                } else{
                    this.alerta("Nome de usuário indisponível");
                }

          }
      },
      err => {
                this.fechaCarregando();
                this.alerta("Houve algum erro, tente novamente.");
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

  alerta(mensagem) {
      let alert = this.alertCtrl.create({
        title: 'Ups!',
        subTitle: mensagem,
        buttons: ['Entendi']
      });
      alert.present();
    }

}
