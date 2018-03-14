import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TinderService } from '../services/tinder.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {


    constructor(private service: TinderService) {

    }

    /*getFacebookToken() {
        this.service.getFacebookToken().subscribe(data => {
            console.log(data);
        })
    }*/

    facebookLogin() {
        this.service.facebookLogin("EAAGm0PX4ZCpsBAG3ZA1OzHD0vMfA8kXrp07BG5HAur6G2I1GHkbaXA7GD6ZAr4U6SWyKhPZAz8ARSJBYUpJfrmDNlBrkPGUvs0oskGByPrVKfeHyRikBTn00yZCslvz5CYdw1eQDTdJEShBoa860PSKmxqHHDcMLRq4y8q06LcQBFPRMGv6SfPTzDBfH2ksisPJz1tniwnZB8i6OQdZCXcNe0j1bFM58HrRKH4FXVTyl1DgQbU2p61AUnNTC9FvEuUZD", "100000954286974").subscribe(data => {
            console.log(data);
        })
    }
}