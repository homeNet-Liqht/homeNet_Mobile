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
import {Switch,} from "react-native";
import {Lock, Sms} from "iconsax-react-native";
import SocialLogin from "./component/SocialLogin.tsx";
import {LoadingModal} from "../../modals";
import {authApi} from "../../apis";
import CookieManager from '@react-native-cookies/cookies';
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {addAuth} from "../../redux/reducers/authReducer.ts";

const initValue = {
    email: '',
    password: '',
};



export const LoginScreen = ({navigation}: any) => {

    const {setItem} =  useAsyncStorage('accessToken')
    const [isLoading,setIsLoading] = useState(false)
    const [isRemember, setIsRemember] = useState(true);
    const [values, setValues] = useState(initValue);

    const dispatch = useDispatch()
    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};

        data[`${key}`] = value;

        setValues(data);
    };

    const handleLogin = async () =>{
        try {

            const res= await  authApi.login(values.email, values.password)
            console.warn("login success")
            await CookieManager.get(`${process.env.REACT_APP_API_URL}/auth/signin`)
                .then((cookies) => {
                    dispatch(addAuth(cookies.accesstoken.value))
                    setItem(cookies.accesstoken.value)
                });

        }catch (e:any) {
            console.warn(`${e.data}`)

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
                    onChange={ val => handleChangeValue("email", val )}
                    isPassword={false}/>
                <InputComponent
                    affix={<Lock size={22} color={appColors.gray} />}
                    placeHolder={"Password"}
                    value={values.password}
                    onChange={ val => handleChangeValue("password", val )}
                    isPassword={true}/>
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
                <ButtonComponent text={"Login"} type={"primary"} onPress={() => handleLogin()}/>
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
            <LoadingModal visible={isLoading} />

        </ContainerComponent>
    );
};

export default LoginScreen
