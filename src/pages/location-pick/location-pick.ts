import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform,ModalController,
         ViewController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';

import { USERADDRESS } from '../../models/user-addess';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App, public fb:FormBuilder, public service:BikeServiceDataProvider,
     public userAddess:USERADDRESS) {
      
      this.addressForm = this.fb.group({
        location: ['',Validators.required],
        addressType: ['other', Validators.required],
        houseNo: ['', Validators.required],
        landmark: ['', Validators.required]
      });
      console.log(this.addressForm.value);
      
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
}
