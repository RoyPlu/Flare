import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TinderService } from './services/tinder.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
