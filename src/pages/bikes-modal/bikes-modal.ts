import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController } from 'ionic-angular';
import { BikeDataProvider } from '../../providers/bike-data/bike-data';

/**
 * Generated class for the BikesModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bikes-modal',
  templateUrl: 'bikes-modal.html',
})
export class BikesModalPage {
  bikesList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public bikeData:BikeDataProvider,public modalCtrl: ModalController,public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikesModalPage');
    
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter BikesModalPage');
    this.getBikes();
  }
  getBikes(){
    this.bikeData.getBikes().subscribe((data: any) => {
      this.bikesList = data;
    });
  }
  selectBike(bike){
    //console.log(bike);
    this.viewCtrl.dismiss(bike);
  }
}
