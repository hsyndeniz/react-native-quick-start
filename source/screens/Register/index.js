import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules, SafeAreaView, TextInput, Image } from 'react-native';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from "firebase";

import firestore from "../../utils/firebase";

const { RNTwitterSignIn } = NativeModules;

const Register = () => {

  const signInWithTwitter = async () => {
      const Constants = {
          //Dev Parse keys
          TWITTER_COMSUMER_KEY: "ncPz2vm5Rc1dMPm3NeaMrL91L",
          TWITTER_CONSUMER_SECRET: "6uxqA9fL16VsQCva3700wf9Uc7kHJOYRx1ftCCg3jpRbraSLKk"
      }
      console.log('Login twitter');
      await firebase.auth().signOut();
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
      RNTwitterSignIn.logIn()
        .then(loginData => {
          console.log(loginData);
          //const { authToken, authTokenSecret } = loginData;
          const twitterCredential = firebase.auth.TwitterAuthProvider.credential(loginData.authToken, loginData.authTokenSecret);
          console.log(twitterCredential);
          firebase.auth().signInWithCredential(twitterCredential).then(test => {
              console.log(test);
          }).catch(error => {
              console.log(error);
          })
        })
        .catch(error => {
          console.log(error)
        }
      )
  };

  const signInWithFacebook = async () => {
      console.log('Login facebook');
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      console.log('result');  
      console.log(result);  
      if (result.isCancelled) {
          // handle this however suites the flow of your app
          console.log('cancelled')
      }  
      const _data = await AccessToken.getCurrentAccessToken();
      console.log('_data');
      console.log(_data);
      const _credential = firebase.auth.FacebookAuthProvider.credential(_data.accessToken);
      console.log('_credential');
      console.log(_credential);
      try {
          const _firebaseUserCredential = await firebase.auth().signInWithCredential(_credential);
          console.log('_firebaseUserCredential');
          console.log(_firebaseUserCredential);
      } catch (error) {
          console.log(error);
      }
  };
  
  const signInWithGoogle = async () => {
      try {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
          webClientId: '789119417561-1nu990ebd1he6vion6ml0463mgjba7ak.apps.googleusercontent.com',
          iosClientId: '789119417561-24p5jp6hmnjl4g67i0o67t09h1jg9he6.apps.googleusercontent.com', // required
          //iosClientId: '789119417561-kqqgv1dk59049898dj0sedv938n46o9u.apps.googleusercontent.com'
        });
        await GoogleSignin.hasPlayServices();
        const gdata = await GoogleSignin.signIn();
        //this.setState({ userInfo });
        console.log(gdata);
        // Creates the provider object.
      
        console.log(gdata.accessToken, gdata.idToken);
        const credential = firebase.auth.GoogleAuthProvider.credential(gdata.idToken, gdata.accessToken);
        console.log(credential);
        //firebase.auth().signInWithPopup()
        let firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        console.warn(firebaseUserCredential);
        
      } catch (error) {
          console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
  };

  const login = async () => {

  }

  const register = async () => {

  }

  const forgotPassword = async () => {

  }

  // Selectors
  const state = useSelector(s => s);
  console.log(state);
  
  // Actions
  const dispatch = useDispatch();

  // ComponentDidMount
  useEffect(() => {

  })

  // ComponentDidAppear
  useNavigationComponentDidAppear((e) => {
      console.log(e);
      console.log('ComponentDidAppear');
      const firebaseConfig = {
          apiKey: "AIzaSyA58OfDsS8Og55fuX1S1eH_Dty1ajMYQuc",
          authDomain: "react-native-78030.firebaseapp.com",
          databaseURL: "https://react-native-78030.firebaseio.com",
          projectId: "react-native-78030",
          storageBucket: "react-native-78030.appspot.com",
          messagingSenderId: "789119417561",
          appId: "1:789119417561:web:70d37663e9846082bed2c8",
          measurementId: "G-VQMDH77BDF"
        };
        // Initialize Firebase
        try {
          firebase.initializeApp(firebaseConfig);
        } catch (error) {
          console.log(error);
        }
  });
    
  return (
    <SafeAreaView style={styles.container}>
      <LottieView style={{ width: '60%' }} source={require('./animation.json')} autoPlay loop />
      <View style={{ backgroundColor: '#eee', width: '80%', height: 180, borderRadius: 20, justifyContent: 'center', alignItems: 'center'  }}>
        <View style={styles.searchSection}>
          <Icon style={styles.searchIcon} name="user" size={30} color="#000"/>
          <TextInput
            style={styles.input}
            placeholder="mail"
            onChangeText={(searchString) => {this.setState({searchString})}}
            underlineColorAndroid="transparent"/>
        </View>
        <View style={styles.searchSection}>
          <Icon style={styles.searchIcon} name="lock1" size={30} color="#000"/>
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(searchString) => {this.setState({searchString})}}
            underlineColorAndroid="transparent"/>
        </View>
      </View>
      <TouchableOpacity onPress={login} style={{ backgroundColor: 'orange', width: '40%', height: 50, borderRadius: 10, top: -25, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center', textAlignVertical: 'center' }}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={forgotPassword} style={{ marginVertical: '2%' }}>
        <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register} style={{ marginVertical: '2%' }}>
        <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: '3%' }}>
        <TouchableOpacity style={styles.icon} onPress={signInWithFacebook}>
          <Icon name="facebook-square" size={26} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={signInWithGoogle}>
          <Icon name="google" size={26} color="#db3236" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={signInWithTwitter}>
          <Icon name="twitter" size={26} color="#00acee" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff033e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 35,
    height: 70,
    width: 70,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  searchSection: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#fff',
    borderRadius: 20
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontSize: 17,
    //backgroundColor: '#fff',
    color: '#424242',
  },
});