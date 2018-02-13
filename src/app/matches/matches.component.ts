import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

matches: Match[];

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderMatches();
    //this.getUpdates();
  }

  getTinderMatches(){
    this.service.getMatches().subscribe(data => {
      console.log(data.data.matches);
      this.matches = data.data.matches;
    })
  }

  getUpdates(){
    this.service.getUpdates().subscribe(data => {
      console.log("TEST");
      console.log(data);
    })
  }

}
