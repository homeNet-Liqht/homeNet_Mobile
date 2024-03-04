import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {WelcomeScreen} from "../screens";

import GetStartedScreen from "../components/GetStartedScreen.tsx";
import Verification from "../screens/auth/Verification.tsx";
import LoginScreen from "../screens/auth/LoginScreen.tsx";
import SignUpScreen from "../screens/auth/SignUpScreen.tsx";
import ForgotPassword from "../screens/auth/ForgotPassword.tsx";
import ResetPassword from "../screens/auth/ResetPassword.tsx";

import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {alreadyAccess, isAccessSelected} from "../redux/reducers/authReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {OnboardingScreen} from "../components";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    const {getItem} = useAsyncStorage("alreadyAccess")
    const isAccess = useSelector(isAccessSelected)

    const dispatch = useDispatch();
    useEffect(() => {
        checkLogin();
    }, []);
    const checkLogin = async () => {
        const access = await getItem()
        access == null && dispatch(alreadyAccess(true))
    }


    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>

            {
                isAccess &&
                <>
                    <Stack.Screen name={"onboarding"} component={OnboardingScreen}/>
                    <Stack.Screen name={"GetStartedScreen"} component={GetStartedScreen}/>
                </>
            }
            <>
                <Stack.Screen name={"WelcomeScreen"} component={WelcomeScreen}/>

                <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                <Stack.Screen name={"SignUpScreen"} component={SignUpScreen}/>

                <Stack.Screen name={"ForgotPassword"} component={ForgotPassword}/>
                <Stack.Screen name={"ResetPassword"} component={ResetPassword}/>
                <Stack.Screen name={"Verification"} component={Verification}/>
            </>
        </Stack.Navigator>
    )
}
