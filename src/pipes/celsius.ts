import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Celsius pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'celsius'
})
@Injectable()
export class Celsius {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    return (+value - 32) * 5 / 9.0;
  }
}
