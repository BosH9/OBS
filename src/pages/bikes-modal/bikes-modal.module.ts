import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikesModalPage } from './bikes-modal';

@NgModule({
  declarations: [
    BikesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BikesModalPage),
  ],
})
export class BikesModalPageModule {}
