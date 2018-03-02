import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { VocePage } from '../voce/voce';
import { DoacoesPage } from '../doacoes/doacoes';
import { LoginPage } from '../login/login';
import { MensagemServiceProvider } from '../../providers/mensagem-service/mensagem-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  day: string;
  month: string;
  monthName: string;
  year: string;
  texto: string;
  versiculo: string;
  data: string;

  monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, private mensagemService: MensagemServiceProvider) {
    this.month = this.pad((new Date().getMonth() + 1), 2);
    this.monthName = this.monthNames[new Date().getMonth()];
    this.day = this.pad(new Date().getDate(), 2);
    this.year = '' + new Date().getFullYear();
    this.data = this.year + this.month + this.day;

    this.mensagemService.postData(this.data, "buscarPorData").then(
      (result: any) => {
        let msg = JSON.stringify(result);
        console.log(msg);
        localStorage.setItem('mensagem', msg);
        this.setMensagemDoDia(result);
      },
      (error) => {
        console.log(error);
        let msg = localStorage.getItem('mensagem');
        if (msg) {
          this.setMensagemDoDia(JSON.parse(msg));
        }
      }
    );
  }

  setMensagemDoDia(mensagem) {
    this.texto = mensagem.texto;
    this.versiculo = mensagem.versiculo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {
    localStorage.removeItem("token");
    this.app.getRootNav().setRoot(LoginPage);
  }

  showVoce() {
    this.navCtrl.push(VocePage, {}, {animate: true});
  }

  showDoacoes() {
    this.navCtrl.push(DoacoesPage, {}, {animate: true});
  }

  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

}