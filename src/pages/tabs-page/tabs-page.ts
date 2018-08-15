import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

//import { AboutPage } from '../about/about';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { BookServicePage } from '../book-service/book-service';
import { BookingsPage } from '../bookings/bookings';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab4Root: any = BookServicePage;
  tab5Root: any = BookingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
