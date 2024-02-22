import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from "../screens";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
        </Stack.Navigator>
    )
}
