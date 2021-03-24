import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/services/commonService';

declare var google;

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.page.html',
  styleUrls: ['./show-map.page.scss'],
})
export class ShowMapPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  map: any;
  address: string;
  marker: any;
  source: any;
  destination: any;

  latitude: any;
  longitude: any;  
  latlong: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private comService: CommonService,
    public httpNative: HTTP,
    public launchNavigator: LaunchNavigator,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  ngAfterViewInit() {
    this.loadMap()
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {      
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 12,
        center: latLng,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
      });
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.addListener('directions_changed', function () {
        this.directionsDisplay.getDirections();
      });

      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.map.getCenter(),
        draggable: true
      });
      this.marker.setMap(this.map);

      let thisObj = this;
      this.map.addListener('click', function (e) {
        thisObj.marker.setPosition(e.latLng);
      });

      // this.getStartAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getStartAddressFromCoords(lattitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.source = "";
        let responseAddress = [];
        console.log("start result === : ", result)
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.source += value + ", ";
        }
        this.source = this.source.slice(0, -2);

        this.getEndAddressFromCoords(this.latlong.lat, this.latlong.long);
      })
      .catch((error: any) => {
        this.source = "Address Not Available!";
      });
  }

  getEndAddressFromCoords(lattitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.destination = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.destination += value + ", ";
        }
        this.destination = this.destination.slice(0, -2);

        this.calculateAndDisplayRoute()
      })
      .catch((error: any) => {
        this.destination = "Address Not Available!";
      });
  }

  calculateAndDisplayRoute() {
    const that = this;
    this.directionsService.route({
      origin: this.source,
      destination: this.destination,
      travelMode: 'DRIVING',
      avoidTolls: false,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      optimizeWaypoints: false,
      provideRouteAlternatives: true,
      avoidFerries: false,
      avoidHighways: true
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        this.comService.presentAlert('', 'Directions request failed due to ' + status)
      }
    });
  }

  getDirection() {
    console.log("call");    
    let options = {
      destinationName: this.latlong.customer,      
      startName: 'My Location'
    }
    this.launchNavigator.navigate([
      this.latlong.lat,
      this.latlong.long
    ]).then(data => {
    });
  }

}
