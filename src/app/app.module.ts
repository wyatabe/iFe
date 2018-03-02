import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { VocePage } from '../pages/voce/voce';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { VenderPage } from '../pages/vender/vender';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { VenderPageModule } from '../pages/vender/vender.module';
import { VocePageModule } from '../pages/voce/voce.module';
import { ExtratoPageModule } from '../pages/extrato/extrato.module';
import { ExtratoPage } from '../pages/extrato/extrato';
import { DoacoesPageModule } from '../pages/doacoes/doacoes.module';
import { DoacoesPage } from '../pages/doacoes/doacoes';
import { EnsinoPageModule } from '../pages/ensino/ensino.module';
import { EnsinoPage } from '../pages/ensino/ensino';
import { PaymentServiceProvider } from '../providers/payment-service/payment-service';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { EnderecoServiceProvider } from '../providers/endereco-service/endereco-service';
import { MensagemServiceProvider } from '../providers/mensagem-service/mensagem-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(
      MyApp,
      {
        backButtonText: 'Voltar',
        iconMode: 'ios',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        tabsPlacement: 'bottom',
        pageTransition: 'ios-transition'
      }
    ),
    CadastroPageModule,
    LoginPageModule,
    SignupPageModule,
    VenderPageModule,
    VocePageModule,
    ExtratoPageModule,
    DoacoesPageModule,
    EnsinoPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    VocePage,
    CadastroPage,
    VenderPage,
    ExtratoPage,
    DoacoesPage,
    EnsinoPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    AuthServiceProvider, 
    Camera, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PaymentServiceProvider,
    SQLitePorter,
    SQLite,
    EnderecoServiceProvider,
    MensagemServiceProvider
  ]
})
export class AppModule {}
