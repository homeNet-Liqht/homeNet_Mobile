import React, {useState} from 'react';


import {StyleSheet, Text, TouchableOpacity,} from "react-native";
import {ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../components";
import {appColors} from "../../constants/appColors.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function LoginScreen() {

    const [isSelect,setIsSelect] = useState(false)

    return (
        <ContainerComponent isImageBackground>
            <SectionComponent styles={style.container}>
                <ButtonComponent text={"Phone"} styles={{width:"60%", borderRadius: 30} } textColor={appColors.text} color={appColors.white}  type={'primary'}/>
                <ButtonComponent text={"Phone"} styles={{width:"60%", borderRadius: 30} } textColor={appColors.text} color={appColors.white}  type={'primary'}/>
                <RowComponent justify={"center"}>
                    <TouchableOpacity >

                        <BouncyCheckbox  fillColor={appColors.primary} onPress={(isChecked: boolean) => {setIsSelect(isChecked)}} textComponent={
                            <TextComponent text={"  Agree to Terms and Conditions"}  />
                        } />
                    </TouchableOpacity>
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


export default LoginScreen;
