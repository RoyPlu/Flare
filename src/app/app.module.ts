import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { AdsenseModule } from 'ng2-adsense';

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
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './services/tinder.messages.service';
import { LoginComponent } from './login/login.component';
import { ProfileLocationComponent } from './profilelocation/profilelocation.component';
import { FastMatchesComponent } from './fastmatches/fastmatches.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { CloudmersiveComponent } from './cloudmersive/cloudmersive.component';


@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    FastMatchesComponent,
    UserComponent,
    ProfilesComponent,
    FaceDetectionComponent,
    CloudmersiveComponent,
    NavbarComponent,
    PassportComponent,
    AboutComponent,
    ProfileComponent,
    MessagesComponent,
    LoginComponent,
    ProfileLocationComponent,
    AdvertisementComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBuhH3Fi2ofA8t9jfd2iKowr9anDGyXvRA',
    }),
    AdsenseModule,
  ],
  providers: [TinderService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
