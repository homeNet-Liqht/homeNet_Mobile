import React from "react";
import {ImageBackground} from "react-native";


const WelComeScreen = () => {
  return (
      <ImageBackground
          source={require("../../assets/splash.png")}
          resizeMode={"cover"}
          style={{flex: 1, padding: 15}}>


      </ImageBackground>
  )
}

export default WelComeScreen
