import React, {useEffect, useState} from 'react';

import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {addAuth, alreadyAccess, authSelector, isAccessSelected} from "../redux/reducers/authReducer.ts";
import MainNavigator from "./MainNavigator.tsx";
import {SplashScreen, WelcomeScreen} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator.tsx";

export const AppRouter = () => {

    const [isShowSplash, setIsShowSplash] = useState(true);
    const auth = useSelector(authSelector)



    const dispatch = useDispatch();

    useEffect(() => {
        checkLogin();
        const timeout = setTimeout(() => {
            setIsShowSplash(false);
        }, 1500);

        return () => clearTimeout(timeout);

    }, []);
    const checkLogin = async () => {
        const token = await useAsyncStorage("accessToken").getItem()
        token && dispatch(addAuth(token));
    }

    return (

        <>
            {isShowSplash
                ?
                <>
                    <SplashScreen/>

                </>
                : auth
                    ? <>

                        <MainNavigator/>
                    </>
                    :
                    <>
                        <AuthNavigator/>
                    </>
            }
        </>
    );
};

export default AppRouter
