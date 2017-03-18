import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WeatherLocation} from "../../interfaces/weather-location";
import {LocationsService} from "../../providers/locations-service";

/*
  Generated class for the Locations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationsService: LocationsService) {
    locationsService.getLocations().then(theResult => {
      this.locs = theResult;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }
  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
  }

  addLocation() {
    console.log('addLocation');
  }

}
