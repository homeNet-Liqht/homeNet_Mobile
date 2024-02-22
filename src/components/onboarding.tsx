import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LinearGradient from "react-native-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {setItem} from "../utils/asyncStorage.tsx";
import WelComeScreen from "../screens/welcome/welComeScreen.tsx";


const {width, height} = Dimensions.get("window")
const OnboardingScreen = () => {
    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate();
        setItem("onboarded","1")
        console.log("a")
    }

    const doneButton = ({...props}) =>{
        return (
            <TouchableOpacity style={styles.doneButton}>
                <Text style={{color: "white", fontWeight: "bold"}}>Done</Text>
            </TouchableOpacity>
        )
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                bottomBarHighlight={false}
                containerStyles={{paddingHorizontal: 35}}
                pages={[
                    {
                        backgroundColor: '#01B7FF',
                        image: (
                            <View >
                                <Image source={require('../assets/oboarding1.png')}/>
                            </View>
                        ),
                        title: 'Protect what matters most.',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#0BE5DC',
                        image: (
                            <View >
                                <Image source={require('../assets/onboarding2.png')}/>
                            </View>
                        ),
                        title: 'Enhance your understanding of family members.',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#0BE5DC',
                        image: (
                            <View >
                                <Image style={styles.image} source={require('../assets/onboarding3.png')}/>
                            </View>
                        ),
                        title: 'Enhance your understanding of family members.',
                        subtitle: '',
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
    image: {
        objectFit: "fill",
        width: 300,
        height: 400
    },
    doneButton:{
        padding: 20,
        color: "white"
    }
});

export default OnboardingScreen;
