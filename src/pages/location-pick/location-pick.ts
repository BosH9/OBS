import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform,ModalController,
         ViewController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';

@IonicPage()
@Component({
  selector: 'page-location-pick',
  templateUrl: 'location-pick.html',
})
export class LocationPickPage {
  address:string;
  userAddess:any = {};

  addressForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private platform: Platform,public modalCtrl: ModalController,public viewCtrl: ViewController,
     public app: App, public fb:FormBuilder, public service:BikeServiceDataProvider) {
      this.userAddess={};

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
    this.service.saveUserAddress(this.addressForm.value)
                .subscribe((res)=>{
                  console.log(res);
                  this.viewCtrl.dismiss();
                });
    
  }
  updateLocation($event){
    this.address=$event;
    this.addressForm.patchValue({location:$event});
  }
  validate(){
  }
}
