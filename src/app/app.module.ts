import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AbmPage } from '../pages/abm/abm';
import { AdmPerfilPage } from '../pages/adm-perfil/adm-perfil';
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { CursadasPage } from '../pages/cursadas/cursadas';
import { DescargasPage } from '../pages/descargas/descargas';
import { EncuestaPage } from '../pages/encuesta/encuesta';
import { ExcelPage } from '../pages/excel/excel';
import { GraficoEncuestaPage } from '../pages/grafico-encuesta/grafico-encuesta';
import { GraficoAsistenciaPage } from '../pages/grafico-asistencia/grafico-asistencia';
import { MainPage } from '../pages/main/main';
import { QRsPage } from '../pages/q-rs/q-rs';
import { HomePage } from '../pages/home/home';
import { ModificacionPage } from '../pages/modificacion/modificacion';
import { ApiabmProvider } from '../providers/apiabm/apiabm';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/Camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
export var config = {
  apiKey: "AIzaSyATWFegAdRiCzbOFNGncu53dG21hjP0US8",
  authDomain: "fotos-aula.firebaseapp.com",
  databaseURL: "https://fotos-aula.firebaseio.com",
  projectId: "fotos-aula",
  storageBucket: "fotos-aula.appspot.com",
  messagingSenderId: "803546377331"
}
firebase.initializeApp(config)
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AbmPage,
    AdmPerfilPage,
    AsistenciaPage,
    CursadasPage,
    DescargasPage,
    EncuestaPage,
    GraficoEncuestaPage,
    GraficoAsistenciaPage,
    MainPage,
    QRsPage,
    ExcelPage,
    ModificacionPage
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AbmPage,
    AdmPerfilPage,
    AsistenciaPage,
    CursadasPage,
    DescargasPage,
    EncuestaPage,
    GraficoEncuestaPage,
    GraficoAsistenciaPage,
    MainPage,
    QRsPage,
    ExcelPage,
    ModificacionPage
  ],
  providers: [
    StatusBar,
    Camera,
    File,
    SplashScreen,
    BarcodeScanner,
    DatePicker,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiabmProvider
  ]
})
export class AppModule { }
