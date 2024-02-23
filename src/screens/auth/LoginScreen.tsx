import React, {useState} from 'react';

import ContainerComponent from "../../components/containerComponent.tsx";
import TextComponent from "../../components/TextComponent.tsx";


function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
       <ContainerComponent isImageBackground>
           <TextComponent text={"hiaa"}/>
       </ContainerComponent>
    );
}


export default LoginScreen;
