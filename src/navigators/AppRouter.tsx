import React, {useEffect} from 'react';
import {View} from "react-native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import {authSelector} from "../redux/reducers/authReducer.ts";
import MainNavigator from "./MainNavigator.tsx";
import AuthNavigator from "./AuthNavigator.tsx";

export const AppRouter = () => {

    const {getItem} = useAsyncStorage("accessToken")
    const auth = useSelector(authSelector)
    useEffect(() => {
        checkLogin();
    }, []);
    const checkLogin = async () => {
        const token = await getItem()
        console.log(token)
    }

    return (
        <View>{auth ? <MainNavigator/> : <AuthNavigator/>}</View>
    );
};

export default AppRouter
