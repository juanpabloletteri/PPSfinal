import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRsPage } from './q-rs';

@NgModule({
  declarations: [
    QRsPage,
  ],
  imports: [
    IonicPageModule.forChild(QRsPage),
  ],
})
export class QRsPageModule {}
