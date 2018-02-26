import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  exampleStringArray: string[] = null;
  profiles: Profile[];
  profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray);
  matchStatus: string = null;

  age_filter_min: number;
  age_filter_max: number;

  distance_filter: number;

  superlikesCounter: number;
  superlikesReset: Date;

  boostReset: Date;

  constructor(private service: TinderService) { }

  ngOnInit() {
    this.getProfiles();
    this.getAgeFilter();
    this.getDistanceFilter();
    this.getSuperlikes();
    this.getBoost();
  }

  getProfiles() {
    this.service.getProfiles().subscribe(data => {
      console.log(data.data.results);
      this.profiles = data.data.results;
    })

    this.scrollToTop();
  }

  seePossibleMatches(distance: number) {
    this.service.setDistanceFilter(distance).subscribe(data => {
      console.log("Changed distance filter to see possible matches");
    })
    this.distance_filter = distance;
    window.location.reload();
  }

  openImage(url: string){
    window.open(url);
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

  likeTinderProfile(id: string, s_number: string) {
    this.service.likeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      if (data.match.following == true) {
        this.matchStatus = "Yes!";
        this.playNotification();
      } else {
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

  superlikeTinderProfile(id: string, s_number: string) {
    this.service.superlikeProfile(id, s_number).subscribe(data => {
      console.log(data.match);
      if (data.match == true) {
        this.matchStatus = "Yes!";
        this.playNotification();
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

  getAgeFilter() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log("Age min:" + data.data.user.age_filter_min + ", Age max:" + data.data.user.age_filter_max);
      this.age_filter_min = data.data.user.age_filter_min;
      this.age_filter_max = data.data.user.age_filter_max;
    })
  }

  setAgeFilter() {
    this.service.setAgeFilter(this.age_filter_min, this.age_filter_max).subscribe(data => {
      console.log("Changed age filter");
    })

    //window.location.reload();
  }

  getDistanceFilter() {
    this.service.getUserProfileV2().subscribe(data => {
      console.log("Distance filter (in miles):" + data.data.user.distance_filter);
      this.distance_filter = data.data.user.distance_filter;
      console.log("Distance filter (in km):" + this.distance_filter * 1.6);
    })
  }

  setDistanceFilter() {
    this.service.setDistanceFilter(this.distance_filter).subscribe(data => {
      console.log("Changed distance filter (in miles): " + this.distance_filter);
      console.log("Changed distance filter (in km): " + this.distance_filter * 1.6);
    })

    //window.location.reload();
  }

  getSuperlikes(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.super_likes);
      this.superlikesCounter = data.data.super_likes.remaining;
      this.superlikesReset = data.data.super_likes.resets_at;
    })
  }

  getBoost(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.boost);
      this.boostReset = data.data.boost.resets_at;

      console.log(this.boostReset);
    })
  }

  lowerSuperlikes(superlike: number){
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
