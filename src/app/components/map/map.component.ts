import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoordinateService } from '../../services/coordinate.service';
import { takeWhile } from 'rxjs/operators';
import { ApiData } from '../../models/api-data';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  alive = true;

  google: any;

  locations = [];
  zoom: any;
  latitude = -1.2833;
  longitude = 36.8167;
  faCoffee = faCoffee;
  pointB: any;
  line: any;

  coordinates: Array<{ lat: number, lng: number }> = [];


  authData = {
    api_action: 'pull_fleet_locations',
    uid: 'devtest@demo.com',
    pwd: 'admin',
  };



  constructor(
    private coordinateService: CoordinateService,
  ) { }

  ngOnInit(): void {
    // this.initMap();
    this.displayCoordinates();
  }

  // tslint:disable-next-line:typedef
  displayCoordinates() {
    this.coordinateService.fetchCoordinate(this.authData)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (res: ApiData) => {
          this.zoom = 7;
          this.locations = res.data;
          res.data.forEach(e => {
            this.coordinates.push({ lat: e.latitude, lng: e.longitude });
          })
          this.initMap();
        },
      );
  }

  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 7,
        center: { lat: -1.2833, lng: 36.8167 },
        mapTypeId: "terrain",
      }
    );

    const flightPlanCoordinates = this.coordinates;
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(map);
  }

  // addMarker() {
  //
  // }

  //   for (var i = 0; i < a.length; i++) {
  //     if(i % 2 === 0) { // index is even
  //         ar.push(a[i]);
  //     }
  // }



  ngOnDestroy(): void {
    this.alive = false;
  }

}
