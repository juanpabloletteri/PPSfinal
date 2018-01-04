import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AbmPage } from '../abm/abm';
import { AdmPerfilPage } from '../adm-perfil/adm-perfil';
import { AsistenciaPage } from '../asistencia/asistencia';
import { CursadasPage } from '../cursadas/cursadas';
import { DescargasPage } from '../descargas/descargas';
import { EncuestaPage } from '../encuesta/encuesta';
import { GraficoEncuestaPage } from '../grafico-encuesta/grafico-encuesta';
import { QRsPage } from '../q-rs/q-rs';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular';
import * as papa from 'papaparse';
import { Http } from '@angular/http';
import { MainPage } from '../main/main';

/**
 * Generated class for the ExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-excel',
  templateUrl: 'excel.html',
})
export class ExcelPage {
  test_data: any;
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
  archivo: string;
  sexo: string;
  usuario: string;
  Fecha: Date;
  pass: string;
  existe: boolean = false;
  tipo: string;
  tipoUsuario: string;


  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.nombre = navParams.get("nombre");
    this.tipoUsuario = navParams.get("tipoUsuario");
    this.http.get("http://www.estacionamiento.16mb.com/git/api/traerArchivos")
      .subscribe(data => {
        this.archivos = data.json();
      }, error => {
        console.log(error);
      });
  }

  AltaConArchivo() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');

    alert.addInput({
      type: 'radio',
      label: '6-1-2c2017-200-7',
      value: '6-1-2c2017-200-7',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '6-2-2c2017-201-23',
      value: '6-2-2c2017-201-23'
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
            case '6-1-2c2017-200-7':
              this.archivo = '6-1-2c2017-200-7.csv';
              this.ComprobarArchivo();
              break;
            case '6-2-2c2017-201-23':
              this.archivo = '6-2-2c2017-201-23.csv';
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
    this.archivos.forEach(element => {
      if (element.titulo == this.archivo) {
        this.existe = true;
        return;
      }
    })

    if (!this.existe) {
      this.readCsvData();
    } else {
      this.AlertMensaje("Esta lista ya fue importada", "Lista duplicada");
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
    var tit = this.archivo.split("-");
    var aula = tit[3];
    let materia = tit[0];
    let comision = tit[1];
    let arrayprofe = tit[4].split(".");
    let profesor = arrayprofe[0];
    let body = { "aula": aula, "materia": materia, "comision": comision, "profesor": profesor };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/altaCurso", body).subscribe(
      res => this.guardarAlumnos()
    );
    this.traerInformacion(aula);
    //guardamos los Alumnos importados
  }
  alertDescarga()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');

    alert.addInput({
      type: 'radio',
      label: '6-1-2c2017-200-7',
      value: '6-1-2c2017-200-7',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '6-2-2c2017-201-23',
      value: '6-2-2c2017-201-23'
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
            case '6-1-2c2017-200-7':
              this.archivo = '6-1-2c2017-200-7.csv';
              this.downloadCSV();
              break;
            case '6-2-2c2017-201-23':
              this.archivo = '6-2-2c2017-201-23.csv';
              this.downloadCSV();
              break;

          }
        }

      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });

  }
  downloadCSV() {

    this.alertDescarga();
    // Dummy implementation for Desktop download purpose
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = ('assets/archivos/' + this.archivo);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }

  traerInformacion(numeroAula) {
    let body: any;
    body = { "aula": numeroAula };
    this.http.post("http://www.estacionamiento.16mb.com/git/api/traerCursoPorDiaAula", body)
      .subscribe(data => {
        this.test_data = data.json();
        }
      , error => {
        console.log(error);// Error getting the data
      });
  }
  guardarAlumnos()
  {

    for (var index = 0; index < this.csvData.length - 1; index++) {
      var element = this.csvData[index];
      var element2 = element[0];
      var elementDia = element[2].split(" ");
      this.lista = {
        "idAlumno": element[0]
      };
      this.http.post("http://www.estacionamiento.16mb.com/git/api/agregarAlumnosCurso", this.lista).subscribe(
        data => console.log(data)
      );
    }
    this.existe = false;
    this.AlertMensaje("La lista fue agregada exitosamente!", "Proceso finalizado");
    this.http.get("http://www.estacionamiento.16mb.com/git/api/traerArchivos")
    .subscribe(data => {
      this.archivos = data.json();
    }, error => {
      console.log(error);
    });
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

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  Volver() {
    this.navCtrl.setRoot(MainPage, {"nombre":this.nombre, "tipo": this.tipoUsuario} );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcelPage');
  }

}
