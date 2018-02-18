import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {

  lat: number = 40.712775;
  lng: number = -74.005973;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getUserLocation();
  }

  getUserLocation(){
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
    })
  }

  placeMarker($event){
    console.log("latitude:" + $event.coords.lat);
    console.log("longtitude:" + $event.coords.lng);

    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  resetTinderPassport(){
    this.service.resetPassport().subscribe(data => {
        console.log(data);
      })
  }

  changeTinderPassportLocation(){
    this.service.changePassportLocation().subscribe(data => {
      console.log(data);
    })
  }

}
