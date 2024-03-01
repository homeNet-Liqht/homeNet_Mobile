import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens';
import ProfileScreen from '../screens/profile/ProfileScreen.tsx';
import JoinFamilyScreen from '../screens/profile/JoinFamilyScreen.tsx';
import CreateFamilyScreen from '../screens/profile/CreateFamilyScreen.tsx';
export default function MainNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            <Stack.Screen name={'ProfilePage'} component={ProfileScreen} />
            <Stack.Screen name={'FamilyCreate'} component={CreateFamilyScreen} />
            <Stack.Screen name={'JoinFamily'} component={JoinFamilyScreen} />
        </Stack.Navigator>
    )
}
