import { Component } from '@angular/core';
import { NavController, NavParams, Platform,ModalController, ViewController  } from 'ionic-angular';
import {
  LocationService,
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  MyLocation
} from '@ionic-native/google-maps';
/**
 * Generated class for the LocationPickModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location-pick-modal',
  templateUrl: 'location-pick-modal.html',
})
export class LocationPickModalPage {

  map: GoogleMap;
  latLng:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController) {
      this.platform.ready().then(()=>{
        console.log('test');
        this.loadMap();
      });
  }

  ionViewWillEnter(){
    
  }
  ionViewWillLeave() {

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

}
  loadMap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      this.latLng=myLocation.latLng;
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng
        }
      };
      this.map = GoogleMaps.create('map_canvas1', options);

    });
  }

}
