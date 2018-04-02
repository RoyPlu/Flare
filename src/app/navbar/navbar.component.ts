import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Project Flare';

  ProfilePic: string = "assets/profile-placeholder.jpg";

  constructor(private service: TinderService, private router: Router) { }

  ngOnInit(){
    this.getTinderUserV2();
  }

  getTinderUserV2(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.user);
      this.ProfilePic = data.data.user.photos[0].processedFiles[3].url;
    })
  }

  goToUser(){
    this.router.navigate(['/user']);
  }

}
