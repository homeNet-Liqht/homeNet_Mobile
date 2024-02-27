import React, {useEffect, useState} from 'react';

import {SplashScreen} from "./src/screens";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {Provider} from "react-redux";
import store from "./src/redux/store.ts";
import AppRouter from "./src/navigators/AppRouter.tsx";

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

            <Provider store={store}>
                {
                    isShowSplash ? <SplashScreen/> :
                        <NavigationContainer>
                            <AppRouter/>
                        </NavigationContainer>
                }
            </Provider>

        </>
    )
}

export default App;
