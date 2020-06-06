import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'react-native-admob';

const Profile = ({ componentId }) => {

    useEffect((e) => {

    });
    
    // ComponentDidAppear
    useNavigationComponentDidAppear((e) => {
        console.log(e);
        console.log('ComponentDidAppear');
    });

    loadRewardedAd = () => {
        AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
        AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
    }

    loadInterstitialAd = () => {
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Interstitial Image
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); // Interstitial Video
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={{ justifyContent: 'center', margin: 10 }} onPress={() => loadInterstitialAd()}>
                <Text>Load AdMobInterstitial Ad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', margin: 10 }} onPress={() => loadRewardedAd()}>
                <Text>Load AdMobRewarded Ad</Text>
            </TouchableOpacity>    

            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Banner</Text>
            <AdMobBanner
                adSize={'banner'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>fullBanner</Text>
            <AdMobBanner
                adSize={'fullBanner'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>mediumRectangle</Text>
            <AdMobBanner
                adSize={'mediumRectangle'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>fullBanner</Text>
            <AdMobBanner
                adSize={'fullBanner'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>leaderboard</Text>
            <AdMobBanner
                adSize={'leaderboard'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>smartBannerPortrait</Text>
            <AdMobBanner
                adSize={'smartBannerPortrait'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>smartBannerLandscape</Text>
            <AdMobBanner
                adSize={'smartBannerLandscape'}
                adUnitID={'ca-app-pub-3940256099942544/6300978111'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}/>                

            <PublisherBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                testDevices={[PublisherBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}
                onAppEvent={event => console.log(event.name, event.info)}/>        
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});