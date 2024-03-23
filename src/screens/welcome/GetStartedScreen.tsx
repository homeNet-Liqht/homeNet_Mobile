import React from "react";
import {ImageBackground} from "react-native";


const GetStartedScreen = () => {
  return (
      <ImageBackground
          source={require("../../assets/imgs/splash.png")}
          resizeMode={"cover"}
          style={{flex: 1, padding: 15}}>
      </ImageBackground>
  )
}

export default GetStartedScreen
