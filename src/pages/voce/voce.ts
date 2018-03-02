import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { VenderPage } from '../vender/vender';
import { ExtratoPage } from '../extrato/extrato';
import { EnsinoPage } from '../ensino/ensino';

/**
 * Generated class for the VocePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voce',
  templateUrl: 'voce.html',
})
export class VocePage {
  styleDisplay:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VocePage');
    this.styleDisplay = localStorage.getItem('cadastro') ? "Block" : "None";
  }

  showCadastro() {
    this.navCtrl.push(CadastroPage, {}, {animate: true})
  }

  showVender() {
    this.navCtrl.push(VenderPage, {}, {animate: true})
  }

  showExtrato() {
    this.navCtrl.push(ExtratoPage, {}, {animate: true})
  }

  showEnsino() {
    this.navCtrl.push(EnsinoPage, {}, {animate: true})
  }
}