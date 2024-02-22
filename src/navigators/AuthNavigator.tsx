import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from "../screens";
import onboardingScreen from "../components/OnboardingScreen.tsx";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"onboarding"} component={onboardingScreen}/>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
        </Stack.Navigator>
    )
}
