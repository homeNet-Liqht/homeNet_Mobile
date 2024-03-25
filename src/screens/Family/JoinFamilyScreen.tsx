import React, {useState} from 'react';
import {View, Text, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent, SectionComponent,
    TextComponent,
} from '../../components';
import {appInfo} from "../../constants/appInfo.ts";
import FamilyApi from "../../apis/familyApi.ts";

export default function JoinFamilyScreen({navigation}:any) {
    const [invitedLink, setInvitedLink] = useState('');
    const handleJoinFamily = async () => {
        try {
            console.log(invitedLink)
            await FamilyApi.join(invitedLink)
            navigation.navigate("ProfileScreen")
        }catch (e) {
            console.log(e)
        }
    };

    return (
        <ContainerComponent  back title="Join a Family">
            <Image style={{
                width: appInfo.size.WIDTH,
                height: appInfo.size.HEIGHT * 0.4,
                bottom: appInfo.size.HEIGHT * 0.35,

                resizeMode: "contain",
                justifyContent: 'center',
                alignItems: "center",
                position: "absolute"
            }} source={require("../../assets/imgs/join-with-us.png")}/>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    height: appInfo.size.HEIGHT
                }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}>

                    <RowComponent styles={{
                        flex: 1,
                        alignItems: "flex-end"

                    }}>
                        <InputComponent
                            value={invitedLink}
                            placeHolder={"Link"}
                            styles={{
                                width: appInfo.size.WIDTH * 0.9,
                                backgroundColor: "white"

                            }}
                            isPassword={false}
                            onChange={(val) => setInvitedLink(val)}
                        />
                    </RowComponent>
            </KeyboardAvoidingView>
            <ButtonComponent text={"Join"} styles={{
                borderRadius: 100,
            }} type={"primary"} onPress={() => handleJoinFamily()}/>
        </ContainerComponent>
    );
}
