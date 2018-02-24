import {Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MatchesComponent } from './matches/matches.component';
import { FaceDetectionComponent } from './facedetection/facedetection.component';
import { PassportComponent } from './passport/passport.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Routes = [
 { path: 'user', component: UserComponent},
 { path: 'profiles', component: ProfilesComponent },
 { path: 'profile/:id/:s_number', component: ProfileComponent },
 { path: 'matches', component: MatchesComponent },
 { path: 'messages/:id', component: MessagesComponent },
 { path: 'passport', component: PassportComponent},
 { path: 'facedetection', component: FaceDetectionComponent },
 { path: 'about', component: AboutComponent },
 { path: '', redirectTo: '/user', pathMatch: 'full' }
];
