import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "../screens/map/MapScreen.tsx";

export default function MapNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'MapScreen'} component={MapScreen} />
        </Stack.Navigator>
    )
}
