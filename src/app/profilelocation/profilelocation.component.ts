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
  @Input() id: string;

  distanceFromUser2: number = 0;
  distanceFromUser3: number = 0;

  constructor(private service: TinderService) { }

  ngOnInit() {
  }


  refreshMap() {
    this.getUserLocation();
    this.agmMap.triggerResize();
    console.log(this.id);
  }

  getUserLocation() {
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.lat = data.pos.lat;
      this.lon = data.pos.lon;
    })
  }

  
  triangulateLocation(){
    console.log(this.id);
    this.triangulation();
  }

  triangulation() {
    
    setTimeout(() => {
      this.service.setUserLocation(this.lat + 0.1, this.lon).subscribe(data => {
        console.log(data);
  
      })
    },
      1000);
    

    setTimeout(() => {
      this.service.getProfile(this.id).subscribe(data => {
        console.log(data);

        this.distanceFromUser2 = data.results.distance_mi;

        

      })
    },
      2000);

    setTimeout(() => {
      this.service.setUserLocation(this.lat, this.lon + 0.1).subscribe(data => {
        console.log(data);
        
      })
    },
      3000);

      setTimeout(() => {
        this.service.getProfile(this.id).subscribe(data => {
          console.log(data);
  
          this.distanceFromUser3 = data.results.distance_mi;
  
        })
      },
        4000);

        setTimeout(() => {
          this.service.setUserLocation(this.lat, this.lon).subscribe(data => {
            console.log(data);
            
          })
        },
          5000);

  }
}
