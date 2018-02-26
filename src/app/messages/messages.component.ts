import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { MessagesService } from '../services/tinder.messages.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    id: string;
    profileId: string;
    messages: string[];
    user: User;

    exampleStringArray: string[] = null;
    profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray);

    browserTitle: string = "Messages - ";

    messageInput: string = "";

  constructor(private titleService: Title, private route: ActivatedRoute, private messagesService: MessagesService, private service: TinderService ) {
    setInterval(() => { this.getMessages(); }, 5000);
   }

  ngOnInit(){
    this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of general id
        console.log(params['profileId']) // log the value of Profile id

        this.id = params['id'];
        this.profileId = params['profileId'];
    });

    this.getMessages();
    this.getTinderUserV2();
    this.getProfile(this.profileId);
    this.scrollToBottom();

    
  }

  

  getMessages(){
    this.messagesService.getMessages(this.id, "").subscribe(data => {
        console.log(data.data.messages);
        this.messages = data.data.messages;
        this.messages = this.messages.slice(0, 10);
        this.messages = this.messages.reverse();
      })
  }

  getTinderUserV2(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.user);
      this.user = data.data.user;
    })
  }

  getProfile(id: string) {
    console.log(id);
    this.service.getProfile(id).subscribe(data => {
        console.log(data.results);
        this.profile = data.results;

        this.browserTitle += data.results.name;
        this.setTitle(this.browserTitle);
    })
}

sendMessage(message: string, userId: string ){
  this.messagesService.sendMessage(this.id, message, userId).subscribe(data => {
    console.log(data);

    this.getMessages();

    //window.location.reload();
  })

  let index = this.messages.indexOf(message);
  this.messages.push(message);

  this.messageInput = "";

}

  setTitle(browserTitle: string){
    this.titleService.setTitle( browserTitle );
}

scrollToBottom() {
  window.frameElement.scrollIntoView(false);
}



}
