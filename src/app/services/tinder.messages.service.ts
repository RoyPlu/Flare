import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Profile } from '../models/profile.model';
import { $ } from 'protractor';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';

const X_AUTH_CODE = localStorage.getItem('x-auth-token');

const X_AUTH_CODE_2 = "b6d4e433-de19-4964-9e01-809dd669743e";

const API_PROXY_URL = "https://flare-proxy.herokuapp.com/" //"http://localhost:8080/";

const BASE_API_URL = "https://api.gotinder.com";
const BASE_API_URL_v2 = "https://api.gotinder.com/v2";

const FACE_API_SUB_KEY = "1cca7a318c2d4c06b1c35030153dc720";

@Injectable()
export class MessagesService {
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
            console.log(this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json()));
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json());
        } else {
            console.log(this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json()));
            return this.http.get(API_PROXY_URL + BASE_API_URL_v2 + "/matches/" + id + "/messages" + "?count=100" + "&locale=en", options).map(res => res.json());
        }

    }

    sendMessage(id: string, message: string, userId: string){
        const headers = new Headers({
            'Access-Control-Allow-Origin': "*",
            'Content-type': 'application/json',
            'x-auth-token': X_AUTH_CODE,
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        });

        const options = new RequestOptions({
            headers: headers
        });

        var tempMessageId = "0.46451920417002346";

        console.log(this.http.post(API_PROXY_URL + BASE_API_URL + "/user" + "/matches/" + id + "?locale=en", options).map(res => res.json()));
        return this.http.post(API_PROXY_URL + BASE_API_URL + "/user" + "/matches/" + id + "?locale=en", {matchId: id, message: message, tempMessageId: tempMessageId, userId: userId } ,options).map(res => res.json());
    }

}