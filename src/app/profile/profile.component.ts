import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../models/profile.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    exampleStringArray: string[] = null;
    profile: Profile = new Profile("1", "Name", "Bio", this.exampleStringArray, false, this.exampleStringArray);

    id: string;

    constructor(private route: ActivatedRoute, private service: TinderService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params) //log the entire params object
            console.log(params['id']) //log the value of id

            this.id = params['id'];
        });

        this.getProfile(this.id);
    }

    getProfile(id: string) {
        console.log(id);
        this.service.getProfile(id).subscribe(data => {
            console.log(data.results);
            this.profile = data.results;
        })

    }

}
