import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RowComponent, SectionComponent, TextComponent} from '../../../components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {appColors} from '../../../constants/appColors';
import { appInfo } from '../../../constants/appInfo';

export default function WelcomeBar({navigation} : any) {
  return (
    <RowComponent
    styles={{
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    }}>
    <SectionComponent>
      <TextComponent
        text="Hello,"
        size={16}
        color="#8696BB"
        styles={{marginLeft: appInfo.size.WIDTH * 0.005}}
      />
      <TextComponent
        text="Thai Hoang"
        size={25}
        color={appColors.primary}
        styles={{fontWeight: '800'}}
      />
    </SectionComponent>
    <SectionComponent>
      <TouchableOpacity
        style={styles.profileWrapper}
        onPress={() => navigation.navigate('ProfilePage')}>
        <EvilIcons name={'user'} size={40} />
      </TouchableOpacity>
    </SectionComponent>
  </RowComponent>
  );
}

const styles = StyleSheet.create({

    profileWrapper: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#0BE5DC',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  