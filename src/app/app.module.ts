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


@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    UserComponent,
    ProfilesComponent,
    FaceDetectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [TinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
