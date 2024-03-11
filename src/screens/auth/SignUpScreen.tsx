import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {batch, useDispatch} from 'react-redux';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import SocialLogin from "./component/SocialLogin.tsx";
import {authApi} from "../../apis";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";


const initValue = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {

    const [values, setValues] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
    const {setItem} = useAsyncStorage('EmailVerification')


    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};
        data[`${key}`] = value;
        setValues(data);
    };

    const handleCheckPassword = () => {
        if (values.password && values.confirmPassword) {
            if (values.password != values.confirmPassword) {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Failed",
                    textBody: `Password doest not match`,
                    button: 'close',
                })
            }
        }
    }

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            if (!values.fullname || !values.email || !values.password || !values.confirmPassword) {
                setIsLoading(false)
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Failed",
                    textBody: `Please input all the required fields`,
                    button: 'close',
                })
            } else {
                const data = await authApi.signUp({
                    email: values.email,
                    password: values.password,
                    name: values.fullname,

                })
                await setItem(values.email)
                navigation.navigate('Verification', {ref: "LoginScreen", email: values.email, type: "Signup"});
            }


        } catch (e: any) {
            setIsLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Failed",
                textBody: `${e.data.data}`,
                button: 'close',
            })
        }
    };

    return (
        <>
            <ContainerComponent backgroundNumber={2} isImageBackground isScroll back>
                <SectionComponent>
                    <TextComponent size={24} title text="Sign up" color={appColors.primary}
                                   styles={{fontWeight: "bold"}}/>
                    <SpaceComponent height={21}/>
                    <InputComponent
                        value={values.fullname}
                        placeHolder="Full name"
                        onChange={val => handleChangeValue('fullname', val)}
                        allowClear
                        isPassword={false}
                        affix={<User size={22} color={appColors.gray}/>}
                    />
                    <InputComponent
                        value={values.email}
                        placeHolder="abc@email.com"
                        onChange={val => handleChangeValue('email', val)}
                        allowClear
                        affix={<Sms size={22} color={appColors.gray}/>}
                        isPassword={false}/>
                    <InputComponent
                        value={values.password}
                        placeHolder="Password"
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        allowClear
                        onEnd={() => handleCheckPassword()}
                        affix={<Lock size={22} color={appColors.gray}/>}

                    />
                    <InputComponent
                        value={values.confirmPassword}
                        placeHolder="Confirm password"
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        isPassword
                        onEnd={() => handleCheckPassword()}
                        allowClear
                        affix={<Lock size={22} color={appColors.gray}/>}
                    />
                </SectionComponent>

                <SpaceComponent height={16}/>
                <SectionComponent>
                    <ButtonComponent
                        onPress={handleRegister}
                        text="SIGN UP"
                        type="primary"
                    />
                </SectionComponent>
                <SocialLogin/>
                <SectionComponent>
                    <RowComponent justify="center">
                        <TextComponent text="Already Have an account"/>
                        <ButtonComponent
                            type="link"
                            text="Sign in"
                            onPress={() => navigation.navigate('LoginScreen')}
                        />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
            <LoadingModal visible={isLoading}/>
        </>
    );
};

export default SignUpScreen;
