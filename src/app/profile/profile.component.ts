import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../models/profile.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    exampleStringArray: string[] = null;
    profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray);

    id: string;
    s_number: string;
    matchStatus: string = null;

    browserTitle: string;

    constructor(private titleService: Title, private route: ActivatedRoute, private service: TinderService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params) //log the entire params object
            console.log(params['id']) //log the value of id
            console.log(params['s_number'])

            this.id = params['id'];
            this.s_number = params['s_number'];
        });

        this.getProfile(this.id);
    }

    getProfile(id: string) {
        console.log(id);
        this.service.getProfile(id).subscribe(data => {
            console.log(data.results);
            this.profile = data.results;

            this.setTitle(this.profile.name);

        })
    }

    findOnFacebook(name: string, school: string) {
      window.open('https://www.facebook.com/search/people/?q=' + name + '%20' + school);
    }

    setTitle(browserTitle: string){
        this.titleService.setTitle( browserTitle );
    }

    likeTinderProfile() {
        this.service.likeProfile(this.id, this.s_number).subscribe(data => {
          console.log(data.match);
          if (data.match.following == true) {
            this.matchStatus = "Yes!";
            this.playNotification();
          } else {
            this.matchStatus = "No";
          }
    
        })
      }
    
      passTinderProfile() {
        this.service.passProfile(this.id, this.s_number).subscribe(data => {
          console.log(data);
          if (data.status == 200) {
            this.matchStatus = "Passed";
          }
        })
      }
    
      superlikeTinderProfile() {
        this.service.superlikeProfile(this.id, this.s_number).subscribe(data => {
          console.log(data.match);
          if (data.match == true) {
            this.matchStatus = "Yes!";
            this.playNotification();
          } else {
            this.matchStatus = "No";
          }
    
        })
      }

      playNotification() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/soft_notification.mp3";
        audio.load();
        audio.play();
      }

}
