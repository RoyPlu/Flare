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

    url = "https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd"

    loginWindow;

    facebook_token = "";

    token_regex = /access_token=(.*)&e/;
    token;

    constructor(private service: TinderService, private router: Router) {

    }

    facebookLogin() {

        this.loginWindow = window.open(this.url, "Project Flare", "menubar=no,location=no,resizable=no,scrollbars=no,toolbar=no,status=yes,width=600,height=600");
    }

    getTinderAuthToken() {

        this.token = this.facebook_token.match(this.token_regex);

        console.log(this.token);
        this.service.TinderLogin(this.token[1]).subscribe(login => {
            console.log(login);

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