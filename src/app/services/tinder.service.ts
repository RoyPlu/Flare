import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Profile } from '../models/profile.model';
import { $ } from 'protractor';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';

const X_AUTH_CODE = localStorage.getItem('x-auth-token');

const API_PROXY_URL = "https://flare-proxy.herokuapp.com/"; //"http://localhost:8080/";

const BASE_API_URL = "https://api.gotinder.com";
const BASE_API_URL_v2 = "https://api.gotinder.com/v2";

const FACE_API_SUB_KEY = "1cca7a318c2d4c06b1c35030153dc720";

@Injectable()
export class TinderService {
    constructor(private http: Http) { }

    getFacebookToken(){
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(API_PROXY_URL + BASE_API_URL + "/profile", options).map(res => res.json());
    }

    TinderLogin(fb_token){
        const headers = new Headers({
            'Content-type': 'application/json',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.post(API_PROXY_URL + BASE_API_URL_v2 + "/auth" + "/login" + "/facebook" + "?locale=en", {"token": fb_token} ,options).map(res => res.json());
    }


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


        return this.http.get(API_PROXY_URL + BASE_API_URL + "/profile" + "?include=user%2Cplus_control%2Cboost%2Ctravel%2Ctutorials%2Cnotifications%2Cpurchase%2Cproducts%2Clikes%2Csuper_likes%2Cfacebook%2Cinstagram%2Cspotify%2Cselectl&locale=en", options).map(res => res.json());
    }

    getUserProfileV2() {

        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/profile" + "?include=user%2Cplus_control%2Cboost%2Ctravel%2Ctutorials%2Cnotifications%2Cpurchase%2Cproducts%2Clikes%2Csuper_likes%2Cfacebook%2Cinstagram%2Cspotify%2Cselectl&locale=en", options).map(res => res.json());
    }

    likeProfile(id: string, s_number: string) {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Origin': "https://tinder.com",
            //'Content-type': 'application/json',
            'X-Auth-Token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(API_PROXY_URL + BASE_API_URL + "/like" + "/" + id + "?locale=en" + "&s_number=" + s_number, options).map(res => res.json());
    }

    superlikeProfile(id: string, s_number: string) {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        (this.http.post(API_PROXY_URL + BASE_API_URL + "/like" + "/" + id + "/super" + "?locale=en" + "&s_number=" + s_number, null, options).map(res => res.json()));
        return this.http.post(API_PROXY_URL + BASE_API_URL + "/like" + "/" + id + "/super" + "?locale=en" + "&s_number=" + s_number, null, options).map(res => res.json());
    }

    passProfile(id: string, s_number: string) {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Origin': "https://tinder.com",
            //'Content-type': 'application/json',
            'X-Auth-Token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.get(API_PROXY_URL + BASE_API_URL + "/pass" + "/" + id + "?locale=en" + "&s_number=" + s_number, options).map(res => res.json());
    }

    setAgeFilter(minAge: number, maxAge: number){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.post(API_PROXY_URL + BASE_API_URL_v2 + "/profile" + "?include=user%2Cplus_control%2Cboost%2Ctravel%2Ctutorials%2Cnotifications%2Cpurchase%2Cproducts%2Clikes%2Csuper_likes%2Cfacebook%2Cinstagram%2Cspotify%2Cselectl&locale=en", { user: { age_filter_min: minAge, age_filter_max: maxAge } }, options).map(res => res.json());
    }

    setDistanceFilter(distance: number){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.post(API_PROXY_URL + BASE_API_URL_v2 + "/profile" + "?include=user%2Cplus_control%2Cboost%2Ctravel%2Ctutorials%2Cnotifications%2Cpurchase%2Cproducts%2Clikes%2Csuper_likes%2Cfacebook%2Cinstagram%2Cspotify%2Cselectl&locale=en", { user: { distance_filter: distance } }, options).map(res => res.json());
    }

    getUpdates() {
        const headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'x-auth-token': X_AUTH_CODE,
            'User-Agent': 'Tinder/6.3.1 (iPhone; iOS 10.0.2; Scale/2.00)',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(API_PROXY_URL + BASE_API_URL + "/updates", options).map(res => res.json());
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

        if (page_token != null) {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json());
        } else {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches" + "?count=60" + "&locale=en", options).map(res => res.json());
        }

    }

