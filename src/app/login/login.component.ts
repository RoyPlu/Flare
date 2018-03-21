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

    url = "https://m.facebook.com/v2.8/dialog/oauth?auth_type=rerequest&client_id=464891386855067&default_audience=friends&display=touch&e2e=%7B%22init%22:1947351.737793%7D&fbapp_pres=0&redirect_uri=fb464891386855067://authorize/&response_type=token,signed_request&return_scopes=true&scope=user_birthday,user_photos,user_education_history,email,user_relationship_details,user_friends,user_work_history,user_likes&sdk=ios&sdk_version=4.20.2&state=%7B%22challenge%22:%22wt7ktcsTn66e3eXP5hkB6OiZHG0%253D%22,%220_auth_logger_id%22:%22A5AA6F71-41B8-4D04-9896-7E6A2FC26295%22,%22com.facebook.sdk_client_state%22:true,%223_method%22:%22sfvc_auth%22%7D&sfvc=1"

    loginWindow;

    facebook_token = "";

    token_regex = /access_token=(.*)&/;
    token;

    constructor(private service: TinderService, private router: Router) {

    }

    facebookLogin() {

        this.loginWindow = window.open(this.url, "Project Flare", "menubar=no,location=no,resizable=no,scrollbars=no,status=yes,width=600,height=600");

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
            }
    }
}