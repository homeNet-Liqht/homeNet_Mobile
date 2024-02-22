import React, {useEffect, useState} from 'react';

import {SplashScreen} from "./src/screens";
import AuthNavigator from "./src/navigators/AuthNavigator.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";

function App(): React.JSX.Element {
    const [isShowSplash, setIsShowSplash] = useState(true)
    useEffect(() =>{
        const timeout = setTimeout(() =>{
            setIsShowSplash(false)
        },1500)
        return () => clearTimeout(timeout)
    },[])
    return (
       <>
           <StatusBar hidden />

           {
               isShowSplash ?<SplashScreen/> :
                   <NavigationContainer>
                       <AuthNavigator/>
                   </NavigationContainer>

           }

       </>
    )
}

export default App;
