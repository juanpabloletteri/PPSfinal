import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { GraficoEncuestaPage } from '../grafico-encuesta/grafico-encuesta';
import { Http } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { DatePicker } from '@ionic-native/date-picker';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the EncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {

  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  password: string;
  legajo: number;
  tipo: number;

  idCurso: number;
  cursos: any;
  CrearEncuestaSiNO: boolean = false;
  curso: number;

  idEncuesta: string;
  op1: number;
  op2: number;
  cantidadVotantes: number;
  nombreEncuesta: string;
  tipoEncuesta: string;
  op1Nombre: string;
  op2Nombre: string;
  duracion: number;
  existe: boolean;

  encuestasAlumno: any;
  encuestasProfesor: any;
  resultados: any;

  testqr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public http: Http, private datePicker: DatePicker, private barcodeScanner: BarcodeScanner, public actionSheetCtrl: ActionSheetController) {

    this.id = this.navParams.get('id');
    this.nombre = this.navParams.get('nombre');
    this.apellido = this.navParams.get('apellido');
    this.mail = this.navParams.get('mail');
    this.password = this.navParams.get('password');
    this.legajo = this.navParams.get('legajo');
    this.tipo = this.navParams.get('tipo');
    this.existe = false;
    //////////////TRER ENCUESTAS DE ALUMNOS/////
    let datos = { "idAlumno": this.id }
    this.http.post("http://www.estacionamiento.16mb.com/git/api/mostrarEncuestasPorAlumno", datos).subscribe(
      data => {
        this.encuestasAlumno = data.json()
        console.log(this.encuestasAlumno)
      });

    //////////////TRER ENCUESTAS DE PROFESOR/////
    let datos1 = { "idProfesor": 7 }
    this.http.post("http://www.estacionamiento.16mb.com/git/api/mostrarEncuestasPorProf", datos1).subscribe(
      data => {
        this.encuestasProfesor = data.json()
        console.log(this.encuestasProfesor)
      });
  }

  LeerQr() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.testqr = barcodeData.text;
      //////SI ES PROFESOR///////
      if (this.tipo == 2) {
        this.encuestasProfesor.forEach(element => {
          ////SI ENCUENTRA LA ENCUESTA Y PERTENECE AL PROFESOR LOGUEADO 
          if (this.testqr == element.id_encuesta && this.id == element.id_profesor) {
            this.existe = true;
            this.VerResultado(element.id_encuesta, element.nombre_encuesta, element.opcion1, element.opcion2)
          }
          ////SI ENCUENTRA LA ENCUESTA Y NO PERTENECE AL PROFESOR LOGUEADO 
          else if (this.testqr == element.id_encuesta && this.id != element.id_profesor && element.activa == 0) {
            this.existe = true;
            this.VerResultado(element.id_encuesta, element.nombre_encuesta, element.opcion1, element.opcion2)
          }
        });
        if (!this.existe) {
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'El codigo QR escaneado no se corresponde con encuestas',
            buttons: ['OK']
          });
          alert.present();
        }
      }
      ///////SI ES ALUMNO///////
      else if (this.tipo == 4) {
        this.encuestasAlumno.forEach(element => {
          ///////SI ENCUENTRA UNA ENCUESTA FINALIZADA
          if (this.testqr == element.id_encuesta && element.activa == 0) {
            this.existe = true;
            this.VerResultado(element.id_encuesta, element.nombre_encuesta, element.opcion1, element.opcion2)
          }
          /////////SI ENCUENTRA UNA ENCUESTA PARA VOTAR
          else if (this.testqr == element.id_encuesta && element.activa == 1) {
            this.existe = true;
            this.Votar(element.id_encuesta, element.opcion1, element.opcion2)
          }
        });
      }
      if (!this.existe) {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'El codigo QR escaneado no se corresponde con encuestas',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  CrearEncuesta() {
    let datos = {
      "curso": this.curso,
      "nombre": this.nombreEncuesta,
      "opcion1": this.op1Nombre,
      "opcion2": this.op2Nombre,
      "duracion": this.duracion
    };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/ingresarEncuesta", datos).subscribe(
      data => console.log(data)
    );
    ///////////alert//////
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'Su encuesta fue creada con exito!',
      buttons: ['OK']
    });
    alert.present();
    //pongo todo en null
    this.curso = null;
    this.nombreEncuesta = null;
    this.op1Nombre = null;
    this.op2Nombre = null;
    this.duracion = null;
    this.CrearEncuestaSiNO = false;
  }

  MenuEncuesta2(id_encuesta, nombre_encuesta, opcion1, opcion2) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones de encuesta',
      buttons: [
        {
          text: 'Ver Resultados',
          handler: () => {
            this.VerResultado(id_encuesta, nombre_encuesta, opcion1, opcion2)
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.EliminarEncuesta(id_encuesta)
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

  MenuEncuesta(id_encuesta, nombre_encuesta, opcion1, opcion2) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones de encuesta',
      buttons: [
        {
          text: 'Activar',
          handler: () => {
            this.ActivarEncuesta(id_encuesta)
          }
        }, {
          text: 'Modificar',
          handler: () => {
            this.ModificarEncuesta(id_encuesta, nombre_encuesta, opcion1, opcion2)
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.EliminarEncuesta(id_encuesta)
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
  ActivarEncuesta(id_encuesta) {
    let datos = { "idEncuesta": id_encuesta }
    this.http.post("http://www.estacionamiento.16mb.com/git/api/activarEncuestaProfesor", datos).subscribe(
      data => {
        ///////////alert//////
        let alert = this.alertCtrl.create({
          title: 'Felicitaciones!',
          subTitle: 'Su encuesta fue activada con exito!',
          buttons: ['OK']
        });
        alert.present();

        this.Volver()
      });
  }
  ModificarEncuesta(id_encuesta, nombre_encuesta, opcion1, opcion2) {
    let prompt = this.alertCtrl.create({
      title: 'Modificacion',
      message: "Ingrese las nuevas opciones",
      inputs: [
        {
          name: 'opcion1',
          placeholder: 'OP1: ' + opcion1
        },
        {
          name: 'opcion2',
          placeholder: 'OP2: ' + opcion2
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Modificar',
          handler: data => {
            if (data.opcion1 == "" || data.opcion2 == "") {
              ///////////alert//////
              let alert = this.alertCtrl.create({
                title: 'Datos incompletos!',
                subTitle: 'Por favor complete los datos requeridos para proceder',
                buttons: ['OK']
              });
              alert.present();
            }
            else {
              this.CambiarOpcionesEncuesta(id_encuesta, data.opcion1, data.opcion2)
            }
          }
        }
      ]
    });
    prompt.present();
  }
  CambiarOpcionesEncuesta(id_encuesta, opcion1, opcion2) {
    let datos = {
      "idEncuesta": id_encuesta,
      "opcion1": opcion1,
      "opcion2": opcion2
    }
    console.log(datos)
    this.http.post("http://www.estacionamiento.16mb.com/git/api/modificarEncuesta", datos).subscribe(
      data => {
        this.Volver()
      });
    ///////////alert//////
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'Su encuesta fue modificada con exito!',
      buttons: ['OK']
    });
    alert.present();

    this.Volver()
  }
  EliminarEncuesta(id_encuesta) {
    let datos = { "idEncuesta": id_encuesta }
    this.http.post("http://www.estacionamiento.16mb.com/git/api/eliminarEncuesta", datos).subscribe(
      data => {
        ///////////alert//////
        let alert = this.alertCtrl.create({
          title: 'Felicitaciones!',
          subTitle: 'Su encuesta fue eliminada con exito!',
          buttons: ['OK']
        });
        alert.present();

        this.Volver()
      });
  }
  VerResultado(id_encuesta, nombre_encuesta, opcion1, opcion2) {

    let datos = { "idEncuesta": id_encuesta };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/mostrarDatosEncuestaPorId", datos).subscribe(
      data => this.resultados = data.json()
    );
    /////////////
    let confirm = this.alertCtrl.create({
      title: 'Desea ver los resultados?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.resultados.forEach(element => {
              this.op1 = element.op1;
              this.op2 = element.op2;
              this.cantidadVotantes = element.TOTAL_VOTANTES
            });
            this.navCtrl.setRoot(GraficoEncuestaPage, {
              "id": this.id,
              "nombre": this.nombre,
              "apellido": this.apellido,
              "mail": this.mail,
              "password": this.password,
              "legajo": this.legajo,
              "tipo": this.tipo,

              "nombreEncuesta": nombre_encuesta,
              "op1Nombre": opcion1,
              "op2Nombre": opcion2,
              "op1": this.op1,
              "op2": this.op2,
              "cantidadVotantes": this.cantidadVotantes
            })
          }
        }
      ]
    });
    confirm.present();
  }

  VerEncuestas() {

  }
  Votar(id_encuesta, opcion1, opcion2) {

    let alert = this.alertCtrl.create();
    alert.setTitle('Elija su opcion');

    alert.addInput({
      type: 'radio',
      label: opcion1,
      value: '1',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: opcion2,
      value: '2',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.ActualizarVotoAlumno(id_encuesta, data);
      }
    });
    alert.present();
  }
  ActualizarVotoAlumno(id_encuesta, voto) {
    let datos = {
      "idEncuesta": id_encuesta,
      "idAlumno": this.id,
      "voto": voto
    }
    console.log(datos)
    this.http.post("http://www.estacionamiento.16mb.com/git/api/updateVotoAlumno", datos).subscribe(
      data => {
        this.Volver()
      });
  }


  Volver() {
    this.navCtrl.setRoot(MainPage, {
      "id": this.id,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "mail": this.mail,
      "password": this.password,
      "legajo": this.legajo,
      "tipo": this.tipo
    })
  }
}
