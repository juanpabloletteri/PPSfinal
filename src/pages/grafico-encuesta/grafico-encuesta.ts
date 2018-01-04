import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EncuestaPage } from '../encuesta/encuesta';
import { Chart } from 'chart.js';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
/**
 * Generated class for the GraficoEncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grafico-encuesta',
  templateUrl: 'grafico-encuesta.html',
})
export class GraficoEncuestaPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  password: string;
  legajo: number;
  tipo: number;

  nombreEncuesta: string;
  op1: number;
  op2: number;
  cantidadVotantes: number;
  op1Nombre: string;
  op2Nombre: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.nombre = this.navParams.get('nombre');
    this.apellido = this.navParams.get('apellido');
    this.mail = this.navParams.get('mail');
    this.password = this.navParams.get('password');
    this.legajo = this.navParams.get('legajo');
    this.tipo = this.navParams.get('tipo');

    this.op1 = this.navParams.get('op1');
    this.op2 = this.navParams.get('op2');
    this.op1Nombre = this.navParams.get('op1Nombre');
    this.op2Nombre = this.navParams.get('op2Nombre');
    this.cantidadVotantes = this.navParams.get('cantidadVotantes');
    this.nombreEncuesta = this.navParams.get('nombreEncuesta');

    console.log('op1: ' + this.op1 + 'op2: ' + this.op2, "cant vot: " + this.cantidadVotantes);
  }

  Volver() {
    this.navCtrl.setRoot(EncuestaPage, {
      "id": this.id,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "mail": this.mail,
      "password": this.password,
      "legajo": this.legajo,
      "tipo": this.tipo
    })
  }

  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: [this.op1Nombre, this.op2Nombre, 'NS/NC'],
        datasets: [{
          label: 'Total de votos',
          data: [this.op1, this.op2, (this.cantidadVotantes - this.op1 - this.op2)],
          backgroundColor: [
            'rgba(100, 200, 144, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(100, 200, 144, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: [this.op1Nombre, this.op2Nombre, 'NS/NC'],
        datasets: [{
          label: 'Total de votos',
          data: [this.op1, this.op2, (this.cantidadVotantes - this.op1 - this.op2)],
          backgroundColor: [
            'rgba(100, 200, 144, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF4232",
            "#36A2EB",
            "#FF6384"
          ]
        }]
      }

    });

  }

}
