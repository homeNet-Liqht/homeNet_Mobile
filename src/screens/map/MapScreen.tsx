import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {ButtonComponent} from "../../components";
import {useDispatch} from "react-redux";
import {removeAuth} from "../../redux/reducers/authReducer.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {appInfo} from "../../constants/appInfo.ts"; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: appInfo.size.HEIGHT,
        width: appInfo.size.WIDTH,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

function MapScreen() {
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>
    );
}

export default MapScreen;
