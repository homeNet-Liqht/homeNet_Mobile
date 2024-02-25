import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LoginScreen} from "../screens";

export default function TabNavigator() {
    const Tab =createBottomTabNavigator();
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"LoginScreen"} component={LoginScreen}/>
        </Tab.Navigator>
    )
}
