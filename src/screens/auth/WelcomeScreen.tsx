import React, {useState} from 'react';


import {StyleSheet, Text, TouchableOpacity,} from "react-native";
import {ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../components";
import {appColors} from "../../constants/appColors.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SocialLogin from "./component/SocialLogin.tsx";
import {appInfo} from "../../constants/appInfo.ts";

function GetStartedScreen({navigation}: any) {

    const [isSelect,setIsSelect] = useState(false)

    return (
        <ContainerComponent isImageBackground>
            <SectionComponent styles={style.container}>
                <SocialLogin navigation={navigation}/>
                <RowComponent styles={{paddingHorizontal: 20}}>
                <ButtonComponent
                    text={"Account"}
                    styles={{ width: appInfo.size.WIDTH * 0.5,borderRadius: 30} }
                    textColor={appColors.text}
                    color={appColors.white}  type={'primary'}
                    onPress={() => navigation.navigate("LoginScreen")}/>
                </RowComponent>
            </SectionComponent>

        </ContainerComponent>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:  "flex-end"
    },
})


export default GetStartedScreen;
