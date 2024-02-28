import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, WelcomeScreen} from "../screens";

export default function TabNavigator() {
    const Tab =createBottomTabNavigator();
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"HomeScreen"} component={HomeScreen}/>
        </Tab.Navigator>
    )
}
