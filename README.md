# Project Flare ![alt text](https://i.imgur.com/UdhMhNL.png "Project Flare logo")

Project Flare is a full-fledged Tinder web client made in Angular with extra features such as the ability to see profile picture success rate (If Smart Photos is enabled), See possible matches, Search profile on Facebook/Instagram, an input for images to detect specific face attributes and emotions such as age, gender, happiness, etc...

![alt text](https://i.imgur.com/7iMZrfA.jpg?1 "Project Flare")

# Required

## X-Auth-Code
I haven't provided a Facebook login system (yet), so you'll have to login on Tinder's own online client, open the developer console with F12, go to the network tab, refresh the main page, and look for an API call containing the word "profile", in here (on the Headers tab) you should find an x-auth-token in the Request Headers section. Take this token and paste it into the constant variable "X_AUTH_CODE" in all the service files in the folder "services/..." You should be logged in now once you run the development server.

## CORS 
This application requires the use of cross-origin resource sharing. I have included the proxy server needed to apply CORS. This is necessary to add the appropriate response header to every request going to the external Tinder API.

This proxy server needs to run before you run the main application. To run the server go to the "proxy-server" directory and in that directory run the command "node server.js".

# Features
(these are subject to change)
## User
- See every profile picture's success rate
- Basic profile information (Name, bio, etc..) 
- Enable Smart Photos

#### (Planned features coming soon) 
- Edit user profile
- Change distance & age visibility (Tinder Plus/Gold)

## New profiles
- Like/Pass/Superlike profiles
- All profile information (Name, age, bio, distance)
- Change distance & age filters
- Possible matches feature
- Approximate location feature
- Fullscreen profile images
- See the success rate of other people's pictures
- Open a separate profile window to Like/Pass/Superlike this specific profile when you want
- Facebook search (if job or school is mentioned in profile)
- Instagram search (if Instagram is linked)
- Superlike/Boost countdown feature to see when your superlikes/boost get refreshed

#### (Planned features coming soon) 
- Ability to see if someone superliked you before matching
- Enable boost

## Matches
- Unmatch feature
- See last sent message
- Ability to see if a match is a Superlike/Fast(Tinder Gold)/Boost match

## Messages
- Send messages like in the app (Only last 10 sent messages are visible for now)
- Ability to see GIFs in chat

#### (Planned features coming soon) 
- Send GIFs

## Passport (Must have Tinder Plus/Gold)
- Change your location to anywhere on the world map
- See your actual location & your location you're traveling to
- Reset travel location

## Face detection (experimental)
- input for images to detect specific face attributes and emotions such as age, gender, happiness, anger, etc...



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
