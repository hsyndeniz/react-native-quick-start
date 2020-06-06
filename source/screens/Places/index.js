import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

navigator.geolocation = require('@react-native-community/geolocation');

const Profile = ({ componentId }) => {

    // Selectors
    const state = useSelector(s => s);
    console.log(state);
    
    // Actions
    const dispatch = useDispatch();

    // ComponentDidMount
    useEffect(() => {

    });

    // ComponentDidAppear
    useNavigationComponentDidAppear((e) => {
        console.log(e);
        console.log('ComponentDidAppear');
    });
    
    return (
        <GooglePlacesAutocomplete
            style={{ flex: 1, width: '100%' }}
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            currentLocation={true}
            currentLocationLabel='Current location'
            query={{
                key: 'AIzaSyDG0h4gLwhgepXFvkqIvd7-x8GOHK48jVc',
                language: 'en',
        }}/>
    )
}

export default Profile

const styles = StyleSheet.create({});