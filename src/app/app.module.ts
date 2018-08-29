import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { BookServicePage } from '../pages/book-service/book-service';
import { BikesModalPage } from '../pages/bikes-modal/bikes-modal';
import { BookingsPage } from '../pages/bookings/bookings';
import { BookingDetailsPage } from '../pages/booking-details/booking-details';
import { LocationPickPage } from '../pages/location-pick/location-pick';
import { LocationPickModalPage } from '../pages/location-pick-modal/location-pick-modal';

import { GMapComponent } from '../components/g-map/g-map';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { BikeDataProvider } from '../providers/bike-data/bike-data';
import { BikeServiceDataProvider } from '../providers/bike-service-data/bike-service-data';


import { BookingService } from '../models/booking-service-model';
import { USERADDRESS } from '../models/user-addess';

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    BookServicePage,
    BikesModalPage,
    BookingsPage,
    BookingDetailsPage,
    LocationPickPage,
    LocationPickModalPage,
    GMapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(ConferenceApp, {tabsHideOnSubPages: true,scrollPadding: false,scrollAssist: true, autoFocusAssist: false}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: BookServicePage, name: 'BookServicePage', segment: 'bookService' },
        { component: BookingsPage, name: 'BookingsPage', segment: 'bookings' },
        { component: LocationPickPage, name: 'LocationPickPage', segment: 'locationPick' },
        { component: LocationPickModalPage, name: 'LocationPickModalPage', segment: 'locationPickModal' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    BookServicePage,
    BikesModalPage,
    BookingsPage,
    BookingDetailsPage,
    LocationPickPage,
    LocationPickModalPage,
    GMapComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    BikeDataProvider,
    HttpModule,
    HttpClientModule,
    BikeServiceDataProvider,
    BookingService,
    USERADDRESS
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
