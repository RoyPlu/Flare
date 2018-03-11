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

  countryName: string;
  cityName: string;

  is_traveling: boolean;

  distance_filter: number;

  constructor(private service: TinderService) { }

  ngOnInit() {
    this.getUserTraveling();
    this.getUserLocation();
    //this.getUserTravelLocation();
  }

  getUserTraveling(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data);
      this.is_traveling = data.data.travel.is_traveling;
    })
  }

  getUserTravelLocation() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data);
      this.is_traveling = data.data.travel.is_traveling;

      if (this.is_traveling == true) {

        this.lat = data.data.travel.travel_pos.lat;
        this.lon = data.data.travel.travel_pos.lon;

        this.cityName = data.data.travel.travel_location_info[0].locality.long_name;
        this.countryName = data.data.travel.travel_location_info[0].country.long_name;

        console.log(this.countryName);

      } else {
        console.log("Not traveling");
        this.is_traveling = false;
      }
    })
  }

  getUserLocation() {
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.lat = data.pos.lat;
      this.lon = data.pos.lon;
      this.countryName = data.pos_info.country.name;
      this.cityName = null;
      this.distance_filter = (data.distance_filter * 1000 * 1.609344);
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

    this.is_traveling = false;

    this.getUserLocation();
  }

  changeTinderPassportLocation() {
    this.service.changePassportLocation(this.lat, this.lon).subscribe(data => {
      console.log(data);
    })

    this.is_traveling = true;
  }

}
