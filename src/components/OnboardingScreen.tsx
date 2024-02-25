import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../screens/styles/globalStyles.ts";
import Swiper from 'react-native-swiper';
import {appInfo} from "../constants/appInfo.ts";
import {appColors} from "../constants/appColors.ts";
import TextComponent from "./TextComponent.tsx";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const OnboardingScreen = ({navigation}: any) => {
    const [index, setIndex] = useState(0)

    return (
        <View style={[globalStyles.container]}>
            <Swiper style={{}} loop={false} activeDotStyle={{width: 30,}} activeDotColor={appColors.white}
                    onIndexChanged={num => setIndex(num)} index={index}>
                <Image source={require("../assets/oboarding1.png")}
                       style={styles.onboarding}/>
                <Image source={require("../assets/onboarding2.png")}
                       style={styles.onboarding}/>
                <Image source={require("../assets/onboarding3.png")}
                       style={styles.onboarding}/>
            </Swiper>
            <View style={[{
                paddingHorizontal: 16,
                paddingVertical: 16,
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center'
            }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("GetStartedScreen")}><TextComponent text={"Skip"} size={18} color={'white'} /></TouchableOpacity>
                <TouchableOpacity style={{
                    borderRadius: 60,
                    backgroundColor: appColors.white,
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => index < 2 ? setIndex(index+1) : navigation.navigate("GetStartedScreen")} ><FontAwesome name={'angle-right'} size={22} color={appColors.gray}/></TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    onboarding: {
        flex: 1,
        width: appInfo.size.WIDTH,
        height: appInfo.size.HEIGHT,
        resizeMode: "cover"
    },

});

export default OnboardingScreen;
