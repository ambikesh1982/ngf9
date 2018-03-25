import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';
import { GeolocationService } from '../../../core/geolocation.service';

const gmapApiKey = 'AIzaSyD2f1CqoyF3XhEuIPBXidqfXWTKPFyueIY';
const gmapURL = 'https://maps.googleapis.com/maps/api/js?key=' + gmapApiKey + '&libraries=places';

import { } from 'googlemaps';


@Component({
  selector: 'app-auto-address',
  templateUrl: './auto-address.component.html',
  styleUrls: ['./auto-address.component.scss']
})

export class AutoAddressComponent implements AfterViewInit, OnInit {

  // private map: google.maps.Map;
  // private marker: google.maps.Marker;
  // private center: google.maps.LatLng;

  private map: any;
  private marker: any;
  private center: any;

  @Input() locationFromNavigator: { lat: number, lng: number };
  @Output() UserCoordsFromAutoComplete = new EventEmitter<{ address: string, lat: number, lng: number }>();

  @ViewChild('addessSearch') searchElm: ElementRef;
  @ViewChild('mapElement') mapElm: ElementRef;

  constructor(
    private load: ScriptLoadService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    console.log('Location set form parent component: ', this.locationFromNavigator);
  }

  ngAfterViewInit() {
    if (this.locationFromNavigator) {
      this.load.loadScript(gmapURL, 'gmap', () => {
        this.center = new google.maps.LatLng(
          this.locationFromNavigator.lat,
          this.locationFromNavigator.lng);

        // Create map
        this.map = new google.maps.Map(this.mapElm.nativeElement, {
          zoom: 18,
          center: this.center,
          scrollwheel: false,
        });

        // Add Marker to current location detected by browser
        this.marker = new google.maps.Marker({
          position: this.center,
          map: this.map
        });

        // Add Google Autocomplete to list near by addresses
        const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement, { types: ['address'] });

        // bind autocomplete to search in near by locations only
        autoComplete.bindTo('bounds', this.map);

        // Listen to inputs field and find the places
        autoComplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            this.marker.setVisible(false);
            const place = autoComplete.getPlace();

            if (!place.geometry) {
              console.log('Unable to find a place!');
              return;
            }

            if (place.geometry.viewport) {
              this.map.fitBounds(place.geometry.viewport);
            } else {
              this.map.setCenter(place.geometry.location);
              this.map.setZoom(17);
            }

            this.marker.setPosition(place.geometry.location);
            this.marker.setVisible(true);

            // Emit autoComplete coords via @Output
            this.UserCoordsFromAutoComplete.emit({
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            });

          });
        });
      });
    }
  }

}
