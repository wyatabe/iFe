import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the DoacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doacoes',
  templateUrl: 'doacoes.html',
})
export class DoacoesPage {
  requestData: any;
  responseData: any;
  doacaoForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private alertCtrl: AlertController, private paymentService: PaymentServiceProvider, private loadingCtrl: LoadingController) {
    this.doacaoForm = this.formBuilder.group({
      tipoDoacao: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      tipoContribuicao: new FormControl(null, Validators.required),
      formaPagamento: new FormControl(null, Validators.required),
      confirmacao: new FormControl(null, Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoacoesPage');
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  validate(): boolean {
    if (this.doacaoForm.valid) {
      return true;
    }

    let msg = "";

    for (var key in this.doacaoForm.controls) {
      let formControl = this.doacaoForm.controls[key];
      if (!formControl.valid) {
        msg += "<li>";
        if (key == "tipoDoacao") {
          msg += "Informe se é Dízimo ou Oferta.";
        } else if (key == "valor") {
          msg += "Informe o valor.";
        } else if (key == "tipoContribuicao") {
          msg += "Informe se a contribuição é Mensal ou Única.";
        } else if (key == "formaPagamento") {
          msg += "Informe se é pagamento com Cartão de Crédito ou Boleto Bancário.";
        } else if (key == "confirmacao") {
          msg += "Confirme os dados para efetuar a operação.";
        } 
        msg += "</li>";
      }
    }

    this.showAlert("<ol>" + msg + "</ol>")
    return false;
  }

  pagamento() {
    if (this.validate()) {
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      let cadastro = JSON.parse(localStorage.getItem('cadastro'));
      if (cadastro) {
        let faturamento = cadastro.faturamento;
        let doacao = Object.assign({}, this.doacaoForm.value);
        doacao.valor = doacao.valor.replace(/\D+/g, '');

        this.requestData = {
          "bandeiraCartao": faturamento.bandeira,
          "codigoPedido": Date.now(),
          "codigoSegurancaCartao": faturamento.codigoVerso,
          "dataValidadeCartao": faturamento.dataExpiracao,
          "descricao": doacao.tipoDoacao == 1 ? "mensal": "unica",
          "nomeCliente": usuario.nome,
          "nomeImpressoCartao": faturamento.nomeCartao,
          "numeroCartao": faturamento.numero,
          "parcelas": 1,
          "valor": doacao.valor
        }

        let loading = this.loadingCtrl.create({
          content: "Aguarde..."
        });
        loading.present();

        this.paymentService.postData(this.requestData, 'sales').then(
          (result) => {
            this.responseData = JSON.stringify(result);
            loading.dismiss();
            if (this.responseData) {
              console.log(this.responseData);
              this.showAlert("Doação efetuada com sucesso.");
              this.navCtrl.push(HomePage);
            }
          }, 
          (error) => {
            loading.dismiss();
            this.showAlert(error);
          }
        );
      } else {
        this.showAlert("Finalize o seu cadastro para efetuar uma Doação.");
      }
    }
  }
}
