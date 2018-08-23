import { Component,NgZone } from '@angular/core';
import { App, NavController, NavParams, Platform,ModalController, ViewController  } from 'ionic-angular';

import {
  LocationService,
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  MyLocation,
  Marker,
  GoogleMapsEvent,
  CameraPosition,
  LatLng,
  Geocoder,
  GeocoderResult
} from '@ionic-native/google-maps';

@Component({
  selector: 'g-map',
  templateUrl: 'g-map.html'
})
export class GMapComponent {

  map: GoogleMap;
  address:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App,private _ngZone:NgZone) {
      this.platform.ready().then(()=>{
        this.loadMap();
      });
  }

  ionViewDidEnter(){
    
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
        visible:true
      });
          marker.showInfoWindow();
      
          this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
            let cameraPosition: CameraPosition<LatLng> = params[0];
            
            Geocoder.geocode({
              "position": cameraPosition.target
            }).then((results: GeocoderResult[]) => {
              if (results.length == 0) {
                // Not found
                return null;
              }
             
              this._ngZone.run(() => {
                //this.address = results[0].extra.lines.join(',');
                this.address = results[0].extra.lines[0].substr(results[0].extra.lines[0].indexOf(",")+2,results[0].extra.lines[0].length);
          });
            });

            //console.log(marker.getPosition().lat +"-"+marker.getPosition().lng);
            console.log(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
            // marker.setPosition(cameraPosition.target);
            // marker.setTitle(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
             
          });
    });
  }
  onMapReady() {
    console.log('map is ready!');
  }
  saveLocation(){
    this.viewCtrl.dismiss();
  }

}
