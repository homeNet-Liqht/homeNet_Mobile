import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {ButtonComponent} from "../../components/ButtonComponent.tsx";
import InputComponent from "../../components/InputComponent.tsx";
import {appColors} from "../../constants/appColors.ts";
import {globalStyles} from "../styles/globalStyles.ts";
import {Lock, Sms} from "iconsax-react-native";


function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <View style={[globalStyles.container,{padding: 20}]}>
            <Text>LoginScreen</Text>
            <InputComponent
                value={email}
                placeHolder={"Email"}
                onChange={email => setEmail(email)}
                isPassword={false}
                allowClear
                affix={<Sms size={22} color={appColors.gray}/> }/>
            <InputComponent
                value={password}
                placeHolder={"Password"}
                onChange={val => setPassword(val)}
                isPassword
                affix={<Lock size={22} color={appColors.gray}/> }/>
            <ButtonComponent text={"login"} type={"primary"}/>
        </View>
    );
}


export default LoginScreen;
