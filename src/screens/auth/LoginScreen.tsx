import React from 'react';


import {StyleSheet} from "react-native";
import {ButtonComponent, ContainerComponent, SectionComponent} from "../../components";


function LoginScreen() {

    return (
        <ContainerComponent isImageBackground>
            <SectionComponent styles={style.container}>
                <ButtonComponent text={"Phone"} type={'primary'}/>
                <ButtonComponent text={"Phone"} type={'primary'}/>
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
