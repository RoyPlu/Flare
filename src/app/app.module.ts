import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TinderService } from './services/tinder.service';
import { ProfileComponent } from './profile/profile.component';
import { MatchesComponent } from './matches/matches.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
