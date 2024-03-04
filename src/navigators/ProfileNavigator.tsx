import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen.tsx';
import JoinFamilyScreen from '../screens/profile/JoinFamilyScreen.tsx';
import CreateFamilyScreen from '../screens/profile/CreateFamilyScreen.tsx';
export default function ProfileNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'Profile'} component={ProfileScreen} />
            <Stack.Screen name={'FamilyCreate'} component={CreateFamilyScreen} />
            <Stack.Screen name={'JoinFamily'} component={JoinFamilyScreen} />
        </Stack.Navigator>
    )
}
