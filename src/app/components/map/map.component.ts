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
  coordinates = [];
  zoom: any;
  latitude = -1.2833;
  longitude = 36.8167;
  faCoffee = faCoffee;
  pointA = {
    lat: '',
    lng: '',
  };
  pointB: any;
  line: any;

  authData = {
    api_action: 'pull_fleet_locations',
    uid: 'devtest@demo.com',
    pwd: 'admin',
  };



  constructor(
    private coordinateService: CoordinateService,
  ) { }

  ngOnInit(): void {
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
            this.pointA.lat = e.latitude;
            this.pointA.lng = e.latitude;
            this.coordinates.push(this.pointA);
          })
          // this.pointA = this.coordinates[1];
          // this.pointB = this.coordinates[10];
          // this.line = new google.maps.Polyline({path: [this.pointA, this.pointB]});
          // console.log(this.coordinates);
          // this.initMap();
        },
      );
  }

//   initMap(): void {
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       zoom: 7,
//       center: { lat: -1.2833, lng: 36.8167 },
//       mapTypeId: "terrain",
//     }
//   );
//
//   const flightPlanCoordinates = this.coordinates;
//   const flightPath = new google.maps.Polyline({
//     path: flightPlanCoordinates,
//     geodesic: true,
//     strokeColor: "#FF0000",
//     strokeOpacity: 1.0,
//     strokeWeight: 2,
//   });
//
//   flightPath.setMap(map);
// }

// addMarker() {
//
// }


  ngOnDestroy(): void {
    this.alive = false;
  }

}
