import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { GoogleSignin } from '@react-native-community/google-signin';

/**
 * @class Firebase Lib.
 * @author Huseyin RAN
 */
class FirebaseSVC {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAbG5JC6wHiEsZLZHe0V6Emqau0i2zg0Sg",
        authDomain: "englishium.firebaseapp.com",
        databaseURL: "https://englishium.firebaseio.com",
        projectId: "englishium",
        storageBucket: "englishium.appspot.com",
        messagingSenderId: "780104013643",
        appId: "1:780104013643:web:1e9c5818e629bb5aff3ace",
        measurementId: "G-5HSN2M4JGE"
      });
    }
    this.bootstrap();
  }

  bootstrap = async () => {
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '780104013643-45p54erearjaa8mht75ispr809ddqd9p.apps.googleusercontent.com', // required
      iosClientId: '780104013643-tppfvrlpkufkoj1k5r4tmu639olpi21g.apps.googleusercontent.com'
    });
  }
}

export default new FirebaseSVC();