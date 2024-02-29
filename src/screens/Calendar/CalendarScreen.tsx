import React from 'react';
import { View, Text} from "react-native";
import {ButtonComponent} from "../../components";
import {useDispatch} from "react-redux";
import {removeAuth} from "../../redux/reducers/authReducer.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";


function CalendarScreen() {
    const dispatch = useDispatch()

    return (
        <View>
            <ButtonComponent
                type="primary"
                text="Logout"
                onPress={async () => {
                    await AsyncStorage.clear()
                    dispatch(removeAuth({}));
                }}
            />
            <Text>CalendarScreen</Text>
        </View>
    );
}

export default CalendarScreen;
