import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  lat: number;
  lon: number;
  is_traveling: boolean;

  constructor(private service: TinderService) { }

  ngOnInit() {
    this.getUserLocation();
    //this.getUserTravelLocation();
  }

  getUserTravelLocation() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data);
      this.is_traveling = data.data.travel.is_traveling;

      if (this.is_traveling == true) {

        this.lat = data.data.travel.travel_pos.lat;
        this.lon = data.data.travel.travel_pos.lon;

      } else {
        console.log("Not traveling");
      }
    })
  }

  getUserLocation() {
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.lat = data.pos.lat;
      this.lon = data.pos.lon;
    })
  }

  placeMarker($event) {
    console.log("latitude:" + $event.coords.lat);
    console.log("longtitude:" + $event.coords.lng);

    this.lat = $event.coords.lat;
    this.lon = $event.coords.lng;
  }

  resetTinderPassport() {
    this.service.resetPassport().subscribe(data => {
      console.log(data);
    })

    this.getUserLocation();
  }

  changeTinderPassportLocation() {
    this.service.changePassportLocation(this.lat, this.lon).subscribe(data => {
      console.log(data);
    })
  }

}
