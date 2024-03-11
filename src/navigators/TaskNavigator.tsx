import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskScreen from "../screens/task/TaskScreen.tsx";

export default function TaskNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'TaskScreen'} component={TaskScreen} />
        </Stack.Navigator>
    )
}
