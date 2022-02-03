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

  exampleStringArray: string[] = null;
  user: User;

  constructor(private service: TinderService) { }

  ngOnInit() {
    //this.getTinderUser();
    this.getTinderUserV2();
    console.log(this.user);
  }

  getTinderUser() {
    this.service.getUserProfile().subscribe(data => {
      this.user = data;
    })
  }

  getTinderUserV2() {
    this.service.getUserProfileV2().subscribe(data => {
      this.user = data.data;
    })
  }

  enableSmartPhotos() {

    if (this.user.photo_optimizer_enabled == false) {
      this.user.photo_optimizer_enabled = true;
    } else {
      this.user.photo_optimizer_enabled = false;
    }

    this.service.enableSmartPhotos(this.user.user).subscribe(user => {
      this.user.photo_optimizer_enabled != this.user.photo_optimizer_enabled;
    })
  }

}
