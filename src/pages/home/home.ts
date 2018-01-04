import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ApiabmProvider } from '../../providers/apiabm/apiabm';
import { Http } from '@angular/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiabmProvider]
})
export class HomePage {
  esUsuario = true;
  usuarios: any;
  mail: string;
  password: string;

  correcto: boolean;

  constructor(public navCtrl: NavController, public http: Http) {
    this.correcto = false;
    /////////////TRAER USUARIOS///////////////
    this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosUsuarios")
      .subscribe(data => {
        this.usuarios = data.json();
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
    //////////////////ACTUALIZACION ENCUESTAS/////////////
    for (let i = 0; i < 40; i++) {
      let datos = { "idEncuesta": i }
      this.http.post("http://www.estacionamiento.16mb.com/git/api/updateEstadoEncuesta", datos).subscribe(
        data => {
          //console.log(data)
        });
    }
    //////////////////////
  }
  login() {
    this.usuarios.forEach(element => {
      if (element.mail == this.mail && element.password == this.password) {
        this.correcto = true;
        console.log("registro ok" + element);
        this.navCtrl.setRoot(MainPage, {
          "id": element.id,
          "nombre": element.nombre,
          "apellido": element.apellido,
          "mail": element.mail,
          "password": element.password,
          "legajo": element.legajo,
          "tipo": element.tipo,
          "foto": element.foto,
          "libre": element.libre
        });
      }
    });
    if (this.correcto == false) {
      alert("Usuario o Password incorrecto");
    }
  }

  asignarUsuario(tipo) {
    switch (tipo) {
      case "admin": {
        this.mail = "guillermo_fink@hotmail.com";
        this.password = "321321321";
        break;
      }
      case "alumno": {
        this.mail = "rp@gmail.com";
        this.password = "321321321";
        break;
      }
      case "profesor": {
        this.mail = "octavio@gmail.com";
        this.password = "321321321";
        break;
      }
      case "administrativo": {
        this.mail = "jm@gmail.com";
        this.password = "28745365";
        break;
      }
    }

  }
}
