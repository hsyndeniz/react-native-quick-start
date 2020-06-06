import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { GoogleSignin } from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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

  /**
   * @method to login with email and password
   * @param user (email and password)
   */
  login = (user) => {
    let userInfo = {};
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(result => {
        userInfo.user = result.user;
        let userRef = firebase.firestore().collection('users').doc(result.user.uid);
        userRef.get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            reject('Hata!');
          } else {
            console.log(doc.data());
            userInfo.userData = doc.data()
            resolve(userInfo);
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
          reject('Hata!');
        });
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  /**
   * @method to register with email and password
   * @param user (email, password & name)
   */
  register = async (user) => {
    console.log(user);
    let userData;
    try {
      userData = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log('Create user successfully!');
      console.log(userData);
    } catch (error) {
      console.log('Create user error...');
      console.log(error);
      throw new Error(error);
    }

    try {
      firebase.firestore().collection('users').doc(userData.user.uid).set({
        uid: userData.user.uid,
        avatar: user.avatar,
        bio: user.bio,
        bornDate: Date.now(),
        city: user.city,
        country: user.country,
        email: user.email,
        gender: user.gender,
        instagram: user.instagram,
        facebook: user.facebook,
        twitter: user.twitter,
        name: user.name.toLowerCase(),
        phone: user.phone,
        rating: user.rating,
        level: user.level,
        minutes: user.minutes,
        surname: user.surname.toLowerCase(),
        token: user.token,
        credit: 90,
        call_count: 0,
        friends: [],
        province: user.province,
        age: user.age
      }).then(value => {
        console.log(value);
      });
    } catch (error) {
      throw new Error(error);
    }

    try {
      let cUser = {};
      cUser.userData = user;
      cUser.uid = userData.user.uid;
      await firebase.auth().currentUser.sendEmailVerification();
      console.log('Email confirmation sent...');
    } catch (error) {
      console.log('error on email confirmation...');
      console.log(error);
      throw new Error(error);
    }
  }

  fetchUser = () => {
    let user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('users').doc(`${user.uid}`).get().then(function(querySnapshot) {
        let userInfo = querySnapshot.data();
        user.userInfo = userInfo;
      }).then(() => {
        console.log(user);
        resolve(user);
      }).catch(error => {
        reject(error);
      });
    });
  }

  bootstrap = async () => {
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '780104013643-45p54erearjaa8mht75ispr809ddqd9p.apps.googleusercontent.com', // required
      iosClientId: '780104013643-tppfvrlpkufkoj1k5r4tmu639olpi21g.apps.googleusercontent.com'
    });
  }

  loginWithGoogle = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const gdata = await GoogleSignin.signIn();
        console.warn(gdata);        
        console.log(gdata.accessToken, gdata.idToken);
        const credential = firebase.auth.GoogleAuthProvider.credential(gdata.idToken, gdata.accessToken);
        console.log(credential);
        //firebase.auth().signInWithPopup()
        let firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        //console.warn(data);
        
        try {
          firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).get().then(function(querySnapshot) {
            let userData = querySnapshot.data();
            if (userData == undefined) {
              firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
                uid: firebaseUserCredential.user.uid,
                avatar: firebaseUserCredential.user.photoURL,
                bio: '',
                bornDate: '',
                city: '',
                country: '',
                email: firebaseUserCredential.user.email,
                gender: '',
                instagram: '',
                facebook: '',
                twitter: '',
                name: firebaseUserCredential.user.displayName.toLowerCase(),
                phone: firebaseUserCredential.user.phoneNumber,
                rating: '',
                level: '',
                minutes: '',
                surname: '',
                token: '',
                credit: 90,
                friends: [],
                call_count: 0,
                province: '',
                age: '',
              }).then(value => {
                firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).get().then(function(querySnapshot) {
                  let userData = querySnapshot.data();
                  let _user = {};
                  _user.user = firebaseUserCredential.user;
                  _user.userData = userData;
                  resolve(_user);
              })
              });
            } else {
              console.warn('userData right');
              console.warn(userData);
              let _user = {};
              _user.user = firebaseUserCredential.user;
              _user.userData = userData;
              resolve(_user);
            }
          }).then(() => {
            console.log(user);
          }).catch(error => {
            console.log(error);
          });

        } catch (error) {
          throw new Error(error);
        }
      } catch (error) {
        console.log(error)
      }
    })
    
  }

  loginWithFacebook = (user) => {
    console.warn('loginWithFacebook');

    return new Promise(async (resolve, reject) => {
      try {
        console.log('trying to logout before login');

        try {
          //LoginManager.logOut();
        } catch (error) {
          console.log(error);
        }

        try {
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          console.log('LoginManager.logInWithPermissions');
          console.log(result);

          if (result.isCancelled) {
            // handle this however suites the flow of your app
            console.log('cancelled')
          }
        } catch (error) {
          console.log(error)
        }
    
  let data;
        try {
          // get the access token
          const _data = await AccessToken.getCurrentAccessToken();
    
          console.log('AccessToken.getCurrentAccessToken()');
          console.log(_data);
          data = _data
          if (!_data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
          }
        } catch (error) {
          console.log(error)
        }
  

        let credential;
        try {
          // create a new firebase credential with the token
          const _credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
          
          credential = _credential;
          console.log('credential');
          console.log(_credential);
        } catch (error) {
          console.log(error)
        }

        let firebaseUserCredential;
        try {
          // login with credential
          const _firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

          firebaseUserCredential = _firebaseUserCredential;
          console.log('_firebaseUserCredential')
          console.log(_firebaseUserCredential)
        } catch (error) {
          console.log(error)
        }

        try {
          firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).get().then(function(querySnapshot) {
            let userData = querySnapshot.data();
            if (userData == undefined) {
              firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
                uid: firebaseUserCredential.user.uid,
                avatar: firebaseUserCredential.additionalUserInfo.profile.picture.data.url,
                bio: '',
                bornDate: '',
                city: '',
                country: '',
                email: firebaseUserCredential.user.email,
                gender: '',
                instagram: '',
                facebook: firebaseUserCredential.additionalUserInfo.profile.id,
                twitter: '',
                name: firebaseUserCredential.user.displayName.toLowerCase(),
                phone: '',
                rating: '',
                level: '',
                minutes: '',
                surname: '',
                token: '',
                credit: 90,
                friends: [],
                call_count: 0,
                province: '',
                age: '',
              }).then(value => {
                firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid).get().then(function(querySnapshot) {
                  let userData = querySnapshot.data();
                  let _user = {};
                  _user.user = firebaseUserCredential.user;
                  _user.userData = userData;
                  resolve(_user);
              })
              });
            } else {
              console.warn('userData right');
              console.warn(userData);
              let _user = {};
              _user.user = firebaseUserCredential.user;
              _user.userData = userData;
              resolve(_user);
            }
          }).then(() => {
            console.log(user);
          }).catch(error => {
            console.log(error);
          });

        } catch (error) {
          throw new Error(error);
        }
      } catch (e) {
        console.error(e);
      }
    })
    
  }

  uploadPhoto(image, uid, mime) {
    console.log('--------------------*****************')
    console.log(image);
    console.log(uid);
    console.log(mime);
    return new Promise(async (resolve, reject) => {
      await firebase.storage().ref(`avatars/${uid}`).put(image, { contentType: mime }).on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        console.log(snapshot);
        let state = {};
        state = {
          ...state,
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
        };
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.warn('end');
        }
      },
      error => {
        console.log(error);
        //alert('Sorry, Try again.');
      });
      firebase.storage().ref(`avatars/${uid}`).getDownloadURL().then(uri => {
        resolve(uri);
      })
    })
  }

  changePassword = (mail) => {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(mail).then(res => {
        console.log(res);
        resolve(res)
      }).catch(err => {
        console.log(err);
      })
    });
  }

}

export default new FirebaseSVC();