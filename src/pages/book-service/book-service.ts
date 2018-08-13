import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,
   ActionSheetController,AlertController,ModalController, ToastController } from 'ionic-angular';

import { BikeDataProvider } from '../../providers/bike-data/bike-data';
import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';
import { BikesModalPage } from '../bikes-modal/bikes-modal';
import { LocationPickPage } from '../location-pick/location-pick';
import { BookingService } from '../../models/booking-service-model';

/**
 * Generated class for the BookServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})
export class BookServicePage {
  bike:any;
  bikesList:any;
  myDate:any;
  bookingService:BookingService;
  location:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
    public actionsheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public bikeData:BikeDataProvider,public bikeService:BikeServiceDataProvider,
    public modalCtrl: ModalController,public bOOKINGSERVICE:BookingService,
    public toastCtrl: ToastController) {
      
      this.getBikes();
  }
  getBikes(){
    this.bikeData.getBikes().subscribe((data: any) => {
      this.bikesList = data;
    });
  }
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            this.bike='SAMARAUI';
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openModal(){
    const bikeModal = this.modalCtrl.create(BikesModalPage);
    bikeModal.present();

    bikeModal.onDidDismiss((data) => {
      console.log(data);
      this.bike=data;
    });
  }
  
  selectLocation(){
    const locationModal = this.modalCtrl.create(LocationPickPage);
    locationModal.present();

    locationModal.onDidDismiss((data) => {
      console.log(data);
      this.location=data;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookServicePage');
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter BookServicePage');
    this.bike=[];
      this.myDate='';
  }
  service:any;
  
  bookNow(){
    
    if(this.bike&&this.myDate){

      this.bOOKINGSERVICE.BIKEID=this.bike.ID;
      this.bOOKINGSERVICE.PICKUPTIME=this.myDate;
      this.bOOKINGSERVICE.SERVICESTATUS='In-process';
      this.bOOKINGSERVICE.USERID=1;
      this.bOOKINGSERVICE.ID=0;
      this.bOOKINGSERVICE.STATUS='Y';
      this.bOOKINGSERVICE.DELIVEREDON=null;


      this.service={
          BIKEID:this.bike.ID,
          PICKUPTIME:this.myDate,
          SERVICESTATUS:'In-process',
          USERID:1,
          ID:0,
          STATUS:'Y',
          DELIVEREDON:null
      };
this.bikeService.bookService(this.service).subscribe(res=>{
  console.log('Booked successfully',res);
  const toast = this.toastCtrl.create({
    message: 'Booking success, We will pickup your bike on specified time',
    duration: 3000,
    position:'top'
  });
  toast.present();
  //this.navCtrl.push(Bo)
});
    }else{
      const alert = this.alertCtrl.create({
        title: 'BosH Bike Service',
        subTitle: '<b>Please fill all details</b>',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

}
