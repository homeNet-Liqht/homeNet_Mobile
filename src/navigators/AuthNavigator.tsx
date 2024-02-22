import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from "../screens";
import onboardingScreen from "../components/OnboardingScreen.tsx";
import GetStartedScreen from "../components/GetStartedScreen.tsx";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"onboarding"} component={onboardingScreen}/>
            <Stack.Screen name={"GetStartedScreen"} component={GetStartedScreen}/>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
        </Stack.Navigator>
    )
}
