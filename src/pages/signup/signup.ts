import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  photo : any;
  base64Image : string;
  signupForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController, private camera : Camera, private formBuilder: FormBuilder, private loadingCtrl: LoadingController) {
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      idCongregacao: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      confirmaSenha: new FormControl('', Validators.required),
      termos: new FormControl(null, Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.photo = "assets/imgs/user_icon_white.png";
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
    if (this.signupForm.valid) {
      return true;
    }

    let msg = "";

    for (var key in this.signupForm.controls) {
      let formControl = this.signupForm.controls[key];
      if (!formControl.valid) {
        msg += "<li>";
        if (key == "email") {
          msg += "Informe um e-mail válido.";
        } else if (key == "nome") {
          msg += "Informe o Nome.";
        } else if (key == "cpf") {
          msg += "Informe o CPF.";
        } else if (key == "sexo") {
          msg += "Informe o Sexo.";
        } else if (key == "dataNascimento") {
          msg += "Informe a Data de Nascimento.";
        } else if (key == "idCongregacao") {
          msg += "Informe a Congregação.";
        } else if (key == "celular") {
          msg += "Informe o Celular.";
        } else if (key == "senha") {
          msg += "Informe a Senha.";
        } else if (key == "confirmaSenha") {
          msg += "Confirme a Senha.";
        } else if (key == "termos") {
          msg += "Informe a aceitação dos Termos de Privacidade.";
        }
        msg += "</li>";
      }
    }

    this.showAlert("<ol>" + msg + "</ol>")
    return false;
  }

  signup() {
    if (this.validate()) {
      let usuario = Object.assign({}, this.signupForm.value);
      delete usuario.termos;

      usuario.cpf = usuario.cpf.replace(/\D+/g, '');
      usuario.celular = usuario.celular.replace(/\D+/g, '');
      usuario.idTipoUsuario = 1;

      let dateParts = usuario.dataNascimento.split("-");
      usuario.dataNascimento = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

      let loading = this.loadingCtrl.create({
        content: "Aguarde..."
      });
      loading.present();

      this.authService.postData(usuario, 'create').then(
        (result) => {
          this.responseData = JSON.stringify(result);
          loading.dismiss();
          if (this.responseData) {
            console.log(this.responseData);
            localStorage.setItem('usuario', this.responseData);
            this.navCtrl.push(HomePage);
          }
        }, 
        (error) => {
          loading.dismiss();
          this.showAlert(error);
        }
      );
    }
  }

  takePhoto() {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 100,
    }
    this.camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photo = this.base64Image
      }, (err) => {
        console.log(err);
      });
  }

}