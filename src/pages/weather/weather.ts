import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Refresher} from 'ionic-angular';
import {WeatherService} from '../../providers/weather-service';
import {Geolocation} from 'ionic-native';
import {CurrentLoc} from '../../interfaces/current-loc';

/*
 Generated class for the Weather page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController; // not needed at all
  refresher: Refresher; // not needed at all
  currentLoc: CurrentLoc = {lat: 0, lon: 0};
  pageTitle: string = 'Current Location';

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: WeatherService, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Loading weather data..."
    });
    loader.present();

    let loc = navParams.get('geoloc') || {lat: 49.2827, lon: -123.1207}; // Geolocation hardly can work
    if (loc !== undefined) {
      this.currentLoc = loc;
      this.pageTitle = navParams.get('title');
      weatherService.getWeather(this.currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        loader.dismiss();
      });
    } else {
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ', pos.coords.latitude, ', lon: ', pos.coords.longitude);
        this.currentLoc.lat = pos.coords.latitude;
        this.currentLoc.lon = pos.coords.longitude;
        this.currentLoc.timestamp = pos.timestamp;
        return this.currentLoc;
      }).then(currentLoc => {
        weatherService.getWeather(currentLoc).then(theResult => {
          this.theWeather = theResult;
          this.currentData = this.theWeather.currently;
          this.daily = this.theWeather.daily;
          loader.dismiss();
        });
      });
    }
  }

  doRefresh(refresher) {
    var interval = Date.now() - this.currentLoc.timestamp;
    console.log("ellipse time: ", interval/1000 , 's');
    if(interval > 10000) {
      this.weatherService.getWeather(this.currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        refresher.complete();
      });
    } else {
      console.log('no refresh');
      refresher.complete();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

}
