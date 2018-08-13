import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ModalController, ViewController  } from 'ionic-angular';
import {
  LocationService,
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  MyLocation
} from '@ionic-native/google-maps';

/**
 * Generated class for the LocationPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-pick',
  templateUrl: 'location-pick.html',
})
export class LocationPickPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController) {
    
  }

  ionViewWillEnter(){
    this.platform.ready().then(()=>{
      this.loadMap();
    });
  }

  loadMap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {

      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);

    });
  }

}
