import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
/**
 * Generated class for the GraficoAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grafico-asistencia',
  templateUrl: 'grafico-asistencia.html',
})
export class GraficoAsistenciaPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  labels: string[];
  datas: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.labels = this.navParams.get('labels');
    this.datas = this.navParams.get('datas');
  }

  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Inasistencias',
          data: this.datas,
          backgroundColor: [
            'rgba(100, 200, 144, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(100, 200, 144, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(100, 200, 144, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(100, 200, 144, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(100, 200, 144, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(100, 200, 144, 1)',
            'rgba(255,99,132,1)',
            'rgba(100, 200, 144, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(100, 200, 144, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
              //beginAtZero: true
            }
          }]
        }
      }

    });
  }
  volver() {
    this.navCtrl.pop();
  }
}
