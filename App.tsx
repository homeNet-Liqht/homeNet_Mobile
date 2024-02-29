import React, {useEffect, useState} from 'react';

import {SplashScreen} from "./src/screens";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {Provider} from "react-redux";
import store from "./src/redux/store.ts";
import AppRouter from "./src/navigators/AppRouter.tsx";

function App(): React.JSX.Element {


    return (
        <>
            <StatusBar hidden/>
            <Provider store={store}>
                <NavigationContainer>
                    <AppRouter/>
                </NavigationContainer>
            </Provider>
        </>
    )
}

export default App;
