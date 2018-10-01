import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MatchesComponent } from './matches/matches.component';
import { FaceDetectionComponent } from './facedetection/facedetection.component';
import { PassportComponent } from './passport/passport.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { FastMatchesComponent } from './fastmatches/fastmatches.component';
import { CloudmersiveComponent } from './cloudmersive/cloudmersive.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'profile/:id/:s_number', component: ProfileComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'fastmatches', component: FastMatchesComponent },
    { path: 'messages/:id/:profileId', component: MessagesComponent },
    { path: 'passport', component: PassportComponent },
    { path: 'facedetection', component: FaceDetectionComponent },
    { path: 'cloudmersive', component: CloudmersiveComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
