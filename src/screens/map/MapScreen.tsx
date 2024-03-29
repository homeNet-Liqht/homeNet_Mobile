import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {appInfo} from "../../constants/appInfo.ts";
import {ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../components";
import MapView, {Marker} from "react-native-maps";
import getCurrentPosition from "../../utils/getCurrentPosition.ts";
import {LoadingModal} from "../../modals";
import {Clock} from "iconsax-react-native";
import {appColors} from "../../constants/appColors.ts";
import locationApi from "../../apis/locationApi.ts";
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from "@gorhom/bottom-sheet";
import {familyApi} from "../../apis";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reducers/userReducer.ts";


import MapViewDirections from 'react-native-maps-directions';

const ASPECT_RATIO = appInfo.size.WIDTH / appInfo.size.HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


interface data {
    location: {
        coordinates: [number, number]
    },
    _id: string,
    memberName: string,
    photo?: string
}

const initialState: data[] = [{
    location: {
        coordinates: [0, 0]
    },
    _id: "",
    memberName: "",
}]

const MapScreen = () => {
    const [members, setMembers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0
    })
    const [membersLocation, setMembersLocation] = useState<data[]>(initialState)
    const [userData, setUserData] = useState(useSelector(userSelector))

    useEffect(() => {
        getUserPosition().then((item) => {
            setUserPosition({latitude: item.latitude, longitude: item.longitude})
            setIsLoading(false)
        })
        fetchMember()
    }, []);


    const fetchMember = async () => {
        try {
            const res = await familyApi.getFamily();
            setMembers(res.data.data.members);

        } catch (error) {
            console.log(error);
        }
    };

    const getUserPosition = async () => {
        setIsLoading(true)
        const currentPosition = await getCurrentPosition();
        return currentPosition
    }


    useEffect(() => {
        getMemberLocation()
        const intervalId = setInterval(async () => {
            try {
                const res = await locationApi.getMembersLocation()
                setMembersLocation(res.data.data)
            } catch (e) {
                console.log("error", e)
            }
        }, 15000);


    }, [])


    const getMemberLocation = async () => {
        try {
            const res = await locationApi.getMembersLocation()
            setMembersLocation(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }


    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentPress = () => {
        bottomSheetModalRef.current?.present();
    };
    const mapRef = useRef<MapView>(null);
    const moveToMarker = (latitude: any, longitude: any) => {
        if (latitude != 0 || longitude != 0) {
            if (mapRef.current) {
                mapRef.current.animateToRegion(
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    },
                    1000 // duration in milliseconds
                );
            }
        }
    };


    const distanceBetweenUser = (lat: any, lon: any) => {
        const distance = require("fast-haversine");
        const userLocation = {
            lat: userPosition.latitude,
            lon: userPosition.longitude
        }

        const user = {lat: parseFloat(lat), lon: parseFloat(lon)}

        if (user.lon != 0) {
            const distances = Math.round(distance(user, userLocation) / 100) / 10
            return distances
        }

    }

    return (
        <>

            <ContainerComponent title={"Map"}>
                <RowComponent styles={{
                    width: appInfo.size.WIDTH * 0.99,
                    alignItems: "center",
                    paddingBottom: 5

                }} justify={"space-around"}>

                    <RowComponent styles={{flex: 1}}>
                        <TextComponent text={userData.memberName} styles={{fontWeight: "bold"}} size={16}
                                       color={appColors.red}/>
                    </RowComponent>

                    <RowComponent styles={{flex: 1}}>
                        {
                            membersLocation.map((item: any, index: any) => (

                                item.location.coordinates[1] != 0 && <TouchableOpacity key={index} onPress={() => {
                                    setUserData(item)
                                    handlePresentPress()
                                    moveToMarker(item.location.coordinates[1], item.location.coordinates[0])
                                }}>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: userData._id == item._id ? appColors.red : appColors.gray1,
                                        borderRadius: 100,
                                        marginLeft: 1,
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }}>
                                        {
                                            item.photo
                                                ?
                                                <Image style={{
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 100
                                                }} source={{uri: item.photo}}/>
                                                :
                                                <View>
                                                    <TextComponent text={item.memberName[0]}/>
                                                </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </RowComponent>
                </RowComponent>

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
                            ref={mapRef}
                        >
                            {
                                membersLocation.map((item, index) => {
                                        return (<Marker
                                            key={index}
                                            coordinate={{
                                                latitude: item.location.coordinates[1],
                                                longitude: item.location.coordinates[0]
                                            }}
                                            onPress={() => {

                                                setUserData(item)
                                                handlePresentPress()
                                                moveToMarker(item.location.coordinates[1], item.location.coordinates[0])
                                            }}
                                            title={item.memberName}
                                            pinColor='green'

                                        >
                                            <View style={{
                                                height: 50,
                                                width: 50,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: userData._id == item._id ? appColors.red : appColors.gray1,
                                                borderRadius: 100
                                            }}>
                                                {
                                                    item.photo ?
                                                        <Image width={49} height={49} style={{
                                                            borderRadius: 100,
                                                        }} source={{uri: item.photo}}/>

                                                        :

                                                        <TextComponent text={item.memberName[0]}/>
                                                }
                                            </View>

                                        </Marker>)
                                    }
                                )
                            }



                        </MapView>
                    </>

                }


                <LoadingModal visible={isLoading}/>
            </ContainerComponent>
            <BottomSheetModal

                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={() => {
                }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View>
                        {
                            membersLocation.map((item, index) => (
                                item.location.coordinates[1] != 0 &&

                                <TouchableOpacity onPress={() => {
                                    setUserData(item)
                                    moveToMarker(item.location.coordinates[1], item.location.coordinates[0])
                                }} key={index}>
                                    <View style={{
                                        width: appInfo.size.WIDTH * 0.95,
                                        height: appInfo.size.WIDTH * 0.2,
                                        backgroundColor: userData._id == item._id ? appColors.gray1 : 'white',
                                        borderRadius: 50,
                                        alignItems: "center",
                                        flexDirection: "row"
                                    }}>

                                        {
                                            item.photo ?
                                                <Image height={appInfo.size.WIDTH * 0.18}
                                                       width={appInfo.size.WIDTH * 0.18}
                                                       style={{
                                                           borderRadius: 100,
                                                           marginLeft: appInfo.size.WIDTH * 0.01

                                                       }}
                                                       source={{uri: item.photo}}/>
                                                :
                                                <View
                                                    style={{
                                                        height: appInfo.size.WIDTH * 0.18,
                                                        width: appInfo.size.WIDTH * 0.18,

                                                        backgroundColor: appColors.primary,
                                                        marginLeft: appInfo.size.WIDTH * 0.01,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: 100,
                                                    }}
                                                >
                                                    <TextComponent text={item.memberName[0]}/>
                                                </View>
                                        }

                                        <View
                                            style={{
                                                marginLeft: 10,
                                                height: appInfo.size.WIDTH * 0.15,
                                                alignItems: "flex-start",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <TextComponent styles={{
                                                fontWeight: "bold",
                                                color: userData._id == item._id ? appColors.red : appColors.gray1
                                            }} size={18} text={item.memberName}/>
                                            <TextComponent
                                                color={userData._id == item._id ? appColors.primary : appColors.gray1}
                                                text={`< ${distanceBetweenUser(item.location.coordinates[1], item.location.coordinates[0]).toString()} Km`}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
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

export default MapScreen;
