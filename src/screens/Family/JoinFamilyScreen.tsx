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

export default function JoinFamilyScreen() {
    const [invitedLink, setInvitedLink] = useState('');
    const handleOnChange = (value: any) => {
        setInvitedLink(value);
    };
    return (
        <ContainerComponent isScroll back title="Join a Family">
            <KeyboardAvoidingView
                style={{
                    flex:1,
                    alignItems: "center",
                }}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                keyboardVerticalOffset={60}>



              <SectionComponent styles={{
                  justifyContent: "flex-end",
              }}>
                  <InputComponent
                      value={invitedLink}
                      placeHolder={"Link"}
                      styles={{
                          width: appInfo.size.WIDTH * 0.9

                      }}
                      isPassword={false}
                      onChange={(val) => setInvitedLink(val)}
                  />
              </SectionComponent>


            </KeyboardAvoidingView>

        </ContainerComponent>
    );
}
