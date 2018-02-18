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

const X_AUTH_CODE = "4445c178-f4c8-4d0f-8044-5dbde078618a";

const BASE_API_URL = "https://api.gotinder.com";
const BASE_API_URL_v2 = "https://api.gotinder.com/v2";

const FACE_API_SUB_KEY = "1cca7a318c2d4c06b1c35030153dc720";

@Injectable()
export class TinderService {
    constructor(private http: Http) { }

    getUserProfile() {

        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(BASE_API_URL + "/profile", options).map(res => res.json()).map(this.parseProfile);
    }

    likeProfile(id: string, s_number: string){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        console.log(this.http.get(BASE_API_URL + "/like" + "/" + id + "?locale=en" + "&" + s_number, options).map(res => res.json()));
        return this.http.get(BASE_API_URL + "/like" + "/" + id + "?locale=en" + "&" + s_number, options).map(res => res.json());
    }

    passProfile(id: string, s_number: string){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        console.log(this.http.get(BASE_API_URL + "/pass" + "/" + id + "?locale=en" + "&" + s_number, options).map(res => res.json()));
        return this.http.get(BASE_API_URL + "/pass" + "/" + id + "?locale=en" + "&" + s_number, options).map(res => res.json());
    }

    getUpdates(){
        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'x-auth-token': X_AUTH_CODE,
            'User-Agent': 'Tinder/6.3.1 (iPhone; iOS 10.0.2; Scale/2.00)',
        });

        const options = new RequestOptions({
            headers: headers
        });

        console.log("get updates");
        console.log(this.http.post(BASE_API_URL + "/updates", options).map(res => res.json()));
        return this.http.post(BASE_API_URL + "/updates", options).map(res => res.json());
    }

    getMatches(page_token: string) {

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
        if (page_token != null){
            console.log(this.http.get(BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json()));
        return this.http.get(BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json());
        } else {
            console.log(this.http.get(BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en", options).map(res => res.json()));
        return this.http.get(BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en", options).map(res => res.json());
        }
        
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

    faceDetection(image: string){
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '1cca7a318c2d4c06b1c35030153dc720',
        });

        const options = new RequestOptions({
            headers: headers
        });

        console.log(image);

        var imageUrl = { url: image }
        
        return this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age%2Cgender%2CheadPose%2Csmile%2CfacialHair%2Cglasses%2Cemotion%2Chair%2Cmakeup%2Cocclusion%2Caccessories%2Cblur%2Cexposure%2Cnoise", imageUrl, options).map(res => res.json());
    }

    getProfiles(){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        console.log(this.http.get(BASE_API_URL_v2 + "/recs/core?locale=en", options).map(res => res.json()));
        return this.http.get(BASE_API_URL_v2 + "/recs/core?locale=en", options).map(res => res.json());
    }
}