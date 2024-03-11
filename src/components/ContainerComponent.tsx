import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ButtonComponent, RowComponent, TextComponent} from '.';
import {ArrowLeft} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../screens/styles/globalStyles.ts';

interface Props {
  backgroundNumber?: 1 | 2;
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  color?: string;
}

const ContainerComponent = (props: Props) => {
  const {
    children,
    isScroll,
    isImageBackground,
    title,
    back,
    color,
    backgroundNumber,
  } = props;

  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
              justifyContent: 'flex-start',
            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 12}}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title ? <TextComponent text={title} size={16} flex={1} /> : <></>}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: color ? color : 'white',
  };
  const returnContainer = isScroll ? (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={
        backgroundNumber == 2
          ? require('../assets/imgs/blank-img.png')
          : require('../assets/imgs/splash.png')
      }
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={containerStyle}>
      <View style={{flex: 1}}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
