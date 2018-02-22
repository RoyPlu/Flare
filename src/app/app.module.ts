import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TinderService } from './services/tinder.service';
import { UserComponent } from './user/user.component';
import { MatchesComponent } from './matches/matches.component';
import { FaceDetectionComponent } from './facedetection/facedetection.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PassportComponent } from './passport/passport.component';

import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    UserComponent,
    ProfilesComponent,
    FaceDetectionComponent,
    NavbarComponent,
    PassportComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBuhH3Fi2ofA8t9jfd2iKowr9anDGyXvRA',
      apiVersion: "4",
    }),
  ],
  providers: [TinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
