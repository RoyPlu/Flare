import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { MessagesService } from '../services/tinder.messages.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    id: string;
    messages: string[];
    user: User;

    browserTitle: string ="Messages";

  constructor(private titleService: Title, private route: ActivatedRoute, private messagesService: MessagesService, private service: TinderService ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id

        this.id = params['id'];
    });

    this.getMessages();
    this.getTinderUserV2();
    this.setTitle(this.browserTitle);
  }

  getMessages(){
    this.messagesService.getMessages(this.id, "").subscribe(data => {
        console.log(data.data.messages);
        this.messages = data.data.messages;
      })
  }

  getTinderUserV2(){
    this.service.getUserProfileV2().subscribe(data => {
      console.log(data.data.user);
      this.user = data.data.user;
    })
  }

  setTitle(browserTitle: string){
    this.titleService.setTitle( browserTitle );
}

}
