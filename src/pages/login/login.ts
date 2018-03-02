import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  @ViewChild('emailInput') emailInput;
  @ViewChild('senhaInput') senhaInput;
  responseData: any;
  loginForm: FormGroup;
  manterConectado = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController, private formBuilder: FormBuilder, private loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      senha: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    if (this.loginForm.valid) {
      return true;
    }

    let control = this.loginForm.controls['email'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.showAlert('Informe o e-mail.');
      } else if (control.errors['email']) {
        this.showAlert('Informe um e-mail válido.');
      }
      this.emailInput.setFocus();
      return false;
    }

    control = this.loginForm.controls['senha'];
    if (!control.valid) {
      if (control.errors['required']) {
        this.showAlert('Informe a senha.');
      }
      this.senhaInput.setFocus();
      return false;
    }

    return false;
  }

  login() {
    if (this.validate()) {
      let loading = this.createLoading();
      loading.present();

      this.authService.postData(this.loginForm.value, "login").then(
        (result: any) => {
          this.responseData = JSON.stringify(result);
          loading.dismiss();
          if (this.responseData) {
            console.log(this.responseData);
            localStorage.setItem("usuario", this.responseData);
            localStorage.setItem("token", result.token);
            this.navCtrl.push(HomePage, {}, {animate: true});
          }
        }, 
        (error) => {
          loading.dismiss();
          this.showAlert(error);
        }
      );
    }
  }

  signup() {
    this.navCtrl.push(SignupPage, {}, {animate: true})
  }

  createLoading() {
    return this.loadingCtrl.create({
      content: "Aguarde..."
    });
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Recuperação de Senha',
      message: "Informe o e-mail ou o CPF do usuário.",
      inputs: [
        {
          name: 'emailOuCpf',
          placeholder: 'E-mail ou CPF',
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            let emailOuCpf = data.emailOuCpf;
            if (emailOuCpf) {
              let body: any = {}
              if (this.validateEmail(emailOuCpf)) {
                body.email = emailOuCpf;
              } else {
                body.cpf = emailOuCpf;
              }

              let loading = this.createLoading();
              loading.present();

              this.authService.postData(body, 'forgotPassword').then(
                (result) => {
                  this.responseData = JSON.stringify(result);
                  loading.dismiss();
                  if (this.responseData) {
                    console.log(this.responseData);
                    this.showAlert("Foi enviado para o seu e-mail uma mensagem com o procedimento de cadastro da sua nova senha.");
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
      ]
    });
    prompt.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}