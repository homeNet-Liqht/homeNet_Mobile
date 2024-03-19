import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from "../screens";
import ProfileScreen from "../screens/profile/ProfileScreen.tsx";
import Notification from '../screens/notificiation/Notification.tsx';
import EditProfileScreen from "../screens/profile/EditProfileScreen.tsx";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
            <Stack.Screen name={'Notifications'} component={Notification} />
            <Stack.Screen name={'EditProfileScreen'} component={EditProfileScreen} />
        </Stack.Navigator>
    )
}
