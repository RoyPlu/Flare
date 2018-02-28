import { Component } from '@angular/core';
import { Router } from '@angular/router';


declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    constructor(private router: Router){
    }

    public onLoginClick(){
        // this.router.navigate(['./home']);
        FB.getLoginStatus((response) => {
            if (response.status === 'connected') {
                this.router.navigate(['./home']);
            }
            else {
                FB.login((loginResponse)=>{
                    this.router.navigate(['./home']);
                });
            }
        });
    }
}