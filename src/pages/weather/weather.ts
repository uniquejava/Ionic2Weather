import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import {WeatherService} from '../../providers/weather-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: WeatherService, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Loading weather data...",
      duration: 3000
    });
    loader.present();
    this.weatherService.getWeather().then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

}
