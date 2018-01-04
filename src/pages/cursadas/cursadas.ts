import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MainPage} from '../main/main';

/**
 * Generated class for the CursadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cursadas',
  templateUrl: 'cursadas.html',
})
export class CursadasPage {

  usuario:string;
  pass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = this.navParams.get('usuario');
    this.pass = this.navParams.get('pass');
  }

  Volver()
  {
    this.navCtrl.setRoot(MainPage, { "usuario": this.usuario, "pass": this.pass })
  }
}
