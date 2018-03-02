import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides, LoadingController } from 'ionic-angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { EnderecoServiceProvider } from '../../providers/endereco-service/endereco-service';
import { VocePage } from '../voce/voce';


/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  ufList: any;
  responseData: any;
  cadastroForm: any;
  bandeiraList: any;
  bandeira: string = "default";
  codigoMunicipio: string;
  requestData: any;
  
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController, private formBuilder: FormBuilder, private http: HttpClient, private enderecoService: EnderecoServiceProvider, private loadingCtrl: LoadingController) {
    this.http.get('assets/json/uf.json').subscribe((data) => {
      this.ufList = data;
    });

    this.cadastroForm = this.formBuilder.group({
      cep: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(9)
      ])),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(),
      localidade: new FormControl('', Validators.required),
      municipioCodigo: new FormControl(),
      uf: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cartaoNumero: new FormControl('', Validators.required),
      cartaoCodigo: new FormControl('', Validators.required),
      cartaoNome: new FormControl('', Validators.required),
      cartaoDataExpiracao: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
    let cadastro = JSON.parse(localStorage.getItem('cadastro'));
    if (cadastro) {
      console.log(cadastro);
      let endereco = cadastro.endereco;
      let faturamento = cadastro.faturamento;
      this.cadastroForm.patchValue({
        cep: endereco.cep.slice(0, 5) + "-" + endereco.cep.slice(5),
        logradouro: endereco.logradouro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        bairro: endereco.bairro,
        municipioCodigo: endereco.municipioCodigo,
        complemento:endereco.complemento,
        numero: endereco.numero,
        cartaoNumero: faturamento.numero.slice(0, 4) + " " + faturamento.numero.slice(4, 8) + " " + faturamento.numero.slice(8, 12) + " " + faturamento.numero.slice(12, 16),
        cartaoCodigo: faturamento.codigoVerso,
        cartaoNome: faturamento.nomeCartao,
        cartaoDataExpiracao: faturamento.dataExpiracao
      });
      this.bandeira = faturamento.bandeira;
    }
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  getCardType(number) {
    // visa
    var re = new RegExp("^4\\d{12}(\\d{3})?$");
    if (number.match(re) != null)
        return "visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (new RegExp("^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$").test(number)) 
        return "mastercard";
    
    // American Express
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "americanexpress";

    // Elo
    re = new RegExp("^((((636368)|(438935)|(504175)|(451416)|(636297))\\d{0,10})|((5067)|(4576)|(4011))\\d{0,12})$");
    if (number.match(re) != null)
        return "elo";

    // Diners Club
    re = new RegExp("^3(0[0-5]|[68]\\d)\\d{11}$");
    if (number.match(re) != null)
      return "dinersclub";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return "discover";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "jcb";

    // Aura
    re = new RegExp("^(5078\\d{2})(\\d{2})(\\d{11})$");
    if (number.match(re) != null)
      return "aura";

    // Hipercard
    re = new RegExp("^(606282\\d{10}(\\d{3})?)|(3841\\d{15})$");
    if (number.match(re) != null)
      return "hipercard";

    return "default";
  }

  onInputCartaoNumero() {
    let numero = this.cadastroForm.get('cartaoNumero').value.replace(/\D+/g, '');;
    this.bandeira = this.getCardType(numero);
  }

  onInputCep() {
    let cep = this.cadastroForm.get('cep').value.replace(/\D+/g, '');
    if (cep.length > 7) {
      this.enderecoService.postData(cep, "buscarCEP").then(
        (result) => {
          this.responseData = result;
          if (this.responseData) {
            console.log(this.responseData);
            this.cadastroForm.patchValue({
              cep: this.responseData.cep,
              logradouro: this.responseData.logradouro,
              localidade: this.responseData.localidade,
              uf: this.responseData.uf,
              bairro: this.responseData.bairro,
              municipioCodigo: this.responseData.ibge
            });
          }
        }, 
        (error) => {
          this.showAlert(error);
        }
      );
    }
  }

  validate(): boolean {
    if (this.cadastroForm.valid) {
      return true;
    }

    let msg = "";

    for (var key in this.cadastroForm.controls) {
      let formControl = this.cadastroForm.controls[key];
      if (!formControl.valid) {
        msg += "<li>";
        if (key == "cep") {
          msg += "Informe um CEP válido.";
        } else if (key == "logradouro") {
          msg += "Informe o Logradouro.";
        } else if (key == "numero") {
          msg += "Informe o Número.";
        } else if (key == "localidade") {
          msg += "Informe o Município.";
        } else if (key == "uf") {
          msg += "Informe a UF.";
        } else if (key == "bairro") {
          msg += "Informe o Bairro.";
        } else if (key == "cartaoNumero") {
          msg += "Informe o Número do Cartão.";
        } else if (key == "cartaoCodigo") {
          msg += "Informe o código CVV.";
        } else if (key == "cartaoNome") {
          msg += "Informe o Nome Impresso no Cartão.";
        } else if (key == "cartaoDataExpiracao") {
          msg += "Informe a Data de Validade.";
        }
        msg += "</li>";
      }
    }

    this.showAlert("<ol>" + msg + "</ol>")
    return false;
  }

  cadastrar() {
    if (this.validate()) {
      let cadastro = Object.assign({}, this.cadastroForm.value);
      cadastro.cartaoNumero = cadastro.cartaoNumero.replace(/\D+/g, '');
      cadastro.cep = cadastro.cep.replace(/\D+/g, '');

      this.requestData = {
        "endereco": {
          "bairro": cadastro.bairro,
          "cep":  cadastro.cep,
          "complemento":  cadastro.complemento,
          "flPadrao": true,
          "municipioCodigo": cadastro.municipioCodigo,
          "localidade": cadastro.localidade,
          "logradouro": cadastro.logradouro,
          "numero": cadastro.numero,
          "uf": cadastro.uf,
        },
        "faturamento": {
          "codigoVerso": cadastro.cartaoCodigo,
          "dataExpiracao": cadastro.cartaoDataExpiracao,
          "nomeCartao": cadastro.cartaoNome,
          "numero": cadastro.cartaoNumero,
          "tipoFaturamentoId": 1,
          "bandeira": this.bandeira
        }
      }

      let usuario = JSON.parse(localStorage.getItem('usuario'));

      let loading = this.loadingCtrl.create({
        content: "Aguarde..."
      });
      loading.present();
  
      this.authService.postData(this.requestData, 'billingAddress', usuario.token).then(
        (result) => {
          this.responseData = JSON.stringify(result);
          loading.dismiss();
          if (this.responseData) {
            console.log(this.responseData);
            localStorage.setItem('cadastro', this.responseData);
            this.navCtrl.push(VocePage);
          }
        }, 
        (error) => {
          loading.dismiss();
          this.showAlert(error);
        }
      );
    }
  }

}