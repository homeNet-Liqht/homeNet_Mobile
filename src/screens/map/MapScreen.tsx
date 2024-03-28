import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native'

import {appInfo} from "../../constants/appInfo.ts";
import {ContainerComponent, TextComponent} from "../../components";
import MapView, {Marker} from "react-native-maps";
import getCurrentPosition from "../../utils/getCurrentPosition.ts";
import {LoadingModal} from "../../modals";
import {Clock} from "iconsax-react-native";
import {appColors} from "../../constants/appColors.ts";


const ASPECT_RATIO = appInfo.size.WIDTH / appInfo.size.HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const App = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0
    })
    const mapRef = useRef()
    const markerRef = useRef()


    useEffect(() => {
        getUserPosition().then((item) => {
            setUserPosition({latitude: item.latitude, longitude: item.longitude})
            setIsLoading(false)
        })
    }, []);


    const getUserPosition = async () => {
        setIsLoading(true)
        const currentPosition = await getCurrentPosition();
        return currentPosition

    }


    return (
        <ContainerComponent title={"Map"}>
            {
                userPosition.latitude != 0 && <>

                    <MapView
                        style={{
                            width: appInfo.size.WIDTH,
                            height: appInfo.size.HEIGHT
                        }}
                        userLocationUpdateInterval={5000}
                        userLocationFastestInterval={5000}
                        showsUserLocation={true}
                        showsScale
                        showsMyLocationButton={true}
                        initialRegion={{
                            latitude: userPosition.latitude,
                            longitude: userPosition.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                    >
                        <Marker
                            coordinate={{latitude: 16.0617, longitude: 108.2469}}
                            title={"qun"}
                        />


                    </MapView>
                </>


            }
            <LoadingModal visible={isLoading}/>
        </ContainerComponent>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
});

export default App;
