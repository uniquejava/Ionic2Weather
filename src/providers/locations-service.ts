import {Injectable} from '@angular/core';
import {WeatherLocation} from '../interfaces/weather-location';
import {WeatherPage} from '../pages/weather/weather';

@Injectable()
export class LocationsService {
  locations: Array<WeatherLocation>;

  constructor() {
    this.locations = [
      {title: 'Cape Canaveral, FL', component: WeatherPage, icon: 'pin', loc: {lat: 28.3922, lon: -80.6077}},
      {title: 'San Francisco, CA', component: WeatherPage, icon: 'pin', loc: {lat: 37.7749, lon: -122.4194}},
      {title: 'Vancouver, BC', component: WeatherPage, icon: 'pin', loc: {lat: 49.2827, lon: -123.1207}}
    ];
  }

  getLocations() {
    return Promise.resolve(this.locations);
  }

  removeLocation(loc: WeatherLocation) {
    let index = this.locations.indexOf(loc);
    if(index != -1) {
      this.locations.splice(index, 1);
    }
  }

  addLocation(loc: WeatherLocation) {
    this.locations.push(loc);
  }
}
