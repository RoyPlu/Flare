import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { TinderService } from '../services/tinder.service';

@Component({
  selector: 'app-profilelocation',
  templateUrl: './profilelocation.component.html',
  styleUrls: ['./profilelocation.component.css']
})
export class ProfileLocationComponent implements OnInit {

  @ViewChild(AgmMap)
  public agmMap: AgmMap

  lat: number;
  lon: number;

  @Input() distanceFromUser: number;

  constructor(private service: TinderService) { }

  ngOnInit() {
  }


  refreshMap() {
    this.getUserLocation();
    this.agmMap.triggerResize();
  }

  getUserLocation() {
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.lat = data.pos.lat;
      this.lon = data.pos.lon;
    })
  }
}
