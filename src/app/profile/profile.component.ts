import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../models/profile.model';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  exampleStringArray: string[] = null;
  profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray, null, null, null, null);

  id: string;
  s_number: string;
  matchStatus: string = null;

  browserTitle: string;

  superlikesCounter: number;

  form: FormGroup;
  file: File;
  loading: boolean = false;
  cloudmersiveData: string = "";

  constructor(private titleService: Title, private route: ActivatedRoute, private service: TinderService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.s_number = params['s_number'];
    });

    this.getProfile(this.id);
    this.getSuperlikes();
  }

  createForm() {
    this.form = this.fb.group({
      imageFile: null
    });
  }

  getProfile(id: string) {
    this.service.getProfile(id).subscribe(data => {
      this.profile = data.results;

      this.setTitle(this.profile.name);

    })
  }

  findOnFacebook(name: string, school: string) {
    window.open('https://www.facebook.com/search/people/?q=' + name + '%20' + school);
  }

  findOnInstagram(username: string) {
    window.open('https://www.instagram.com/' + username);
  }

  setTitle(browserTitle: string) {
    this.titleService.setTitle(browserTitle);
  }

  likeTinderProfile() {
    this.service.likeProfile(this.id, this.s_number).subscribe(data => {
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
      if (data.status == 200) {
        this.matchStatus = "Passed";
      }
    })
  }

  superlikeTinderProfile() {
    this.service.superlikeProfile(this.id, this.s_number).subscribe(data => {
      if (data.match == true) {
        this.matchStatus = "Yes!";
        this.playNotification();
      } else {
        this.matchStatus = "No";
      }

    })
  }

  getSuperlikes() {
    this.service.getUserProfileV2().subscribe(data => {
      this.superlikesCounter = data.data.super_likes.remaining;
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

  imageURLtoFile(imageURL: string) {
    this.service.getImage(imageURL).subscribe(data => {

      var file = new File([data], "image");
      this.form.get('imageFile').setValue(file);
    })

    setTimeout(() => {
      this.onSubmit();
    },
      3000);
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('imageFile', this.form.get('imageFile').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)

    this.service.cloudmersiveDetect(formModel).subscribe(data => {
      this.cloudmersiveData = data.BestOutcome.Description;
    })
  }

}
