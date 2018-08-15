import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform,ModalController, ViewController  } from 'ionic-angular';
import {
  LocationService,
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  MyLocation,
  Marker,
  GoogleMapsEvent
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
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App) {
      
  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.loadMap();
    });
  }
  ionViewDidLoad() {
    
  }
  ionViewWillUnload(){
    console.log('ionViewWillUnload');
    //this.app.getRootNavs()[0].setRoot(BookServicePage);
    //this.app.getRootNav().setRoot(BookServicePage);
  }

  loadMap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {

      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng,
          zoom: 18,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);
      this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
      let marker:Marker=this.map.addMarkerSync({
        title:myLocation.latLng.lat+' - '+myLocation.latLng.lng,
        position:myLocation.latLng,
        animation:'drop',
        draggable:true 
      });
          marker.showInfoWindow();
      
    });
  }
  onMapReady() {
    console.log('map is ready!');
  }
  saveLocation(){
    this.viewCtrl.dismiss();
  }
}
