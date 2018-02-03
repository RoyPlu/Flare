import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TinderService } from './services/tinder.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
