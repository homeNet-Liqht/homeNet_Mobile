import * as React from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent, RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent
} from "../../components";
import {appColors} from "../../constants/appColors.ts";
import {useEffect, useState} from "react";
import {Switch,} from "react-native";
import {Lock, Sms} from "iconsax-react-native";
import SocialLogin from "./component/SocialLogin.tsx";
import {LoadingModal} from "../../modals";
import {authApi} from "../../apis";
import CookieManager from '@react-native-cookies/cookies';
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {addAuth} from "../../redux/reducers/authReducer.ts";
import {ALERT_TYPE, Dialog, AlertNotificationRoot, Toast} from 'react-native-alert-notification';

const initValue = {
    email: '',
    password: '',
};


export const LoginScreen = ({navigation, route}: any) => {


    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState(initValue);
    const [isDisable, setIsDisable] = useState(true)
    const dispatch = useDispatch()
    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};
        if (route.email) {
            data["email"] = route.email
        }
        data[`${key}`] = value;
        setValues(data);
    };

    useEffect(() => {
        if (values.email  && values.password) {
            setIsDisable(false)
        }else {
            setIsDisable(true)
        }

    }, [values]);

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            if (!values.email || !values.password) {
                setIsLoading(false)
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Login Failed",
                    textBody: "please enter enough your information",
                    button: 'Close',
                })
            } else {
                await authApi.login(values.email, values.password)

                await CookieManager.get(`${process.env.REACT_APP_API_URL}/auth/signin`)
                    .then((cookies) => {
                        setIsLoading(false)
                        dispatch(addAuth({accessToken: cookies.accesstoken.value}))
                        useAsyncStorage("accessToken").setItem(cookies.accesstoken.value)
                        useAsyncStorage("refreshToken").setItem(cookies.refreshtoken.value)
                    });
            }
        } catch (e: any) {
            setIsLoading(false)
            if (e.status == 403) {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Login Failed",
                    textBody: `${e.data.data}`,
                    button: 'Verify now',
                    onHide: () => {
                        navigation.navigate("Verification", {ref: "LoginScreen"})
                    }
                })
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Login Failed",
                    textBody: `${e.data.status}`,
                    button: 'close',
                })
            }
        }
    }


    return (
        <ContainerComponent back>
            <SectionComponent>
                <TextComponent text={"Login"} styles={{fontWeight: "bold"}} size={24} color={appColors.primary}/>
                <SpaceComponent height={21}/>
                <InputComponent
                    type={"email-address"}
                    affix={<Sms size={22} color={appColors.gray}/>}
                    placeHolder={"abc@gmail.com"}
                    value={values.email}

                    onChange={(val) => {
                        handleChangeValue("email", val)
                    }}
                    isPassword={false}/>
                <InputComponent
                    affix={<Lock size={22} color={appColors.gray}/>}
                    placeHolder={"Password"}
                    value={values.password}
                    onChange={val => {
                        handleChangeValue("password", val)
                    }}
                    isPassword={true}/>
                <RowComponent justify="space-between">
                    <ButtonComponent
                        text="Forgot Password?"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16}/>
            <SectionComponent>
                <ButtonComponent text={"Login"} type={"primary"} disable={isDisable} onPress={() => handleLogin()}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent text={"OR"} size={25} styles={{fontWeight: "bold", textAlign: "center"}}
                               color={appColors.gray}/>
            </SectionComponent>
            <SocialLogin/>
            <SectionComponent>
                <RowComponent justify="center">
                    <TextComponent text="Don’t have an account? "/>
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </RowComponent>
            </SectionComponent>
            <LoadingModal visible={isLoading}/>

        </ContainerComponent>
    );
};

export default LoginScreen
