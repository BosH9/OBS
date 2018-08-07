import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';

/**
 * Generated class for the BookingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {
  order:string='details';
  bookingServiceId:number=0;
  booking:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public bikeService:BikeServiceDataProvider) {
    
  }
  
ionViewWillEnter(){
  this.bookingServiceId=this.navParams.get('BookingServiceId');
    this.bikeService.getBookingServiceById(this.bookingServiceId).subscribe(x=>{
      this.booking=x;
      console.log(this.booking);
    });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingDetailsPage');
  }

}
