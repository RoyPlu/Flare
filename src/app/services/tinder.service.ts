import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Profile } from '../models/profile.model';

const USER_TOKEN = "973840342772878|OUv2k17CiphO6zHRrvrRRt63vAU";
const USER_ID = "100000954286974";

const BASE_API_URL = "https://api.gotinder.com"

@Injectable()
export class TinderService {
    constructor(private http: Http) { }

    getProfile(){

        const headers = new Headers({
            'Content-type': 'application/json',
            'x-auth-token': '4defeeb0-83ba-43c9-82b4-5e40a94bdec3',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
          });

        const options = new RequestOptions({
            headers: headers
          });
          

        return this.http.get(BASE_API_URL + "/profile", options).map(res => res.json()).map(this.parseProfile);
    }

    parseProfile(rawProfile: any): Profile {

        let profile = rawProfile;

        return new Profile(
            profile._id,
            profile.name,
            profile.bio,
            profile.photos,
        );
    }
}