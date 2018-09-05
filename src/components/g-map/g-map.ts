import { Component,NgZone,ViewChild, Output, EventEmitter } from '@angular/core';
import { App, NavController, NavParams, Platform,ModalController, ViewController,Content  } from 'ionic-angular';

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
  GeocoderResult,
  Spherical
} from '@ionic-native/google-maps';

@Component({
  selector: 'g-map',
  templateUrl: 'g-map.html'
})
export class GMapComponent {

  map: GoogleMap;
  address:string;
  lngLat:any;
  myPosition:any;

  @Output() change: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(Content) content: Content; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App,private _ngZone:NgZone) {
      this.platform.ready().then(()=>{
        this.loadMap();
      });
  }

  ionViewWillEnter() {
    this.content.resize();
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
      this.lngLat=myLocation.latLng;
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
        visible:false
      });
          marker.showInfoWindow();

          this.map.on(GoogleMapsEvent.CAMERA_MOVE_START).subscribe(()=>{
            this.change.emit({address:"",latLng:""});
          });
      
          this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
            //this.change.emit({address:"",latLng:""});
            let cameraPosition: CameraPosition<LatLng> = params[0];
            
            Geocoder.geocode({
              "position": cameraPosition.target
            }).then((results: GeocoderResult[]) => {
              if (results.length == 0) {
                // Not found
                console.log('not found');
                return null;
              }
             
              this._ngZone.run(() => {
                console.log(results[0].extra.lines.toString());
                console.log("Distance: "+Spherical.computeDistanceBetween(this.myPosition, cameraPosition.target));
                let xx=results[0].extra.lines[0].split(',');
                let place=xx.length==9?xx[5]:xx.length==8?xx[4]: xx.length==7?xx[3]:xx.length==6?xx[2]:xx.length==5?xx[1]:xx[0];
                console.log(place);
                
                this.address = results[0].extra.lines[0].substr(results[0].extra.lines[0].indexOf(",")+2,results[0].extra.lines[0].length);
                this.change.emit({address:this.address,latLng:cameraPosition.target.lat+','+cameraPosition.target.lng});
          });
            });

            


            //console.log(marker.getPosition().lat +"-"+marker.getPosition().lng);
            console.log(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
            // marker.setPosition(cameraPosition.target);
            // marker.setTitle(cameraPosition.target.lat+' - '+cameraPosition.target.lng);
             
          });
    });
  }
  onMapReady(this) {
    console.log('map is ready!');
    Geocoder.geocode({
      "position": this.lngLat
    }).then((results: GeocoderResult[]) => {
      if (results.length == 0) {
        // Not found
        console.log('not found');
        console.log(this.lngLat);
        console.log(this.lngLat.lat + " - "+ this.lngLat.lng);
        return null;
      }
     
      this._ngZone.run(() => {
        //this.address = results[0].extra.lines.join(',');
        this.myPosition=this.lngLat;
        this.address = results[0].extra.lines[0].substr(results[0].extra.lines[0].indexOf(",")+2,results[0].extra.lines[0].length);
        this.change.emit({address:this.address,latLng: results[0].position.lat+','+results[0].position.lng});
  });
    });
  }
  saveLocation(){
    this.viewCtrl.dismiss();
  }

}
