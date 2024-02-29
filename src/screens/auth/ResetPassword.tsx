
import * as React from 'react';

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
import {Lock, Sms} from "iconsax-react-native";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";

import {LoadingModal} from "../../modals";
import {authApi} from "../../apis";

const initValue = {
    newPassword: '',
    confirmNewPassword: '',


};

function ResetPassword({navigation,route}: any) {
    const [values, setValues] = useState(initValue);

    const [isLoading, setIsLoading] = useState(false)

    console.log(values)
    const handeResetPassword =  async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            await authApi.ResetPassword(route.params.email,values.newPassword)
            navigation.navigate('LoginScreen',{ email: route.params.email});
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

    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};

        data[`${key}`] = value;

        setValues(data);
    };
    return (
        <ContainerComponent backgroundNumber={2} isImageBackground back>
            <SectionComponent>
                <TextComponent text={"Reset Password"} color={appColors.primary} size={22} styles={{fontWeight: "bold"} }/>
                <SpaceComponent height={15} />
                <TextComponent text={"Please enter your new password"} color={appColors.gray} size={15}/>
                <SpaceComponent height={15} />
                <InputComponent
                    value={values.newPassword}
                    placeHolder="Password"
                    onChange={val => handleChangeValue('newPassword', val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={values.confirmNewPassword}
                    placeHolder="Confirm password"
                    onChange={val => handleChangeValue('confirmNewPassword', val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}

                />
                <SpaceComponent height={10} />
                <ButtonComponent text={'Reset Password'} onPress={() => handeResetPassword()} type={"primary"} styles={{width: "100%"}} />
            </SectionComponent>
            <LoadingModal visible={isLoading}/>
        </ContainerComponent>
    );
}

export default ResetPassword
