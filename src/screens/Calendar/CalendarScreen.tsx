import React from 'react';
import { View, Text} from "react-native";
import {ButtonComponent} from "../../components";
import {useDispatch} from "react-redux";
import {removeAuth} from "../../redux/reducers/authReducer.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';


function CalendarScreen() {
    const dispatch = useDispatch()

    return (
        <View>
            <ButtonComponent
                type="primary"
                text="Logout"
                onPress={async () => {
                    await AsyncStorage.removeItem("accessToken")
                    await GoogleSignin.signOut();
                    LoginManager.logOut();
                    dispatch(removeAuth({}));
                }}
            />
            <Text>CalendarScreen</Text>
        </View>
    );
}

export default CalendarScreen;
