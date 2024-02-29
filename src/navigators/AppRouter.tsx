import React, {useEffect, useState} from 'react';

import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {addAuth, authSelector} from "../redux/reducers/authReducer.ts";
import MainNavigator from "./MainNavigator.tsx";
import AuthNavigator from "./AuthNavigator.tsx";
import {SplashScreen} from "../screens";

export const AppRouter = () => {

    const [isShowSplash, setIsShowSplash] = useState(true);
    const {getItem} = useAsyncStorage("accessToken")
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
        const token = await getItem()
        token && dispatch(addAuth(token)) ;
    }


    return (

        <>
            { isShowSplash
                ? (<SplashScreen/>)
                :  auth.accessToken
                    ? (<MainNavigator/>)
                    : (<AuthNavigator/>)}
        </>
    );
};

export default AppRouter
