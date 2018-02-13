import { Component, OnInit, Input } from '@angular/core';

import { Profile } from '../models/profile.model';
import { TinderService } from '../services/tinder.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

profile: Profile;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderUser();
  }

  getTinderUser(){
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.profile = data;
    })
  }

  enableSmartPhotos(){

    if(this.profile.photo_optimizer_enabled == false){
      this.profile.photo_optimizer_enabled = true;
    } else {
      this.profile.photo_optimizer_enabled = false;
    }

    this.service.enableSmartPhotos(this.profile).subscribe(profile => {
      this.profile.photo_optimizer_enabled != this.profile.photo_optimizer_enabled;
      console.log(this.profile.photo_optimizer_enabled);
    })
  }

}
