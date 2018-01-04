import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbmPage } from './abm';

@NgModule({
  declarations: [
    AbmPage,
  ],
  imports: [
    IonicPageModule.forChild(AbmPage),
  ],
})
export class AbmPageModule {}
