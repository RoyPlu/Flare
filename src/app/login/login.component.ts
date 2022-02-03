import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { TinderService } from '../services/tinder.service';
var tinder = require('tinder');
var client = new tinder.TinderClient();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    url = "https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=fb464891386855067://authorize/&&scope=user_birthday,user_photos,user_education_history,email,user_relationship_details,user_friends,user_work_history,user_likes&response_type=token"

    loginWindow;

    facebook_token = "";

    token_regex = /access_token=(.*)&d/;
    token;

    constructor(private service: TinderService, private router: Router) {

    }

    facebookLogin() {

        this.loginWindow = window.open(this.url, "Project Flare", "menubar=no,location=no,resizable=no,scrollbars=no,toolbar=no,status=yes,width=600,height=600");
    }

    getTinderAuthToken() {

        this.token = this.facebook_token.match(this.token_regex);

        this.service.TinderLogin(this.token[1]).subscribe(login => {

            localStorage.setItem('x-auth-token', login.data.api_token);

            console.log(localStorage.getItem('x-auth-token'));
        })

        if (localStorage.getItem('x-auth-token') != null) {
            this.router.navigate(['/profiles']);


            setTimeout(() => {
                location.reload();
            },
                1000);

        }
    }
}