import {Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MatchesComponent } from './matches/matches.component';
import { FaceDetectionComponent } from './facedetection/facedetection.component';

export const appRoutes: Routes = [
 { path: 'user', component: UserComponent},
 { path: 'profiles', component: ProfilesComponent },
 { path: 'matches', component: MatchesComponent },
 { path: 'facedetection', component: FaceDetectionComponent },
 { path: '', redirectTo: '/user', pathMatch: 'full' }
];
