import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = () => {
  // @ts-ignore
  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{paddingHorizontal: 15}}
        pages={[
          {
            backgroundColor: 'transparent',

            image: (
              <View>
                <Image source={require('../assets/oboarding1.png')} />
              </View>
            ),
            title: '',
            subtitle: 'Protect what matters most.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View>
                <Text>hihi</Text>
              </View>
            ),
            title: '',
            subtitle: 'Enhance your understanding of family members.',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
