import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {WeatherLocation} from "../../interfaces/weather-location";
import {LocationsService} from "../../providers/locations-service";
import {GeocodeService} from "../../providers/geocode-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationsService: LocationsService,
              public geocodeService: GeocodeService, public alertCtrl: AlertController) {

    locationsService.getLocations().then(theResult => {
      this.locs = theResult;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
  }

  addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
        {
          name: 'title',
          placeholder: 'City name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();

  }

}
