import { Component,NgZone } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform,ModalController, ViewController  } from 'ionic-angular';
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
  address:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App,private _ngZone:NgZone) {
      
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
              // let address: any = [
              //   results[0].subThoroughfare || "",
              //   results[0].thoroughfare || "",
              //   results[0].locality || "",
              //   results[0].adminArea || "",
              //   results[0].postalCode || "",
              //   results[0].country || ""].join(", ");

                console.log(results[0].locale);
                console.log(results[0].adminArea);
                console.log(results[0].country);
                console.log(results[0].countryCode);
                console.log(results[0].extra.featureName);
                console.log(results[0].extra.lines);
                console.log(results[0].extra.permises);
                console.log(results[0].extra.phone);
                console.log(results[0].locality);
                console.log(results[0].postalCode);
                console.log(results[0].subAdminArea);
                console.log(results[0].subLocality);
                console.log(results[0].subThoroughfare);
                console.log(results[0].thoroughfare);
              //marker.setPosition(cameraPosition.target);
              //marker.setTitle(address);
              //marker.showInfoWindow();
              //this.address=address;
              this._ngZone.run(() => {
                this.address = results[0].extra.lines.join(',');
          });
            });


            // marker.setPosition(cameraPosition.target);
            // marker.setTitle(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
             console.log(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
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
