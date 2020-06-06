import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

navigator.geolocation = require('@react-native-community/geolocation');

const Profile = ({ componentId }) => {

    // Selectors
    const state = useSelector(s => s);
    console.log(state);
    
    // Actions
    const dispatch = useDispatch();

    // ComponentDidMount
    useEffect((e) => {
        console.log(e);
        console.log('ComponentDidAppear');
    });

    // ComponentDidAppear
    useNavigationComponentDidAppear((e) => {
        console.log(e);
        console.log('ComponentDidAppear');
    });
    
    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Text>Google Maps</Text>
            <MapView
                provider={PROVIDER_GOOGLE} // using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}/>
            <Text>iOS Maps</Text>
            <MapView
                //provider={PROVIDER_GOOGLE} // without Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}/>
            <Text>Satellite Map</Text>
            <MapView
                provider={PROVIDER_GOOGLE} // without Google Maps
                style={styles.map}
                mapType='satellite'
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}/>
            <Text>hybrid Map</Text>
            <MapView
                provider={PROVIDER_GOOGLE} // without Google Maps
                style={styles.map}
                mapType='hybrid'
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}/>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    map: {
      //...StyleSheet.absoluteFillObject,
      width: '100%',
      height: 200,
      alignSelf: 'flex-end'
    },
});