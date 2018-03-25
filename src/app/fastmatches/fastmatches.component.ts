import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-fast-matches',
  templateUrl: './fastmatches.component.html',
  styleUrls: ['./fastmatches.component.css']
})
export class FastMatchesComponent implements OnInit {

fastmatches: Match[];
token: string = null;

totalMatches: string[];
totalMatchesNumber: number;

pageNumber: number = 0;

loadingIndicator;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderFastMatches();
    //this.getTotalAmountOfMatches();
    //this.getUpdates();

    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
  }

  getTinderFastMatches(){
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.getFastMatches(this.token).subscribe(data => {
      console.log(data.data.results);
      this.fastmatches = data.data.results;
      this.token = data.data.next_page_token;

      this.pageNumber += 1;
      
      console.log(this.pageNumber);
      //console.log(this.token);
    })

    this.scrollToTop();

    setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      1500);
  }

  removeFromList(profile, status){
    console.log(status);
    let index = this.fastmatches.indexOf(profile);
    this.fastmatches.splice(index, 1)
  }

  getUpdates(){
    this.service.getUpdates().subscribe(data => {
      console.log("TEST");
      console.log(data);
    })
  }

  openImage(url: string){
    window.open(url, "Project Flare" , "menubar=no,location=no,resizable=no,scrollbars=no,status=yes,width=750,height=750");
  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }

  findOnFacebook(name: string, teaser: string) {
    window.open('https://www.facebook.com/search/people/?q=' + name + '%20' + teaser);
  }

  findOnInstagram(username: string) {
    window.open('https://www.instagram.com/' + username);
  }

}
