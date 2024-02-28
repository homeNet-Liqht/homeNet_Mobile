import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from "./TabNavigator.tsx";

export default function MainNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"MainScreen"} component={TabNavigator}/>
        </Stack.Navigator>
    )
}
