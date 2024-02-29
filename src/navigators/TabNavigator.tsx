import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, WelcomeScreen} from "../screens";
import CalendarScreen from "../screens/Calendar/CalendarScreen.tsx";

export default function TabNavigator() {
    const Tab =createBottomTabNavigator();
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"Home"} component={HomeScreen}/>
            <Tab.Screen name={"Calendar"} component={CalendarScreen}/>
        </Tab.Navigator>
    )
}
