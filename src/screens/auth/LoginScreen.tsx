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
import {useState} from "react";
import {Switch, Text} from "react-native";
import {Sms} from "iconsax-react-native";
import SocialLogin from "./component/SocialLogin.tsx";
const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const LoginScreen = ({navigation}: any) => {
    const [isRemember, setIsRemember] = useState(true);
    const [values, setValues] = useState(initValue);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};

        data[`${key}`] = value;

        setValues(data);
    };

    return (
        <ContainerComponent back>
            <SectionComponent>
                <TextComponent text={"Login"} styles={{fontWeight: "bold"}} size={24} color={appColors.primary}/>
                <SpaceComponent height={21}/>
                <InputComponent
                    affix={<Sms size={22} color={appColors.gray}/>}
                    placeHolder={"abc@gmail.com"}
                    value={values.email}
                    onChange={ val => handleChangeValue("email", val )}
                    isPassword={false}/>
                <InputComponent
                    affix={<Sms size={22} color={appColors.gray}/>}
                    placeHolder={"Password"}
                    value={values.password}
                    onChange={ val => handleChangeValue("password", val )}
                    isPassword={false}/>
                <RowComponent justify="space-between">
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{true: appColors.primary}}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)}
                        />
                        <SpaceComponent width={4} />
                        <TextComponent text="Remember me" />
                    </RowComponent>
                    <ButtonComponent
                        text="Forgot Password?"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent>
                <ButtonComponent text={"Login"} type={"primary"}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent text={"OR"} size={25} styles={{fontWeight: "bold", textAlign:"center"}} color={appColors.gray}/>
            </SectionComponent>
            <SocialLogin/>
            <SectionComponent>
                <RowComponent justify="center">
                    <TextComponent text="Don’t have an account? " />
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    );
};

export default LoginScreen
