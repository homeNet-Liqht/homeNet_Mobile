import React from 'react';
import {ActivityIndicator, Animated, ImageBackground, Text} from "react-native";
import View = Animated.View;
import {SpaceComponent} from "../../components";


function SplashScreen() {
    return (
        <ImageBackground
            source={require("../../assets/imgs/splash-img.png")}
            resizeMode={"cover"}
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <View style={{
                width: '100%',
                alignItems: "center"
            }}>
                <Text
                    style={{
                        fontSize: 40,
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    home<Text style={{color:"#ECB22F"}}>Net</Text>
                </Text>
            </View>
            <SpaceComponent height={20}/>
            <ActivityIndicator color={"#ECB22F"} size={22} />
        </ImageBackground>
    );
}

export default SplashScreen;
