import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator.tsx';
import ProfileScreen from "../screens/profile/ProfileScreen.tsx";
import CreateFamilyScreen from "../screens/Family/CreateFamilyScreen.tsx";
import DrawerNavigator from "./DrawerNavigator.tsx";
export default function MainNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'Main'} component={DrawerNavigator} />
        </Stack.Navigator>
    )
}
