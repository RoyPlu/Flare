import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Profile } from '../models/profile.model';
import { $ } from 'protractor';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';

const USER_TOKEN = "973840342772878|OUv2k17CiphO6zHRrvrRRt63vAU";
const USER_ID = "100000954286974";

const X_AUTH_CODE = "5232a4d3-36ed-4286-a997-75ad8b3d810a";

const X_AUTH_CODE_2 = "90299a3c-f0bd-4422-8220-6d7b9c637f05";

const BASE_API_URL = "https://api.gotinder.com";
const BASE_API_URL_v2 = "https://api.gotinder.com/v2";

const FACE_API_SUB_KEY = "1cca7a318c2d4c06b1c35030153dc720";

@Injectable()
export class TinderService {
    constructor(private http: Http) { }

    getMessages(id: string, page_token: string) {

        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        console.log(page_token);
        if (page_token != null) {
            console.log(this.http.get(BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json()));
            return this.http.get(BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json());
        } else {
            console.log(this.http.get(BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json()));
            return this.http.get(BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json());
        }

    }

}