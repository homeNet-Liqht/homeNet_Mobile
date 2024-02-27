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
} from "../components";
import {appColors} from "../constants/appColors.ts";
import {useState} from "react";
import {Sms} from "iconsax-react-native";

type Props = {};

function ForgotPassword(props: Props) {
    const [email, setEmail] = useState('')
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
                <ButtonComponent text={'Reset Password'} type={"primary"} styles={{width: "100%"}} />
            </SectionComponent>
        </ContainerComponent>
    );
}

export default ForgotPassword
