import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {
  myLat: number;
  myLong: number;

  constructor(public platform: Platform, public nav: NavController, private geolocation: Geolocation) { }

  ngOnInit() {
    this.platform.ready().then( () => {
      this.loadMap();
    });
  }

  currentPlace() {

    this.geolocation.getCurrentPosition().then((resp) => {

      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;
      this.platform.ready().then( () => {
        this.loadMap();
      });
      console.log(this.myLat);
      console.log(this.myLong);

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  loadMap() {
    const map = GoogleMaps.create( 'map' );

    map.one( GoogleMapsEvent.MAP_READY ).then( ( data: any ) => {

      const coordinates: LatLng = new LatLng( 36.7783, 119.4179 );

      const position = {
        target: coordinates,
        zoom: 14
      };

      map.animateCamera( position );

      const markerOptions: MarkerOptions = {
        position: coordinates,
        title: 'Hello California'
      };

      const marker = map.addMarker( markerOptions )
      .then( ( marker: Marker ) => {
        marker.showInfoWindow();
      });
    })
  }

}
