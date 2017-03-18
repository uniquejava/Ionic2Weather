import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {WeatherPage} from '../pages/weather/weather';
import {LocationsPage} from '../pages/locations/locations';
import {WeatherService} from "../providers/weather-service";
import {WeatherLocation} from "../interfaces/weather-location";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<WeatherLocation>;

  constructor(public platform: Platform, public weatherService: WeatherService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Edit Locations', component: LocationsPage, icon: 'create'},
      {title: 'Current Location', component: WeatherPage, icon: 'pin'},
      {title: 'Cape Canaveral, FL', component: WeatherPage, icon: 'pin', loc: {lat: 28.3922, lon: -80.6077}},
      {title: 'San Francisco, CA', component: WeatherPage, icon: 'pin', loc: {lat: 37.7749, lon: -122.4194}},
      {title: 'Vancouver, BC', component: WeatherPage, icon: 'pin', loc: {lat: 49.2827, lon: -123.1207}}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc')) {
      this.nav.setRoot(page.component, {geoloc: page.loc, title: page.title});
    } else {
      this.nav.setRoot(page.component);
    }

  }
}
