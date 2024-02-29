// @flow
import * as React from 'react';
import {View} from "react-native";
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent
} from "../../components";
import {appColors} from "../../constants/appColors.ts";
import {useState} from "react";
import {Sms} from "iconsax-react-native";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";
import {authApi} from "../../apis";
import {LoadingModal} from "../../modals";
import LoginScreen from "./LoginScreen.tsx";


function ForgotPassword({navigation}: any) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handeForgotPassword =  async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);

            await authApi.ForgotPassword(email)
            navigation.navigate('Verification',{ref: "ResetPassword", email: email, type: "ForgotPassword"});
        }catch (e: any){
            setIsLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Login Failed",
                textBody: `${e.data}`,
                button: 'close',
            })
        }
    }
    return (
        <ContainerComponent backgroundNumber={2} isImageBackground back>
            <SectionComponent>
                <TextComponent text={"Forgot Password"} color={appColors.primary} size={22} styles={{fontWeight: "bold"} }/>
                <SpaceComponent height={15} />
                <TextComponent text={"Please enter your email to reset the password"} color={appColors.gray} size={15}/>
                <SpaceComponent height={15} />
                <TextComponent text={"Your Email"} color={'black'} size={22} styles={{fontWeight: "bold"} }/>
                <SpaceComponent height={10} />
                <InputComponent
                    value={email} placeHolder={"Your mail"}
                    onChange={val =>setEmail(val) }
                    isPassword={false} affix={<Sms size={22} color={appColors.gray} />}/>
                <ButtonComponent text={'Reset Password'} onPress={() => handeForgotPassword()} type={"primary"} styles={{width: "100%"}} />
            </SectionComponent>
            <LoadingModal visible={isLoading}/>
        </ContainerComponent>
    );
}

export default ForgotPassword
