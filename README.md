# Tinder-Angular ![alt text](https://cdn4.iconfinder.com/data/icons/social-media-pro-icons/1080/Tinder-01-128.png "Tinder-Angular")

A Simple Tinder application made in Angular with the possibility to see profile picture success rate (If Smart Photos is enabled) and with an input for images to detect specific face attributes and emotions such as age, gender, happiness, etc...

# Required

## X-Auth-Code
I haven't provided a Facebook login system (yet), so you'll have to login on Tinder's own online client, open the developer console with F12, go to the network tab, refresh the main page, and look for a file containing the word "profile", in here (on the Headers tab) you should find an x-auth-token in the Request Headers section. Take this token and paste it into the constant variable "X_AUTH_CODE" in services/tinder.service.ts. You should be logged in now once you run the server.

## CORS 
This application requires the use of a cross-origin resource sharing addon for your browser, this is necessary to add the 'Allow-Control-Allow-Origin: *' response header to every request. I recommend using this one: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

# Features
(these are subject to change)

## New profiles
 ![alt text](https://i.imgur.com/scdHLhx.jpg "New profiles")

## Matches
 ![alt text](https://i.imgur.com/AjXc0BM.jpg "Matches")

## User profile
 ![alt text](https://i.imgur.com/A7aJLQy.jpg "User profile")

## Passport
 ![alt text](https://i.imgur.com/zVxxL13.png "Passport")

## Face detection (experimental)
 ![alt text](https://i.imgur.com/LJWLmMv.png "Face detection")


# Default Angular commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
