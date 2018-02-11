import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Profile } from '../models/profile.model';
import { $ } from 'protractor';
import { Match } from '../models/match.model';

const USER_TOKEN = "973840342772878|OUv2k17CiphO6zHRrvrRRt63vAU";
const USER_ID = "100000954286974";

const X_AUTH_CODE = "8dcc9db2-fcb9-482c-b4c0-039c47c95db5";

const BASE_API_URL = "https://api.gotinder.com"
const BASE_API_URL_v2 = "https://api.gotinder.com/v2"

@Injectable()
export class TinderService {
    constructor(private http: Http) { }

    getUserProfile() {

        const headers = new Headers({
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(BASE_API_URL + "/profile", options).map(res => res.json()).map(this.parseProfile);
    }

    

    getMatches() {

        const headers = new Headers({
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        console.log(this.http.get(BASE_API_URL_v2 + "/matches", options).map(res => res.json()));
        return this.http.get(BASE_API_URL_v2 + "/matches", options).map(res => res.json());
        
    }

    parseMatchesData(rawMatches: any): Match[] {
        return Object.keys(rawMatches).map(key => {
            let match = rawMatches[key];
            return new Match(
                match._id
            );
        });
    }

    enableSmartPhotos(profile: Profile) {

        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        const formData = new FormData();

        formData.set('photo_optimizer_enabled', (profile.photo_optimizer_enabled).toString());

        console.log(formData.get('photo_optimizer_enabled'));

        console.log(this.http.post(BASE_API_URL + "/profile", formData, options).map(res => res.json()));

        return this.http.post(BASE_API_URL + "/profile", formData, options);
    }



    parseProfile(rawProfile: any): Profile {

        let profile = rawProfile;

        return new Profile(
            profile._id,
            profile.name,
            profile.bio,
            profile.photos,
            profile.photo_optimizer_enabled,
        );
    }
}