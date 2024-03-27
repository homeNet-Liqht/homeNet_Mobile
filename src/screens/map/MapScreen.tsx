import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

function MapScreen() {


    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
}

export default MapScreen;
