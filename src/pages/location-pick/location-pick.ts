import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform,ModalController,
         ViewController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';
import { FindDistanceProvider } from '../../providers/find-distance/find-distance';

import { USERADDRESS } from '../../models/user-addess';

import{ ILatLng, Spherical, LatLng } from '@ionic-native/google-maps';




@IonicPage()
@Component({
  selector: 'page-location-pick',
  templateUrl: 'location-pick.html',
})
export class LocationPickPage {
  address:string;
  latLng:string;

  addressForm:FormGroup;
  validation:string;

  workClass:boolean=false;
  homeClass:boolean=false;
  otherClass:boolean=false;
  
  userAddesses:any;
  distances:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App, public fb:FormBuilder, public service:BikeServiceDataProvider,
     public userAddess:USERADDRESS, public fd:FindDistanceProvider) {
      
      this.addressForm = this.fb.group({
        location: ['',Validators.required],
        addressType: ['other', Validators.required],
        houseNo: ['', Validators.required],
        landmark: ['', Validators.required]
      });
      this.homeClass=false;
    this.workClass=false;
    this.otherClass=true;
      
    
      
    this.fd.getUserAddressByUserId(1).subscribe(x=>{
      this.userAddesses = x;
      this.userAddesses.forEach(element => {
        let source:ILatLng=new LatLng(0,0);
        let dest:ILatLng=new LatLng(0,0);
        if(element.LATLNG){
          let temp=element.LATLNG.split(',');
          source.lat=17.367821;
          source.lng=78.54011539999999;

          dest.lat= +temp[0];
          dest.lng= +temp[1];
          this.distances.push({'source':source,'dest':dest,'Distance':(Spherical.computeDistanceBetween(source, dest)*0.001)})
        }
      });
      console.log(JSON.stringify(this.distances));
    });
   
    

  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      //this.loadMap();
      
    });
  }
  ionViewDidLoad() {
    
  }
  ionViewWillUnload(){
    console.log('ionViewWillUnload');
    this.address="";
      console.log("address - "+this.address);
    //this.app.getRootNavs()[0].setRoot(BookServicePage);
    //this.app.getRootNav().setRoot(BookServicePage);
  }

 
  onMapReady() {
    console.log('map is ready!');
  }
  saveLocation(){
    if(this.addressForm.valid){
      this.userAddess.ADDRESS=this.addressForm.get('location').value;
      this.userAddess.ADDRESSTYPE=this.addressForm.get('addressType').value;
      this.userAddess.HOUSENUMBER=this.addressForm.get('houseNo').value;
      this.userAddess.LANDMARK=this.addressForm.get('landmark').value;
      this.userAddess.LATLNG=this.latLng;
      this.userAddess.STATUS="Y";
      this.userAddess.TIMESTAMP=new Date();
      this.userAddess.USERID=1;
      this.service.saveUserAddress(this.userAddess)
                  .subscribe((res)=>{
                    console.log(res);
                    this.viewCtrl.dismiss();
                  });
      
    }
    
    
  }
  updateLocation($event){
    this.address=$event.address;
    this.latLng=$event.latLng;
    this.addressForm.patchValue({location:$event.address});
    this.validate();
  }
  validate(){
    if(!this.addressForm.get('location').value){
      this.validation="ENTER LOCATION";
    } else if(!this.addressForm.get('houseNo').value){
      this.validation="ENTER HOUSE / FLAT NO.";
    } else if(!this.addressForm.get('landmark').value){
      this.validation="ENTER LANDMARK";
    }else 
    this.validation="";
  }
 
  saveAsLoc(home:boolean,work:boolean,other:boolean){
    this.homeClass=home;
    this.workClass=work;
    this.otherClass=other;
    let addType=home?'home':work?'work':'other';
    this.addressForm.patchValue({addressType:addType});
  }
}
