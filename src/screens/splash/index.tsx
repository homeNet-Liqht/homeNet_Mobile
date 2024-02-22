import React from 'react';
import {Animated, ImageBackground, Text} from "react-native";
import View = Animated.View;


function SplashScreen() {
    return (
        <ImageBackground
            source={require("../../assets/splash-img.png")}
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
                    home<Text style={{color:"yellow"}}>Net</Text>
                </Text>
            </View>
        </ImageBackground>
    );
}

export default SplashScreen;
