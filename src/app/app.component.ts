import { Component, OnInit } from '@angular/core';
import { TinderService } from './services/tinder.service';
import { Profile } from './models/profile.model';


const USER_TOKEN = "973840342772878|OUv2k17CiphO6zHRrvrRRt63vAU";
const USER_ID = "100000954286974";
const TINDER_AUTH_TOKEN = "EAAGm0PX4ZCpsBAFgdqjiGVdVqO8Hp67wyyvLB8qBemWoYMfRXjdxWEf5MI79wmuuFLZBc1ogD2mK2UQMKwzcnpwmiyBgZBZBBTCQnVnkBGjNuBcNIvkk8ZCCoaLOy6dVNJYAJnjS3hzCtvmmFhBCXy7kjYzZACBrtc4251MdVLclV4u3iuNlyxHaNW6zNqXL9WWcAPxox3ZAivygjeCD9rZB6YecdRKZCaBtzs15IkOgVHE7xUm5nhLDeHeZBvYodyf3MZD"; 
const X_AUTH = "4defeeb0-83ba-43c9-82b4-5e40a94bdec3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'app';

  profile: Profile;

  constructor(private service: TinderService) { }

  ngOnInit(){
    
  }
  
}
