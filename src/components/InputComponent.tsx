import * as React from 'react';
import {ReactNode, useState} from "react";
import {KeyboardType, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {EyeSlash} from "iconsax-react-native";
import {appColors} from "../constants/appColors.ts";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
interface Props {
    value: string,
    onChange: (val: string) => void,
    affix?: ReactNode,
    placeHolder?: string,
    suffix?: ReactNode,
    isPassword: boolean,
    allowClear?: boolean,
    type?: KeyboardType,
}

const InputComponent = (props: Props) => {

    const {value, onChange, affix, placeHolder, suffix, isPassword, allowClear, type} = props

    const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false
    )
    return (
        <>
            <View style={style.inputContainer} >
                {affix ?? affix}
                <TextInput
                    style={style.input}
                    value={value}
                    placeholder={placeHolder ?? ""}
                    onChangeText={val => onChange(val)}
                    secureTextEntry={isShowPassword}
                    keyboardType={type ?? "default"}/>
                {suffix ?? suffix}
                <TouchableOpacity onPress={ isPassword ? () => setIsShowPassword(!isShowPassword): () => onChange('')}>
                    {
                        isPassword
                            ?
                                (<FontAwesome name={isShowPassword ? "eye-slash" : "eye"} size={22} color={appColors.gray}  />)
                            :
                                ( value.length > 0  && allowClear && (<AntDesign name={"close"} size={22} color={appColors.text}/>))
                    }
                </TouchableOpacity>
            </View>
        </>
    );
};

const style  = StyleSheet.create({
    inputContainer:{
        flexDirection: "row",
        borderColor: appColors.gray,
        borderRadius: 12,
        borderWidth: 1,
        width: "100%",
        minHeight: 56,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 20
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.text

    }
})
export  default  InputComponent
