import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules, SafeAreaView, Platform, Animated, Image } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from "react-native-navigation";
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

import PhoneAuth from '../../components/CustomPicker/app';

import firestore from "../../utils/firebase";
import { setUser } from '../../redux/firebase/actions/firebase';
import { startApp } from '../../authFlow';

const { RNTwitterSignIn } = NativeModules;

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const Profile = ({ componentId }) => {

  // State
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifier, setVerifier] = useState('');
  const [value, setValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  
  // Selectors
  const state = useSelector(s => s);
  console.log(state);
  
  // Actions
  const dispatch = useDispatch();

  // Done
  const signInWithTwitter = async () => {
      const Constants = {
          //Dev Parse keys
          TWITTER_COMSUMER_KEY: "ncPz2vm5Rc1dMPm3NeaMrL91L",
          TWITTER_CONSUMER_SECRET: "6uxqA9fL16VsQCva3700wf9Uc7kHJOYRx1ftCCg3jpRbraSLKk"
      }
      console.log('Login twitter');
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);

      // Perform the login request
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

      // Create a Twitter credential with the tokens
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

      // Sign-in the user with the credential
      const userdata = await auth().signInWithCredential(twitterCredential);
      console.warn(userdata);
      dispatch(setUser(userdata));
  };

  // Done
  const signInWithFacebook = async () => {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        //throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        //throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      const _firebaseUserCredential = await auth().signInWithCredential(facebookCredential);
      console.warn(_firebaseUserCredential);
      dispatch(setUser(_firebaseUserCredential));
  };
  
  // Done
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
        const credential = auth.GoogleAuthProvider.credential(gdata.idToken);
        let firebaseUserCredential = await auth().signInWithCredential(credential);
        console.warn(firebaseUserCredential);
        dispatch(setUser(firebaseUserCredential));

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

  const setPhoneModal = () => {
    setPhoneModalVisible(true);
  }

  const signInWithPhone = async (number) => {
    console.warn(number);
    const confirmation = await auth().signInWithPhoneNumber(`${number}`);
    setPhoneModalVisible(false);
    setTimeout(() => {
      setModalVisible(true);
      setVerifier(confirmation);
    }, 500);
  }

  const confirmSMS = async () => {
    console.log(verifier);
    console.log(value);
    let user = await verifier.confirm(value);
    console.log(user);
    dispatch(setUser(user));
    startApp();
  }

  // ComponentDidMount
  useEffect(() => {
    //firebase.initializeApp();
  })

  // ComponentDidAppear
  useNavigationComponentDidAppear((e) => {
      console.warn(e);
      console.log('ComponentDidAppear');
  });
  
  const AnimatedExample = () => {
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  
    const renderCell = ({index, symbol, isFocused}) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = {
        width: 56,
        height: 60,
        marginHorizontal: 4,
        backgroundColor: hasValue
          ? animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            })
          : animationsColor[index].interpolate({
              inputRange: [0, 1],
              outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            }),
        borderRadius: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
        }),
        transform: [
          {
            scale: animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 1],
            }),
          },
        ],
      };
  
      // Run animation on next event loop tik
      // Because we need first return new style prop and then animate this value
      setTimeout(() => {
        animateCell({hasValue, index, isFocused});
      }, 0);
  
      return (
        <AnimatedText
          key={index}
          style={[styles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      );
    };
  
    return (
      <View style={styles.root}>
        {/* <Text style={styles.title}>SMS Verification</Text> */}
        <Image style={styles.icon2} source={source} />
        <Text style={styles.subTitle}>
          Please enter the verification code{'\n'}
          we send to your phone number
        </Text>
  
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <TouchableOpacity onPress={() => confirmSMS()} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView style={{ width: '60%' }} source={require('./animation.json')} autoPlay loop />
      <View style={styles.login}>
        <TouchableOpacity style={styles.icon} onPress={signInWithFacebook}>
          <Icon style={{ marginRight: 10 }} name="facebook-square" size={24} color="#3b5998" />
          <Text style={{ fontWeight: 'bold', color: '#636363', fontSize: 13 }}>
            LOGIN WITH FACEBOOK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={signInWithGoogle}>
          <Icon style={{ marginRight: 10 }} name="google" size={24} color="#db3236" />
          <Text style={{ fontWeight: 'bold', color: '#636363', fontSize: 13 }}>
            LOGIN WITH GOOGLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={signInWithTwitter}>
          <Icon style={{ marginRight: 10 }} name="twitter" size={24} color="#00acee" />
          <Text style={{ fontWeight: 'bold', color: '#636363', fontSize: 13 }}>
            LOGIN WITH TWITTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={(setPhoneModal)}>
          <Icon style={{ marginRight: 10 }} name="phone" size={24} color="#00acee" />
          <Text style={{ fontWeight: 'bold', color: '#636363', fontSize: 13 }}>
            LOGIN WITH PHONE
          </Text>
        </TouchableOpacity>
      </View>
      <Modal 
        style={{ padding: 0, margin: 0 }}
        isVisible={isModalVisible}
        animationIn='bounceInUp'
        //animationOut='bounceInDown'
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection='down'
        onSwipeComplete={() => setModalVisible(false)}>
        <View style={styles.modal}>
          { AnimatedExample() }
        </View>
      </Modal>
      <Modal 
        style={{ padding: 0, margin: 0 }}
        isVisible={isPhoneModalVisible}
        animationIn='bounceInUp'
        //animationOut='bounceInDown'
        onBackdropPress={() => setPhoneModalVisible(false)}>
        <View style={styles.phoneMmodal}>
          <PhoneAuth signInWithPhone={signInWithPhone} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Profile;

const CELL_SIZE = 70;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

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
    height: 40,
    width: '70%',
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center' ,
    flexDirection: 'row'
  },
  login: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    height: Platform.OS == 'ios' ? '60%' : '80%',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneMmodal: {
    backgroundColor: '#fff',
    width: '90%',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10
  },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  root: {
    //minHeight: 800,
    //padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon2: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 50,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: '60%',
    maxWidth: '60%',
    marginBottom: 100,
    alignSelf: 'center'
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});