import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the ExtratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-extrato',
  templateUrl: 'extrato.html',
})
export class ExtratoPage {
  @ViewChild(Slides) slides: Slides;

  cartoes = [
    {
      id: 1,
      bandeira: "Alelo",
      numero: "9846",
      situacao: "ATIVO",
    },
    {
      id: 2,
      bandeira: "Alelo",
      numero: "3841",
      situacao: "ATIVO",
    },
    {
      id: 3,
      bandeira: "Alelo",
      numero: "5865",
      situacao: "ATIVO",
    }
  ];

  textoCartao : any;

  progress = 50;

  lancamentos = [
    {
      data: "19/01/2018",
      descricao: "Venda Com. Consórcio",
      valor: "R$ 100,00"
    },
    {
      data: "19/02/2018",
      descricao: "Venda Com. Consórcio",
      valor: "R$ 100,00"
    },
    {
      data: "19/02/2018",
      descricao: "Venda Com. Seguro",
      valor: "R$ 100,00"
    },
    {
      data: "19/02/2018",
      descricao: "Venda Com. Seguro",
      valor: "R$ 100,00"
    },
    {
      data: "19/02/2018",
      descricao: "Venda Com. Seguro",
      valor: "R$ 100,00"
    },
    {
      data: "19/02/2018",
      descricao: "Saque",
      valor: "- R$ 100,00"
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtratoPage');
    this.slideChanged();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (currentIndex == undefined) {
      currentIndex = 0;
    }
    if (currentIndex < this.cartoes.length) {
      let cartao = this.cartoes[currentIndex];
      this.textoCartao = cartao.bandeira + " Final " + cartao.numero +  " | <b>" + cartao.situacao + "</b>";    
    }
  }

}
