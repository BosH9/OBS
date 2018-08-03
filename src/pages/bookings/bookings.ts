import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BikeServiceDataProvider } from '../../providers/bike-service-data/bike-service-data';

/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  bookings:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bOOKINGSERVICE:BikeServiceDataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  }
ionViewWillEnter(){
    console.log('ionViewWillEnter BookingsPage');
    this.bOOKINGSERVICE.getBookings(1).subscribe(res=>{
      this.bookings=res;
    });
  }
}
