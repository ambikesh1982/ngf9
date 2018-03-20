import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';

const googleMapsApiKey = 'AIzaSyD2f1CqoyF3XhEuIPBXidqfXWTKPFyueIY';
const googleMapsURL = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey + '&libraries=places';

@Component({
  selector: 'app-auto-address',
  templateUrl: './auto-address.component.html',
  styleUrls: ['./auto-address.component.scss']
})

export class AutoAddressComponent implements AfterViewInit, OnInit {

  private map: any;
  private marker: any;
  private coords: any;
  private initVal = '';
  myGeoCoordinates = { lat: 0, lng: 0 };
  mylat = 0.0;
  mylng = 0.0;

  @ViewChild('addessSearch') addressSearch: ElementRef;
  @ViewChild('mapElement') mapElm: ElementRef;

  constructor(private load: ScriptLoadService) { }

  ngOnInit() {
    // this.nearByGeoCodes = [{ lat: 0, lng: 0 }];
    }


  ngAfterViewInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.mylat = position.coords.latitude;
          this.mylng = position.coords.longitude;

          this.load.loadScript(googleMapsURL, 'gmap', () => {
            const gmaps = window['google']['maps'];
            console.log('Google maps', gmaps);
            const loc = new gmaps.LatLng(this.mylat, this.mylng);

            // this.coords = function (x, y) {
            //   return new gmaps.LatLng(x, y);
            // };

            // Create a map with user location at center.
            this.map = new gmaps.Map(this.mapElm.nativeElement, {
              zoom: 18,
              center: loc,
              scrollwheel: true,
            });

            // Add a marker to user location.
            this.marker = new gmaps.Marker({
              position: loc,
              map: this.map
            });

            // this.reverseGeoCoding(this.mylat, this.mylng);

          // console.log('My position is: ', this.myGeoCoordinates);
        });
    });
  }
  }

  // reverseGeoCoding(lattitude: number, longitude: number) {
  //   const ADDRESS = new gmaps.Geocode;
  //   const LATLNG = { lat: lattitude, lng: longitude };
  //   ADDRESS.geocode({ location: LATLNG }, (results, status) => {
  //     // results[0].address_components.forEach( (val) => {
  //     //   console.log(val.types[0], ' - ', val.short_name);
  //     // });
  //     // console.log(results);
  //     this.initVal = results[0].formatted_address;

  //   });
  // }

}
