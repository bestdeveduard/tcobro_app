import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { CommonService } from 'src/services/commonService';
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator/ngx";
import { GoogleMap, GoogleMaps, MyLocation, LatLngBounds, Marker, HtmlInfoWindow, Polyline } from '@ionic-native/google-maps';
import { HTTP } from '@ionic-native/http/ngx';
import { ActivatedRoute, Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.page.html',
  styleUrls: ['./promocode.page.scss'],
})
export class PromocodePage implements OnInit {

  // @Input() location;
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  map: any;
  address: string;

  source: any;
  destination: any;

  latitude: any;
  longitude: any;  
  latlong: any;

  example = [
    {name: 'China', lat: 35.998933, lon: 103.569447, count: '19.5 K', icon: 'assets/imgs/map_marker.png'},
    {name: 'Italy', lat: 41.895676, lon: 12.491359, count: '1 K', icon: 'assets/imgs/map_marker.png'},
    {name: 'Korea', lat: 37.273909, lon: 127.073559, count: '0.7 K', icon: 'assets/imgs/map_marker.png'},//37.273909, 127.073559
    {name: 'Japan', lat: 36.100533, lon: 138.466256, count: '0.6 K', icon: 'assets/imgs/map_marker.png'},//36.100533, 138.466256
    {name: 'Australia', lat: -23.285773, lon: 133.553809, count: '0.2 K', icon: 'assets/imgs/map_marker.png'},//-23.285773, 133.553809
  ]

  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private comService: CommonService,
    public httpNative: HTTP,
    public launchNavigator: LaunchNavigator,
    private platform: Platform,
    private activeRoute: ActivatedRoute, private router: Router,
    private navCtrl: NavController
  ) { 
    activeRoute.queryParams.subscribe(param => {
      if (router.getCurrentNavigation().extras.state) {
        this.latlong = router.getCurrentNavigation().extras.state
      }
    })
  }

  ngOnInit() {
    console.log('location == ', this.latlong)
  }

  dismiss() {
    // this.modalController.dismiss();
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
        zoom: 17,
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

      this.getStartAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

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
    // this.geolocation.getCurrentPosition().then(geo => {
    //   let url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=" + geo.coords.latitude + "," + geo.coords.longitude + "&destination=" + this.latlong.lat + "," + this.latlong.long;
    //   window.open(url);
    // }).catch(err => {
    //   console.log("Error ");
    // })
    let options = {
      destinationName: this.latlong.customer,
      // start: [
      //   this.latitude, this.longitude
      // ],
      startName: 'My Location'
    }
    this.launchNavigator.navigate([
      this.latlong.lat,
      this.latlong.long
    ]).then(data => {

    });
  }

  ///////////////////////////////////////


  // ngAfterViewInit_old(): void {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.latitude = resp.coords.latitude;
  //     this.longitude = resp.coords.longitude;
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 3
  //     });
  //     /*location object*/
  //     const pos = {
  //       lat: this.latitude,
  //       lng: this.longitude
  //     };
  //     this.map.setCenter(pos);
  //     const icon = {
  //       url: 'assets/imgs/map_marker.png', // image url
  //       scaledSize: new google.maps.Size(20, 50), // scaled size
  //     };
  //     // const marker = new google.maps.Marker({
  //     //   position: pos,
  //     //   map: map,
  //     //   title: 'Hello World!',        
  //     //   // icon: icon
  //     // });
  //     const contentString = '<div id="content">' +
  //       '<div id="siteNotice">' +
  //       '</div>' +
  //       '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
  //       '<div id="bodyContent">' +
  //       '<img src="assets/icon/user.png" width="200">' +
  //       '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //       'sandstone rock formation in the southern part of the ' +
  //       'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
  //       'south west of the nearest large town, Alice Springs; 450&#160;km ' +
  //       '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
  //       'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
  //       'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
  //       'Aboriginal people of the area. It has many springs, waterholes, ' +
  //       'rock caves and ancient paintings. Uluru is listed as a World ' +
  //       'Heritage Site.</p>' +
  //       '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  //       'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
  //       '(last visited June 22, 2009).</p>' +
  //       '</div>' +
  //       '</div>';
  //     const infowindow = new google.maps.InfoWindow({
  //       content: contentString,
  //       maxWidth: 400
  //     });
  //     // marker.addListener('click', function () {
  //     //   infowindow.open(map, marker);
  //     // });      
  //     this.addMarker()
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // addMarker() {
  //   this.example.forEach((data: any) => {
  //     var canvas, context;

  //     canvas = document.createElement("canvas");
  //     canvas.width = 70;
  //     canvas.height = 35;
  //     var x = 1, y = 1, width = 65, height = 30, radius = 18, stroke = false;
  //     context = canvas.getContext("2d");
  //     if (typeof stroke == "undefined") {
  //       stroke = true;
  //     }
  //     if (typeof radius == "undefined") {
  //       radius = 18;
  //     }
  //     context.beginPath();
  //     context.moveTo(x + radius, y);
  //     context.lineTo(x + width - radius, y);
  //     context.quadraticCurveTo(x + width, y, x + width, y + radius);
  //     context.lineTo(x + width, y + height - radius);
  //     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  //     context.lineTo(x + radius, y + height);
  //     context.quadraticCurveTo(x, y + height, x, y + height);
  //     context.lineTo(x, y + radius);
  //     context.quadraticCurveTo(x, y, x + radius, y);
  //     context.fillStyle = "#8202de";
  //     context.fill();
  //     context.closePath();
  //     if (stroke) {
  //       context.stroke();
  //     }
  //     context.lineWidth = 1;
  //     context.strokeStyle = "#8202de";
  //     context.font = "15px Arial";
  //     context.textAlign = "center";
  //     context.fillStyle = "white";
  //     context.fillText(data.count, 30, 21);

  //     var pngUrl = canvas.toDataURL("image/jpg");      
      
  //     let marker2 = new google.maps.Marker({
  //       icon: pngUrl,
  //       map: this.map,
  //       position: { lat: data.lat, lng: data.lon }
  //     });
  //     marker2.setZIndex(1);
  //   });
  // }

  // loadMapOn() {
    
  // }

 
}
