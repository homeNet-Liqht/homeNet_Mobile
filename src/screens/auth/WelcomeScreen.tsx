import React, {useState} from 'react';


import {StyleSheet, Text, TouchableOpacity,} from "react-native";
import {ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../components";
import {appColors} from "../../constants/appColors.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SocialLogin from "./component/SocialLogin.tsx";

function GetStartedScreen({navigation}: any) {

    const [isSelect,setIsSelect] = useState(false)

    return (
        <ContainerComponent isImageBackground>
            <SectionComponent styles={style.container}>
                <SocialLogin navigation={navigation}/>
                <ButtonComponent
                    text={"Account"}
                    styles={{width:"60%", borderRadius: 30} }
                    textColor={appColors.text}
                    color={appColors.white}  type={'primary'}
                    onPress={() => navigation.navigate("LoginScreen")}/>
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
