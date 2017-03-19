import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/catch'
import {CurrentLoc} from "../interfaces/current-loc";
// import {Observable} from "rxjs";

/*
 Generated class for the WeatherService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WeatherService {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  load(currentLoc: CurrentLoc) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    let requestUrl = '/api/forecast/' + currentLoc.lat + ',' + currentLoc.lon;
    return new Promise((resolve, reject) => {
      this.http.get(requestUrl)
        .timeout(5000)
        // .catch(e => {
        //   if (e.name === "TimeoutError") Observable.throw("Timeout has occurred");
        //   return Observable.throw(e);
        // })
        .map(res => res.json())
        .subscribe(
          data => {
            this.data = data;
            resolve(this.data);
          },
          error => {
            console.log("catch some error in observable.", error); // error
            reject(error);
          },
          () => console.log('yay') // success
        );
    })
  }

  getWeather(currentLoc: CurrentLoc) {
    this.data = null;
    return this.load(currentLoc).then(theResult => {
      return theResult;
    });
  }

}
