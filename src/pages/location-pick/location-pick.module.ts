import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPickPage } from './location-pick';

@NgModule({
  declarations: [
    LocationPickPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPickPage),
  ],
})
export class LocationPickPageModule {}