    getFastMatches(page_token: string) {

        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        if (page_token != null) {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/fast-match" + "?count=20" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json());
        } else {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/fast-match" + "?count=20" + "&locale=en", options).map(res => res.json());
        }

    }

    getFastMatchPreview() {

        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'image/jpeg',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers,
            responseType: ResponseContentType.Blob
        });

            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/fast-match" + "/preview" + "?locale=en", options).map(res => res.blob());

    }

    parseMatchesData(rawMatches: any): Match[] {
        return Object.keys(rawMatches).map(key => {
            let match = rawMatches[key];
            return new Match(
                match._id,
                match.personalId
            );
        });
    }

    getTotalAmountOfMatches(page_token: string) {

        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        if (page_token != null) {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches" + "?count=100" + "&locale=en" + "&page_token=" + page_token, options).map(res => res.json());
        } else {
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches" + "?count=100" + "&locale=en", options).map(res => res.json());
        }

    }

    deleteMatch(id: string){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.delete(API_PROXY_URL + BASE_API_URL + "/user" + "/matches/" + id + "?locale=en", options).map(res => res.json());
    }

    enableSmartPhotos(profile: Profile) {

        const headers = new Headers({
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        if (profile.photo_optimizer_enabled == true) {
            return this.http.post(API_PROXY_URL + BASE_API_URL_v2 + "/profile" + "?locale=en", { user: { photo_optimizer_enabled: true } }, options);
        } else {
            return this.http.post(API_PROXY_URL + BASE_API_URL_v2 + "/profile" + "?locale=en", { user: { photo_optimizer_enabled: false } }, options);
        }
    }




    parseUser(rawUser: any): User {

        let user = rawUser;

        return new User(
            user._id,
            user.name,
            user.bio,
            user.photos,
            user.photo_optimizer_enabled,
            user.pos,
            user.user,
            user.purchase,
            user.spotify
        );
    }

    faceDetection(image: string) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '1cca7a318c2d4c06b1c35030153dc720',
        });

        const options = new RequestOptions({
            headers: headers
        });

        var imageUrl = { url: image }

        return this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age%2Cgender%2CheadPose%2Csmile%2CfacialHair%2Cglasses%2Cemotion%2Chair%2Cmakeup%2Cocclusion%2Caccessories%2Cblur%2Cexposure%2Cnoise", imageUrl, options).map(res => res.json());
    }

    getProfiles() {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            'platform': 'web',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/recs/core?locale=en", options).map(res => res.json());
    }

    getProfile(id: string) {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.get(API_PROXY_URL + BASE_API_URL + "/user" + "/" + id, options).map(res => res.json());
    }

    resetPassport(){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(API_PROXY_URL + BASE_API_URL + "/passport/user/reset", null, options).map(res => res.json());
    }

    changePassportLocation(latitude: number, longitude: number){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(API_PROXY_URL + BASE_API_URL + "/passport/user/travel", { lat: latitude , lon: longitude}, options).map(res => res.json());
    }

    setUserLocation(latitude: number, longitude: number){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(API_PROXY_URL + BASE_API_URL + "/user" + "/ping", { lat: latitude , lon: longitude}, options).map(res => res.json());
    }

    getPopularLocations() {
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.get(API_PROXY_URL + BASE_API_URL + "/location" + "/popular" + "?locale=en", options).map(res => res.json());
    }

    enableBoost(){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });


        return this.http.post(API_PROXY_URL + BASE_API_URL + "/boost" + "?locale=en", {} ,options).map(res => res.json());
    }

    cloudmersiveDetect(form: FormGroup) {
        const headers = new Headers({
            'ApiKey': '59710ec3-24ee-4d4c-a90e-efb6170e2f50',
        });

        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post("https://api.cloudmersive.com/image/recognize/describe", form ,options).map(res => res.json());
    }


    getImage(imageUrl: string): Observable<Blob> {
        return this.http
            .get(API_PROXY_URL + imageUrl, { responseType: ResponseContentType.Blob })
            .map(res => res.blob());
    }

    
}