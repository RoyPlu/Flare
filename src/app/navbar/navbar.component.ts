import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Project Flare';

  constructor(private service: TinderService) { }

  ngOnInit(){
    
  }

}
