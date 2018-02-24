import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models/user.model';
import { TinderService } from '../services/tinder.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

user: User;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderUser();
    this.getTinderUserV2();
  }

  getTinderUser(){
    this.service.getUserProfile().subscribe(data => {
      console.log(data);
      this.user = data;
    })
  }

  getTinderUserV2(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data);
      this.user = data;
    })
  }

  enableSmartPhotos(){

    if(this.user.photo_optimizer_enabled == false){
      this.user.photo_optimizer_enabled = true;
    } else {
      this.user.photo_optimizer_enabled = false;
    }

    this.service.enableSmartPhotos(this.user).subscribe(user => {
      this.user.photo_optimizer_enabled != this.user.photo_optimizer_enabled;
      console.log(this.user.photo_optimizer_enabled);
    })
  }

}
