import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

//import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { BookServicePage } from '../book-service/book-service';
import { BookingsPage } from '../bookings/bookings';
import { LocationPickPage } from '../location-pick/location-pick';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = BookServicePage;
  tab5Root: any = BookingsPage;
  tab6Root: any = LocationPickPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
