import React from 'react';
import { View, Text} from "react-native";
import {ButtonComponent} from "../../components";
import {useDispatch} from "react-redux";
import {removeAuth} from "../../redux/reducers/authReducer.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';


function MapScreen() {
    const dispatch = useDispatch()

    return (
        <View>
            <Text>MapScreen</Text>
        </View>
    );
}

export default MapScreen;
