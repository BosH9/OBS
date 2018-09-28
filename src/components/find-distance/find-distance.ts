import { Component, Input } from '@angular/core';
import { ILatLng } from '@ionic-native/google-maps';
import { LoadingController} from 'ionic-angular';
//import { Spherical } from '@ionic-native/google-maps';

import { FindDistanceProvider } from '../../providers/find-distance/find-distance';


@Component({
  selector: 'find-distance',
  templateUrl: 'find-distance.html'
})
export class FindDistanceComponent {

  text: string;
  loading:any;
  @Input() source:ILatLng;
  @Input() userId:number;
  @Input() destination:ILatLng;
  constructor(private loadingCtrl:LoadingController,public findDistancePrvdr:FindDistanceProvider) {
    console.log('Hello FindDistanceComponent Component');
    this.text = 'Hello World';
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
      content:'Loading...'
    });
    this.loading.present();
  }
  findDistance(){
    this.showLoader();
    //let userData=[];
    this.findDistancePrvdr.getUserAddressByUserId(this.userId)
        .subscribe(res=>{
          console.log(res);
          //console.log("Distance: "+Spherical.computeDistanceBetween(this.source, this.destination));
        });
  }


}
