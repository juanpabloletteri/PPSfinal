import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
/**
 * Generated class for the ModificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificacion',
  templateUrl: 'modificacion.html',
})
export class ModificacionPage {

  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  mail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public http: Http) {
    this.id = this.navParams.get('id');
    this.nombre = this.navParams.get('nombre');
    this.apellido = this.navParams.get('apellido');
    this.dni = this.navParams.get('dni');
    this.mail = this.navParams.get('mail');

  }

  ModificarUsuario() {
    let datos = {
      "id": this.id,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "dni": this.dni,
      "mail": this.mail
    };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/modificarUsuario", datos).subscribe(
      data => console.log(data)
    );
    ///////////alert//////
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'Se han cambiado los datos del usuario de manera exitosa!',
      buttons: ['OK']
    });
    alert.present();
    this.Cancelar();
  }

  restablecerPass() {
    let datos = {
      "id": this.id,
      "pass": this.dni
    };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/restablecerPass", datos).subscribe(
      data => console.log(data)
    );
    ///////////alert//////
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'Se reiniciado su contraseña de manera exitosa!',
      buttons: ['OK']
    });
    alert.present();
  }

  Cancelar() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificacionPage');
  }

}
