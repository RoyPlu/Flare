import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { MessagesService } from '../services/tinder.messages.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    id: string;
    messages: string[];

  constructor(private titleService: Title, private route: ActivatedRoute, private service: MessagesService) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id

        this.id = params['id'];
    });

    this.getMessages();
  }

  getMessages(){
    this.service.getMessages(this.id, "").subscribe(data => {
        console.log(data.data.messages);
        this.messages = data.data.messages;
      })
  }

}
