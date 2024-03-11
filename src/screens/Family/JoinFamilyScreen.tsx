import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';

export default function JoinFamilyScreen() {
  const [invitedLink, setInvitedLink] = useState('');
  const handleOnChange = (value : any) => {
    setInvitedLink(value);
  };
  return (
    <ContainerComponent back title="Join a Family">
      <RowComponent>
        <Image
          source={require('../../assets/imgs/join-family.png')}
          width={200}
          height={200}
          style={{marginVertical: '5%'}}
        />
      </RowComponent>
      <RowComponent>
        <TextComponent
          text="Welcome to the fam"
          size={38}
          styles={{fontWeight: '700'}}
        />
      </RowComponent>
      <RowComponent styles={{marginVertical: "3%"}}>
        <InputComponent
          value="join-link"
          isPassword={false}
          onChange={handleOnChange}
        />
      </RowComponent>
      <ButtonComponent
        text="Accept Invitation"
        type="primary"
        styles={{borderRadius: 25}}
      />
    </ContainerComponent>
  );
}
