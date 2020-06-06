# React Native Quick Start
A React Native project template for building mobile applications with Redux state management, Firebase Auth, Google Maps, Google Admob and React Native Navigation

![alt text](https://i.ibb.co/RjDptby/back2.png)


## What’s Included?
- [x] Redux State Management (with redux-persist)
- [x] React Native Navigation (wix)
- [x] React Native Vector Icons
- [x] React Native Firebase Auth
  - [x] Google Auth
  - [x] Facebook Auth
  - [x] Twitter Auth
  - [x] Phone Auth
- [x] React Native Firebase Push Notification
- [x] React Native Async Storage
- [x] Lottie React Native
- [x] React Native Admob
- [x] React Native Google Places
- [x] React Native Maps
#### TODO
- [ ] React Native In-App Purchase

## Using the template

To create a new project using the boilerplate:

- clone this repository
- remove the previous git history: `rm -rf .git/`
- install the npm dependencies by running `npm install`
- feel free to rename the project
- remove the LICENSE file

You can now create a new git repository for your project (using `git init`) and create the first commit.

## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `npm install` to install the dependencies
- replace google-services.json in `android/app` and GoogleService-Info.plist in `ios` with your own.
- replace firebaseConfig in source/screens/Auth and take a look at the auth packages for other configurations
- run the following steps for your platform

### Android

- `react-native run-android`

### iOS

- `cd ios && pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `npm start` to start the metro bundler, in a dedicated terminal
- `react-native run-ios` to run the iOS application 
