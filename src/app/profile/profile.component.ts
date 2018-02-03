import { Component, OnInit, Input } from '@angular/core';

import { Profile } from '../models/profile.model';
import { TinderService } from '../services/tinder.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

profile: Profile;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderProfile();
  }

  getTinderProfile(){
    this.service.getProfile().subscribe(data => {
      console.log(data);
      this.profile = data;
    })
  }
}
