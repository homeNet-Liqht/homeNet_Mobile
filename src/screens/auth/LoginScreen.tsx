import React from 'react';
import { View, Text} from "react-native";
import {ButtonComponent} from "../../components/ButtonComponent.tsx";


function LoginScreen() {
    return (
       <View>
           <Text>LoginScreen</Text>
           <ButtonComponent text={"login"} type={"primary"} />
       </View>
    );
}

export default LoginScreen;
