import { Component, OnInit, Input, ViewChild, ElementRef, NgModule } from '@angular/core';
import { AgmMap } from '@agm/core';
import { TinderService } from '../services/tinder.service';
import { Profile } from '../models/profile.model';
import { Match } from '../models/match.model';

import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';


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
  profiles: any[];
  profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray, null, null, null, null);
  matchStatus: string = null;


  match = { _id: "123", participants: ["0", "1"] } //: Match = new Match("12345", this.exampleStringArray);

  age_filter_min: number;
  age_filter_max: number;

  distance_filter: number;

  superlikesCounter: number;
  superlikesReset: Date;

  boostReset: Date;

  likesLeft: number;

  autolikeTime: number = 5;
  autolikeId;

  loadingIndicator;

  currentProfileId: string;

  date = new Date();

  fastMatchPreview;

  @ViewChild('matchModal') matchModal: ElementRef;

  constructor(private service: TinderService, private _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {

    this.getProfiles();
    this.getAgeFilter();
    this.getDistanceFilter();
    this.getExtraFeatures();
    this.getFastMatchPreview();

    this.match.participants[1] = "123";

    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
  }

  getProfiles() {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.getProfiles().subscribe(data => {

      if (this.profiles == null) {
        this.profiles = data.data.results;
      } else {

        data.data.results.forEach(element => {
          this.profiles.push(element);

        });
      }

      this.profiles = this.profiles.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.user._id === thing.user._id
        ))
      )

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
    this.service.getProfile(id).subscribe(data => {
      this.profile = data.results;
    })
  }

  findOnFacebook(name: string, teaser: string) {
    window.open('https://www.facebook.com/search/people/?q=' + name + '%20' + teaser);
  }

  findOnInstagram(username: string) {
    window.open('https://www.instagram.com/' + username);
  }

  findProfileByCommonLike(name: string, id: string) {
    window.open('https://www.facebook.com/search/str/' + name + '/users-named/' + id + '/likers/intersect')
  }

  likeTinderProfile(id: string, s_number: string, photoUrl: string) {
    this.service.likeProfile(id, s_number).subscribe(data => {
      this.match = data.match;
      this.currentProfileId = id;
      this.likesLeft -= 1;

      console.log("Liked:" + id);

      if (data.match.following == true) {
        this.matchStatus = "Yes!";
        this.playNotification();

        $(this.matchModal.nativeElement).modal('show');

        document.getElementById("modalProfileImage").setAttribute('src', photoUrl);
      } else {
        this.matchStatus = "No";
      }
      setTimeout(() => {
        this.getFastMatchPreview();
      }, 1000);
    })
  }

  passTinderProfile(id: string, s_number: string) {
    this.service.passProfile(id, s_number).subscribe(data => {
      console.log("Passed:" + id);
      if (data.status == 200) {
        this.matchStatus = "Passed";
      }
    })
  }

  superlikeTinderProfile(id: string, s_number: string, photoUrl: string) {
    this.service.superlikeProfile(id, s_number).subscribe(data => {
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
      this.age_filter_min = data.data.user.age_filter_min;
      this.age_filter_max = data.data.user.age_filter_max;
    })
  }

  setAgeFilter() {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.setAgeFilter(this.age_filter_min, this.age_filter_max).subscribe(data => {
    })

    this.profiles = null;

    setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      500);

    setTimeout(() => {
      this.getProfiles();
    },
      1000);

    /*setTimeout(() => {
      window.location.reload();
    },
      1000);*/


  }

  getDistanceFilter() {
    this.service.getUserProfileV2().subscribe(data => {
      this.distance_filter = data.data.user.distance_filter;
    })
  }

  setDistanceFilter() {
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.setDistanceFilter(this.distance_filter).subscribe(data => {
    })

    this.profiles = null;

    setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      500);

    setTimeout(() => {
      this.getProfiles();
    },
      1000);

    /*setTimeout(() => {
      window.location.reload();
    },
      500);*/
  }

  getExtraFeatures() {
    this.service.getUserProfileV2().subscribe(data => {
      this.superlikesCounter = data.data.super_likes.remaining;
      this.superlikesReset = data.data.super_likes.resets_at;

      this.boostReset = data.data.boost.resets_at;

      this.likesLeft = data.data.likes.likes_remaining;
    })
  }

  getFastMatchPreview() {
    this.service.getFastMatchPreview().subscribe(data => {
      const file = new Blob([data], { type: 'image/jpeg' })
      const fileUrl = URL.createObjectURL(file);
      this.fastMatchPreview = this._DomSanitizationService.bypassSecurityTrustUrl(fileUrl);
    })
  }

  enableBoost() {
    this.service.enableBoost().subscribe(data => {
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
