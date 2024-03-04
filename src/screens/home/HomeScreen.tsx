import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfo';
import {LinearGradient} from 'react-native-svg';
import OptionsBar from './components/OptionsBar';
import WelcomeBar from './components/WelcomeBar';
import WeatherBar from './components/WeatherBar';

function HomeScreen({navigation}: any) {
  return (
    <ContainerComponent>
      <OptionsBar />
      <WelcomeBar navigation={navigation}/>
      <WeatherBar />
    </ContainerComponent>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
