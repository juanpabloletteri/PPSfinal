import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdmPerfilPage } from '../adm-perfil/adm-perfil';
import { GraficoAsistenciaPage } from '../grafico-asistencia/grafico-asistencia';
import { Camera, CameraOptions } from '@ionic-native/Camera';
import firebase from 'firebase'


//import { File } from '@ionic-native/File';
/**
 * Generated class for the AsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-asistencia',
  templateUrl: 'asistencia.html',
})
export class AsistenciaPage {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  password: string;
  legajo: number;
  tipo: number;

  test_aula: string;
  test_data: any;
  asistencia: number;
  asist: number;
  asistencias: any;
  ultimaAsist: number;

  usuario: string;
  pass: string;

  Materia: number;
  Profesor: number;

  Aula: number;
  Dia: number;

  materias: any;
  profesores: any;
  alumnos: any;
  principioURL: string = "https://firebasestorage.googleapis.com/v0/b/fotos-aula.appspot.com/o/";
  finURL: string;

  imagenes: string[] = [];
  verimagen: boolean = false;
  validoAsist: number;
  historicoAsistencia: boolean;
  mostrarHistorico: boolean;
  alumnosHistorico: any;
  listadoHistorico: boolean;

  verAsistencia: boolean = false;

  picdata: any;
  picurl: any;
  mypicref: any;

  asistenciaParaEstadistica: any;
  labels: any[] = [];
  datas: any[] = [];


  constructor(public camara: Camera, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.mypicref = firebase.storage().ref('/');
    this.id = this.navParams.get('id');
    this.nombre = this.navParams.get('nombre');
    this.apellido = this.navParams.get('apellido');
    this.mail = this.navParams.get('mail');
    this.password = this.navParams.get('password');
    this.legajo = this.navParams.get('legajo');
    this.tipo = this.navParams.get('tipo');
    this.mostrarHistorico = false;
    this.listadoHistorico = false;
    /////////////ASISTENCIA PARA ESTADISTICA 4A///////////////
    this.http.get("http://www.estacionamiento.16mb.com/git/api/estadisticaAsistenciaGlobal")
      .subscribe(data => {
        this.asistenciaParaEstadistica = data.json();
        console.log(this.asistenciaParaEstadistica);
      }, error => {
        console.log(error);// Error getting the data
      });

    /////////////TRAER MATERIAS Y AULAS///////////////
    this.http.get("http://www.estacionamiento.16mb.com/git/api/traerTodasLasMaterias")
      .subscribe(data => {
        this.materias = data.json();
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
    /////////////TRAER PROFESORES///////////////
    this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosProfes")
      .subscribe(data => {
        this.profesores = data.json();
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  UltimaAsistenciaParaFoto() {
    this.http.get("http://www.estacionamiento.16mb.com/git/api/ultimaAsistencia")
      .subscribe(data => {
        this.ultimaAsist = data['_body'];
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  fotoDeAula(id_asist) {
    this.camara.getPicture({
      correctOrientation: true,
      quality: 50,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camara.DestinationType.DATA_URL,
      sourceType: this.camara.PictureSourceType.CAMERA,
      encodingType: this.camara.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imagedata => {
      this.picdata = imagedata;
      this.upload(id_asist)
    })
  }
  upload(id_asist) {
    this.mypicref.child('img').child(id_asist + '.jpeg')
      .putString(this.picdata, 'base64', { contentType: 'image/jpeg' })
      .then(savepic => {
        this.picurl = savepic.downloadURL
      })
  }
  traer() {
    this.verAsistencia = false;
    /////////////TRAER ALUMNOS///////////////
    this.http.get("http://www.estacionamiento.16mb.com/git/api/todoslosAlumnos")
      .subscribe(data => {
        this.alumnos = data.json();
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  VolverEleccion() {
    this.Materia = null;
    this.Profesor = null;
    this.Aula = null;
    this.Dia = null;
    this.verAsistencia = true;
  }
  ConfirmarAsistencia() {
    let body: any;
    var lastPart = this.picurl.split("/").pop();
    lastPart = lastPart.replace('&', '&amp;');
    body = { "urlFoto": lastPart };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/updateFotoAsistencia", body)
      .subscribe(data => {
        console.log(data['_body']);
        alert("Asistencia guardada");
        this.navCtrl.setRoot(AsistenciaPage, {
          "id": this.id,
          "nombre": this.nombre,
          "apellido": this.apellido,
          "mail": this.mail,
          "password": this.password,
          "legajo": this.legajo,
          "tipo": this.tipo
        })
      }, error => {
        console.log(error);// Error getting the data
      });
    /*
    let confirm = this.alertCtrl.create({
      title: 'Confirmacion',
      message: '¿Desea confirmar la asistencia marcada?',
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
            this.VolverEleccion();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
*/

  }

  listaAula() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.test_aula = barcodeData.text;
      this.traerInformacion(this.test_aula);
    });

  }
  traerInformacion(numeroAula) {
    let body: any;
    body = { "aula": numeroAula };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/traerCursoPorDiaAula", body)
      .subscribe(data => {
        this.test_data = data.json();
        try {
          this.traerAlumnos(this.test_data[0].id_curso);
          this.agregarAsistencia(this.test_data[0].id_curso);
          this.UltimaAsistenciaParaFoto();
          this.verAsistencia = true;
        }
        catch (error) {
          alert("No hay curso disponible.");
        }

      }, error => {
        console.log(error);// Error getting the data
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
  traerAlumnos(idCurso) {
    let body: any;
    body = { "idCurso": idCurso };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/listaPorCurso", body)
      .subscribe(data => {
        this.alumnos = data.json();
        console.log("LOG ALUMNOS" + this.alumnos);
        this.alumnos.forEach(element => {
          console.log(this.agregarDetalleAsistencia(element.id));
        });
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  validarAsistencia(idCurso) {
    let body: any;
    body = { "idCurso": idCurso };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/validarAsistencia", body)
      .subscribe(data => {
        this.validoAsist = data['_body'];
      }, error => {
        console.log(error);// Error getting the data
      });

  }
  agregarAsistencia(idCurso) {
    let body: any;
    body = { "idCurso": idCurso };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/agregarAsistencia", body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  presente(idAlumno) {
    console.log(idAlumno);
    let body: any;
    body = { 'idAlumno': idAlumno };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/updateDetalleAsistencia", body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  agregarDetalleAsistencia(idAlumno) {
    let body: any;
    body = { "idAlumno": idAlumno };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/agregarDetalleAsistencia", body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  CancelarAsistencia() {
    this.http.get("http://www.estacionamiento.16mb.com/git/api/eliminarAsistencia")
      .subscribe(data => {
        this.alumnos = data.json();
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
    this.navCtrl.setRoot(AsistenciaPage, {
      "id": this.id,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "mail": this.mail,
      "password": this.password,
      "legajo": this.legajo,
      "tipo": this.tipo
    });
  }
  modificarPerfil() {
    this.navCtrl.setRoot(AdmPerfilPage, {
      "id": this.id,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "mail": this.mail,
      "password": this.password,
      "legajo": this.legajo,
      "tipo": this.tipo
    })
  }
  traerInformacionAsistencias() {
    this.http.get("http://www.estacionamiento.16mb.com/git/api/historicoAsistencia")
      .subscribe(data => {
        this.historicoAsistencia = data.json();
        this.mostrarHistorico = true;
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  asistenciaPorId(asistencia) {
    this.fotoAsistenciaRecuperada(asistencia);
    let body: any;
    body = { "idAsist": asistencia };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/asistenciaPorId", body)
      .subscribe(data => {
        this.alumnosHistorico = data.json();
        this.mostrarHistorico = false;
        this.listadoHistorico = true;
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  fotoAsistenciaRecuperada(asistencia) {
    let body: any;
    body = { "idAsist": asistencia };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/fotoAsistenciaRecuperada", body)
      .subscribe(data => {
        this.finURL = data['_body'];
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  mostrarprincipal() {
    this.listadoHistorico = false;
    this.mostrarHistorico = false;
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
  tomarFoto() {
    this.camara.getPicture({
      correctOrientation: true
    })
      .then(imagenInfo => {
        this.imagenes.push(imagenInfo);
        /*let path = imagenInfo.substr(0, imagenInfo.lastInfexOf('/')+ 1);
        let nombre = imagenInfo.substr(imagenInfo.lastInfexOf('/')+ 1);
        let nuevoNombre = new Date().getMilliseconds() + '.jpg';
        this.file.moveFile(path,nombre,
                            cordova.file.dataDirectory, nuevoNombre)
                            .then((info:Entry) =>{
                              
                            })
                            .catch(error =>{
                              
                            })*/
      })
      .catch(error => {

      })
  }

  estadisticasAsistencia() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ver grafico');

    alert.addInput({
      type: 'radio',
      label: '4A',
      value: '4',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '4B',
      value: '33',
    });

    alert.addInput({
      type: 'radio',
      label: 'Todos',
      value: '0',
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        /////FALTAS 4A//////
        if (data == 4) {
          for (let i = 0; i < 8; i++) {
            this.labels[0] = this.asistenciaParaEstadistica[5].apellido + " " + this.asistenciaParaEstadistica[5].nombre
            this.datas[0] = this.asistenciaParaEstadistica[5].faltas

            this.labels[1] = this.asistenciaParaEstadistica[3].apellido + " " + this.asistenciaParaEstadistica[3].nombre
            this.datas[1] = this.asistenciaParaEstadistica[3].faltas

            this.labels[2] = this.asistenciaParaEstadistica[8].apellido + " " + this.asistenciaParaEstadistica[8].nombre
            this.datas[2] = this.asistenciaParaEstadistica[8].faltas

            this.labels[3] = this.asistenciaParaEstadistica[7].apellido + " " + this.asistenciaParaEstadistica[7].nombre
            this.datas[3] = this.asistenciaParaEstadistica[7].faltas
          }
          this.cambioDePagina();
        }
        /////FALTAS 4B//////
        else if (data == 33) {
          for (let i = 0; i < 8; i++) {
            this.labels[0] = this.asistenciaParaEstadistica[2].apellido + " " + this.asistenciaParaEstadistica[2].nombre
            this.datas[0] = this.asistenciaParaEstadistica[2].faltas

            this.labels[1] = this.asistenciaParaEstadistica[1].apellido + " " + this.asistenciaParaEstadistica[1].nombre
            this.datas[1] = this.asistenciaParaEstadistica[1].faltas

            this.labels[2] = this.asistenciaParaEstadistica[0].apellido + " " + this.asistenciaParaEstadistica[0].nombre
            this.datas[2] = this.asistenciaParaEstadistica[0].faltas

            this.labels[3] = this.asistenciaParaEstadistica[6].apellido + " " + this.asistenciaParaEstadistica[6].nombre
            this.datas[3] = this.asistenciaParaEstadistica[6].faltas
          }
          this.cambioDePagina();
        }
        /////FALTAS 4A//////
        /*if (data == 4) {

          for (let i = 0; i < 4; i++) {
            this.labels[i] = this.asistenciaParaEstadistica[i].apellido + " " + this.asistenciaParaEstadistica[i].nombre
            this.datas[i] = this.asistenciaParaEstadistica[i].faltas
          }
          this.cambioDePagina();
        }
        /////FALTAS 4B//////
        else if (data == 33) {

          for (let i = 4; i < 8; i++) {
            this.labels[i - 4] = this.asistenciaParaEstadistica[i].apellido + " " + this.asistenciaParaEstadistica[i].nombre
            this.datas[i - 4] = this.asistenciaParaEstadistica[i].faltas
          }
          this.cambioDePagina();
        }*/
        /////FALTAS TODOS//////
        else if (data == 0) {
          for (let i = 0; i < 8; i++) {
            this.labels[i] = this.asistenciaParaEstadistica[i].apellido + " " + this.asistenciaParaEstadistica[i].nombre
            this.datas[i] = this.asistenciaParaEstadistica[i].faltas
          }
          this.cambioDePagina();
        }
      }
    });
    alert.present();

  }
  cambioDePagina() {
    ////VOY A LA PAGINA GRAFICO ASISTENCIA
    this.navCtrl.push(GraficoAsistenciaPage, {
      "labels": this.labels,
      "datas": this.datas
    })
  }
}
