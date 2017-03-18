Ionic 2 App Base
=====================

This is the base template for Ionic 2 starter apps.

## Using this project

You'll need the Ionic CLI with support for v2 apps:

```bash
$ npm install -g ionic
```

Then run:

```bash
$ ionic start myApp
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/docs/v2/getting-started/) page.

## add two pages and two providers
```bash
➜ ionic g page weather
➜ ionic g page locations
➜ ionic g provider WeatherService
➜ ionic g provider GeocodeService


```
### strange error
Code
```html
<ion-col width-33>
  {{daily.data[0].temperatureMax | number:'.0-0'}}<br>
  {{daily.data[0].temperatureMin | number:'.0-0'}}
</ion-col>

```
Error:
```
Runtime Error
Error in ./WeatherPage class WeatherPage - inline template:21:24 
caused by: Cannot read property '0' of undefined

```


Solution:

```html
{{ daily.data ? (daily.data[0].temperatureMax | number: '.0-0') : '' }}<br>
```

或者加上 `<ion-grid *ngIf="daily.data != undefined">`


see [here in stackoverflow][1]

## TODO
加个CelsiusPipe


[1]:http://stackoverflow.com/questions/35768768/angular2-using-elvis-operator-on-object-key-with-forward-slash?rq=1
