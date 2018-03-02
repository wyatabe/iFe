import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EnsinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ensino',
  templateUrl: 'ensino.html',
})
export class EnsinoPage {
  videos = [
    {
      url: "./assets/video/video_1.mp4",
      titulo: "Vídeo Número 1",
      descricao: "Introdução do aplicativo iFé.",
    },
    {
      url: "./assets/video/video_2.mp4",
      titulo: "Vídeo Número 2",
      descricao: "Como deve ser realizada a venda de consórcios.",
    },
    {
      url: "./assets/video/video_3.mp4",
      titulo: "Vídeo Número 3",
      descricao: "Como você receberá sua comissão?",
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnsinoPage');
  }

}
