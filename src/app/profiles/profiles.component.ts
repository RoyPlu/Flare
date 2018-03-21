import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AgmMap } from '@agm/core';
import { TinderService } from '../services/tinder.service';
import { Profile } from '../models/profile.model';
import { Match } from '../models/match.model';

// jQuery Sign $
declare let $: any;

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  @ViewChild(AgmMap)
  public agmMap: AgmMap

  exampleStringArray: string[] = null;
  profiles: Profile[];
  profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray);
  matchStatus: string = null;


  match = { _id: "123", participants: ["0", "1"] } //: Match = new Match("12345", this.exampleStringArray);

  age_filter_min: number;
  age_filter_max: number;

  distance_filter: number;

  superlikesCounter: number;
  superlikesReset: Date;

  boostReset: Date;

  autolikeTime: number = 5;
  autolikeId;

  loadingIndicator;

  currentProfileId: string;

  @ViewChild('matchModal') matchModal: ElementRef;

  constructor(private service: TinderService) { }

  ngOnInit() {

    this.getProfiles();
    this.getAgeFilter();
    this.getDistanceFilter();
    this.getSuperlikes();
    this.getBoost();

    this.match.participants[1] = "123";

    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
  }

  getProfiles() {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.getProfiles().subscribe(data => {


      if (this.profiles == null) {
        console.log(data.data.results);
        this.profiles = data.data.results;
      } else {

        data.data.results.forEach(element => {
          this.profiles.push(element);

        });

        console.log(this.profiles);
      }

    })

    //this.scrollToTop();

    setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      1500);

  }

  seePossibleMatches(distance: number) {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.setDistanceFilter(distance).subscribe(data => {
      console.log("Changed distance filter to see possible matches");
      this.distance_filter = distance;
    })

    this.profiles = null;

    setTimeout(() => {
      this.getProfiles();
    },
      1000);

  }

  openImage(url: string) {
    window.open(url, "Project Flare", "menubar=no,location=no,resizable=no,scrollbars=no,status=yes,width=750,height=750");
  }

  getProfile(id: string) {
    console.log(id);
    this.service.getProfile(id).subscribe(data => {
      console.log(data.results);
      this.profile = data.results;
    })
  }

  findOnFacebook(name: string, teaser: string) {
    window.open('https://www.facebook.com/search/people/?q=' + name + '%20' + teaser);
  }

  findOnInstagram(username: string) {
    window.open('https://www.instagram.com/' + username);
  }

  likeTinderProfile(id: string, s_number: string, photoUrl: string) {
    this.service.likeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      this.match = data.match;
      this.currentProfileId = id;

      if (data.match.following == true) {
        this.matchStatus = "Yes!";
        console.log("Match!")
        this.playNotification();

        $(this.matchModal.nativeElement).modal('show');

        document.getElementById("modalProfileImage").setAttribute('src', photoUrl);
      } else {
        console.log("No match")
        this.matchStatus = "No";
      }

    })
  }

  passTinderProfile(id: string, s_number: string) {
    this.service.passProfile(id, s_number).subscribe(data => {
      console.log(data);
      if (data.status == 200) {
        this.matchStatus = "Passed";
      }
    })
  }

  superlikeTinderProfile(id: string, s_number: string, photoUrl: string) {
    this.service.superlikeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      this.match = data.match;
      this.currentProfileId = id;
      if (data.match == true) {
        this.matchStatus = "Yes!";
        this.playNotification();
        $(this.matchModal.nativeElement).modal('show');
        document.getElementById("modalProfileImage").setAttribute('src', photoUrl);
      } else {
        this.matchStatus = "No";
      }

    })
  }

  removeFromList(profile, status) {
    console.log(status);
    let index = this.profiles.indexOf(profile);
    this.profiles.splice(index, 1)
  }

  autolikeProfiles(id: string, s_number: string, photoUrl: string) {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    if (this.autolikeTime < 1) {
      this.autolikeId = setInterval(() => {
        console.log("autoliked: " + id)
        this.likeTinderProfile(id, s_number, photoUrl);
        this.profiles.splice(0, 1);
      }, 1000);
    } else {
      this.autolikeId = setInterval(() => {
        console.log("autoliked: " + id)
        this.likeTinderProfile(id, s_number, photoUrl);
        this.profiles.splice(0, 1);
      }, this.autolikeTime * 1000);
    }
  }

  stopAutolikeProfiles() {
    clearInterval(this.autolikeId);
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
  }

  getAgeFilter() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log("Age min:" + data.data.user.age_filter_min + ", Age max:" + data.data.user.age_filter_max);
      this.age_filter_min = data.data.user.age_filter_min;
      this.age_filter_max = data.data.user.age_filter_max;
    })
  }

  setAgeFilter() {
    //this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.setAgeFilter(this.age_filter_min, this.age_filter_max).subscribe(data => {
      console.log("Changed age filter");
    })

    /*setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      1500);

    setTimeout(() => {
      this.getProfiles();
    },
      1000);*/

    /*setTimeout(() => {
      window.location.reload();
    },
      1000);*/


  }

  getDistanceFilter() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log("Distance filter (in miles):" + data.data.user.distance_filter);
      this.distance_filter = data.data.user.distance_filter;
      console.log("Distance filter (in km):" + this.distance_filter * 1.6);
    })
  }

  setDistanceFilter() {
    //this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.setDistanceFilter(this.distance_filter).subscribe(data => {
      console.log("Changed distance filter (in miles): " + this.distance_filter);
      console.log("Changed distance filter (in km): " + this.distance_filter * 1.6);
    })

    /*setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      1500);

    setTimeout(() => {
      this.getProfiles();
    },
      1000);*/

    /*setTimeout(() => {
      window.location.reload();
    },
      500);*/
  }

  getSuperlikes() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.super_likes);
      this.superlikesCounter = data.data.super_likes.remaining;
      this.superlikesReset = data.data.super_likes.resets_at;
    })
  }

  getBoost() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.boost);
      this.boostReset = data.data.boost.resets_at;

      console.log(this.boostReset);
    })
  }

  enableBoost() {
    this.service.enableBoost().subscribe(data => {
      console.log(data);
    })
  }

  lowerSuperlikes(superlike: number) {
    this.superlikesCounter = this.superlikesCounter - 1;
  }

  playNotification() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/soft_notification.mp3";
    audio.load();
    audio.play();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
