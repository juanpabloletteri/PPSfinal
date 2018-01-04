import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoAsistenciaPage } from './grafico-asistencia';

@NgModule({
  declarations: [
    GraficoAsistenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoAsistenciaPage),
  ],
})
export class GraficoAsistenciaPageModule {}
