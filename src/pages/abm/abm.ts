import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { ModificacionPage } from '../modificacion/modificacion';
import * as papa from 'papaparse';
//import 'rxjs/add/operator/map';
/**
 * Generated class for the AbmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-abm',
  templateUrl: 'abm.html',
})
export class AbmPage {
  archivotitulo: string;
  archivos: any;
  lista: any;
  Importacion: any;
  testRadioOpen: boolean;
  testRadioResult;
  csvData: any[] = [];
  headerRow: any[] = [];

  mail: string;
  nombre: string;
  apellido: string;
  dni: number;
  sexo: string;
  tipo: string;
  usuario: string;
  pass: string;
  listatodos: any;

  archivo: string;
  Fecha: Date;
  existe: boolean;
  tipoUsuario: string;
  api: string;
  AltaBaja: boolean = true;

  constructor(private alertCtrl: AlertController, public file: File, public navCtrl: NavController, public navParams: NavParams
    , public actionSheetCtrl: ActionSheetController, public http: Http) {
    this.usuario = this.navParams.get('usuario');
    this.pass = this.navParams.get('pass');
    this.tipo = this.navParams.get('tipo');
    this.definirApi();
    this.tipoUsuario = this.navParams.get('tipoUsuario');
    this.http.get("http://www.estacionamiento.16mb.com/git/api/traerArchivos")
      .subscribe(data => {
        this.archivos = data.json();
      }, error => {
        console.log(error);
      });

    switch (this.tipo) {
      case "2":
        this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosProfes")
          .subscribe(data => {
            this.listatodos = data.json();
          }, error => {
            console.log(error);
          });
        break;
      case "3":
        this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosAdministrativos")
          .subscribe(data => {
            this.listatodos = data.json();
          }, error => {
            console.log(error);
          });
        break;
      case "4":
        this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosAlumnos")
          .subscribe(data => {
            this.listatodos = data.json();
          }, error => {
            console.log(error);
          });
        break;

    }

  }
  definirApi() {
    switch (this.tipo) {
      case "3":
        this.api = "http://www.estacionamiento.16mb.com/git/api/altaAdministrativo";
        break;
      case "2":
        this.api = "http://www.estacionamiento.16mb.com/git/api/altaProfesor";
        break;
      case "4":
        this.api = "http://www.estacionamiento.16mb.com/git/api/altaAlumno";
        break;
      default:
        break;
    }
  }
  mostrarAlert(exito) {
    if (exito == 1) {
      let alert = this.alertCtrl.create({
        title: 'Agregado',
        subTitle: 'Exito al agregar el usuario',
        buttons: ['Aceptar']
      });
      alert.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Se produjo un error, vuelva a intentar',
        buttons: ['Cancelar']
      });
      alert.present();
    }
  }

  AltaConArchivoProfesor() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');

    alert.addInput({
      type: 'radio',
      label: 'Profesor',
      value: 'Profesor',
      checked: true
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;

        if (data) {
          switch (data) {
            case 'Profesor':
              this.archivo = 'Profesor1.csv';
              this.ComprobarArchivo();
              break;
          }
        }
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  AltaConArchivoAdminsitrativo() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');

    alert.addInput({
      type: 'radio',
      label: 'Administrativo',
      value: 'Profesor',
      checked: true
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;

        if (data) {
          switch (data) {
            case 'Administrativo':
              this.archivo = 'Administrativo1.csv';
              this.ComprobarArchivo();
              break;
          }
        }
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  AltaConArchivoAlumno() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');

    alert.addInput({
      type: 'radio',
      label: 'Alumno',
      value: 'Alumno',
      checked: true
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;

        if (data) {
          switch (data) {
            case 'Alumno':
              this.archivo = 'Alumnos1.csv';
              this.ComprobarArchivo();
              break;
          }
        }
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  ComprobarArchivo() {
    if (this.archivo == this.archivotitulo) {
      this.existe = true;
    }
    this.archivos.forEach(element => {
      if (element.titulo == this.archivo) {
        this.existe = true;
        return;
      }
    })

    if (!this.existe) {
      this.readCsvData();
    } else {
      this.AlertMensaje("El archivo ya fue importado", "Archivo duplicado");
      this.existe = false;
    }
  }
  public readCsvData() {
    this.http.get('assets/archivos/' + this.archivo)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
  }
  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);
    this.csvData = parsedData;

    this.guardarLista();
  }
  public guardarLista() {
    //Guardamos la Importacion
    let datos = { "titulo": this.archivo };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/subirArchivo", datos).subscribe(
      data => console.log(data)
    );
    for (var index = 0; index < this.csvData.length - 1; index++) {
      var element = this.csvData[index];
      var nombre = element[0];
      var apellido = element[1];
      var mail = element[2];
      var dni = element[3];
      var sexo = element[4];
      this.lista = {
        "nombre": nombre, "apellido": apellido, "mail": mail, "dni": dni, "sexo": sexo
      };
      this.http.post(this.api, this.lista).subscribe(
        data => console.log(data)
      );
    }
    this.existe = false;
    this.AlertMensaje("El archivo fue agregado exitosamente!", "Proceso finalizado");
    this.archivotitulo = this.archivo;
    this.http.get("http://www.estacionamiento.16mb.com/git/api/traerArchivos")
      .subscribe(data => {
        this.archivos = data.json();
      }, error => {
        console.log(error);
      });
  }
  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  Alta() {
    let body: any;
    body = { "nombre": this.nombre, "apellido": this.apellido, "mail": this.mail, "dni": this.dni, "sexo": this.sexo };
    switch (this.tipo) {
      case "1":
        this.http.post("http://www.estacionamiento.16mb.com/git/api/altaAdmin", body)
          .subscribe(data => {
            this.mostrarAlert(1);
            this.Volver();
          }, error => {
            this.mostrarAlert(0);// Error getting the data
          });
        break;

      case "3":
        this.http.post('http://www.estacionamiento.16mb.com/git/api/altaAdministrativo', body)
          .subscribe(data => {
            this.mostrarAlert(1);
            this.Volver();
          }, error => {
            this.mostrarAlert(0);// Error getting the data
          });
        break;

      case "2":
        this.http.post("http://www.estacionamiento.16mb.com/git/api/altaProfesor", body)
          .subscribe(data => {
            this.mostrarAlert(1);
            this.Volver();
          }, error => {
            this.mostrarAlert(0);// Error getting the data
          });
        break;

      case "4":
        this.http.post("http://www.estacionamiento.16mb.com/git/api/altaAlumno", body)
          .subscribe(data => {
            this.mostrarAlert(1);
            this.Volver();
          }, error => {
            this.mostrarAlert(0);// Error getting the data
          });
        break;

      default:
        console.log("error");
    }
  }
  Volver() {
    this.navCtrl.setRoot(MainPage, { "usuario": this.usuario, "pass": this.pass, "tipo": this.tipoUsuario });
  }
  AlertMensaje(titulo: string, mens: string) {

    let ventana = this.alertCtrl.create({
      title: titulo,
      message: mens,
      buttons: [
        {
          text: "Aceptar",
          handler: data => {
            console.log('Mensaje de Alerta');
          }
        }
      ]

    });
    ventana.present(ventana);
  }

  menu(id) {
    console.log(id);
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones de Usuario ',
      buttons: [
        {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.eliminarUsuario(id);
          }
        },
        {
          text: 'Modificar',
          handler: () => {
            this.modificarUsuario(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  eliminarUsuario(id) {
    let datos = { "idUsuario": id }
    this.http.post("http://www.estacionamiento.16mb.com/git/api/bajaUsuario", datos).subscribe(
      data => {
        ///////////alert//////
        let alert = this.alertCtrl.create({
          title: 'Felicitaciones!',
          subTitle: 'Usuario eliminado exitosamente!',
          buttons: ['OK']
        });
        alert.present();

        this.Volver()
      });
  }
  modificarUsuario(id) {
    this.listatodos.forEach(element => {
      if (element.id == id) {
        this.navCtrl.push(ModificacionPage, {
          "id": element.id,
          "nombre": element.nombre,
          "apellido": element.apellido,
          "dni": element.dni,
          "mail": element.mail
        })
      }
    });
  }
}
