import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

profiles: Profile[]
matchStatus: string;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getProfiles();
  }

  getProfiles(){
    this.service.getProfiles().subscribe(data => {
      console.log(data.data.results);
      this.profiles = data.data.results;
    })

    this.scrollToTop();
  }

  likeTinderProfile(id: string, s_number: string){
    this.service.likeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      if(data.match.following == true){
        this.matchStatus = "Yes!";
      } else {
        this.matchStatus = "No";
      }
      
    })
  }

  passTinderProfile(id: string, s_number: string){
    this.service.passProfile(id, s_number).subscribe(data => {
      console.log(data);
      if(data.status == 200){
        this.matchStatus = "Passed";
      }
    })
  }

  superlikeTinderProfile(id: string, s_number: string){
    this.service.superlikeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      if(data.match == true){
        this.matchStatus = "Yes!";
      } else {
        this.matchStatus = "No";
      }
      
    })
  }


  removeFromList(profile, status){
    console.log(status);
    let index = this.profiles.indexOf(profile);
    this.profiles.splice(index, 1)
  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }
}
