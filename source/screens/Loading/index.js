import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { useSelector, useDispatch } from 'react-redux';
import { startApp } from '../../App';
import { startApp as noAuth } from '../../noAuth';

const Profile = () => {

    // Selectors
    const firebase = useSelector(s => s.firebase);
    console.log(firebase);
    
    // Actions
    const dispatch = useDispatch();

    // ComponentDidMount
    useEffect(() => {
        if (!firebase.user.user) {
            noAuth();
        } else {
            startApp();
        }
    })

    // ComponentDidAppear
    useNavigationComponentDidAppear((e) => {
        console.log(e);
        console.log('ComponentDidAppear');
    });
    
    // LottiFile loading animation
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => console.log('test')}>
                <Text style={{ color: '#222', fontWeight: 'bold' }}>
                    Loading
                </Text>
            </TouchableOpacity>
            <ActivityIndicator size={30} color="#900" />
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});