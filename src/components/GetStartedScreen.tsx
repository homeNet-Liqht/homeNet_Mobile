import React from "react";
import {Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../screens/styles/globalStyles.ts";
import {appInfo} from "../constants/appInfo.ts";
import {transform} from "@babel/core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {alreadyAccess} from "../redux/reducers/authReducer.ts";

const GetStartedScreen = ({navigation}:any) => {
    const {setItem} = useAsyncStorage('alreadyAccess')
    const dispatch = useDispatch();

    return (
        <View style={{
            paddingTop: StatusBar.currentHeight,
            height: appInfo.size.HEIGHT,
            flex: 1
        }}>
            <ImageBackground source={require("../assets/imgs/Onboarding4.png")} style={[styles.ImgBg]}>
                <TouchableOpacity style={[styles.btn]} onPress={() => {
                    setItem("true")
                    dispatch(alreadyAccess(false))

                }}><Text style={[styles.text]}>Get Started</Text></TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    ImgBg: {
        width: appInfo.size.WIDTH,
        height: appInfo.size.HEIGHT,
    },
    btn: {
        backgroundColor: "#FF7A7A",
        borderRadius: 40,
        width: appInfo.size.WIDTH * 0.5,
        paddingHorizontal: 16,
        paddingVertical: 16,
        position: 'absolute',
        bottom: appInfo.size.HEIGHT * 0.08,
        right: 0,
        left: appInfo.size.WIDTH * 0.5 - appInfo.size.WIDTH * 0.5 / 2,
    },
    text: {
        textAlign: 'center',
        color: "white",
        fontWeight: "700",
        fontSize: 20
    }
})

export default GetStartedScreen
