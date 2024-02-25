import React, {useEffect, useState} from 'react';

import {SplashScreen} from "./src/screens";
import AuthNavigator from "./src/navigators/AuthNavigator.tsx";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import MainNavigator from "./src/navigators/MainNavigator.tsx";

function App(): React.JSX.Element {
    const [isShowSplash, setIsShowSplash] = useState(true)
    const {getItem, setItem} = useAsyncStorage('accessToken')
    const [accessToken, setAccessToken] = useState('')


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsShowSplash(false)
        }, 1500)
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        checkLogin()
    }, []);

    const checkLogin = async () => {
        const token = await getItem()
        token && setAccessToken(token)
    }

    return (
        <>
            <StatusBar hidden/>

            {
                isShowSplash ? <SplashScreen/> :
                    <NavigationContainer>
                        {
                            accessToken ? <MainNavigator/> : <AuthNavigator/>
                        }
                    </NavigationContainer>

            }

        </>
    )
}

export default App;
