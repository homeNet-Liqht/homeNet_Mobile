import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {WelcomeScreen} from "../screens";
import onboardingScreen from "../components/OnboardingScreen.tsx";
import GetStartedScreen from "../components/GetStartedScreen.tsx";
import Verification from "../screens/auth/Verification.tsx";
import LoginScreen from "../screens/auth/LoginScreen.tsx";
import SignUpScreen from "../screens/auth/SignUpScreen.tsx";
import ForgotPassword from "../screens/auth/ForgotPassword.tsx";
import ResetPassword from "../screens/auth/ResetPassword.tsx";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>

            <Stack.Screen name={"onboarding"} component={onboardingScreen}/>
            <Stack.Screen name={"GetStartedScreen"} component={GetStartedScreen}/>
            <Stack.Screen name={"WelcomeScreen"} component={WelcomeScreen}/>

            <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
            <Stack.Screen name={"SignUpScreen"} component={SignUpScreen}/>

            <Stack.Screen name={"ForgotPassword"} component={ForgotPassword}/>
            <Stack.Screen name={"ResetPassword"} component={ResetPassword}/>
            <Stack.Screen name={"Verification"} component={Verification}/>

        </Stack.Navigator>
    )
}
