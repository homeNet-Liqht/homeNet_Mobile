import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskScreen from "../screens/task/TaskScreen.tsx";
import AddNewTask from '../screens/task/AddNewTask.tsx';
import Detail from '../screens/task/component/Detail.tsx';

export default function TaskNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'TaskScreen'} component={TaskScreen} />
            <Stack.Screen name={'Detail'} component={Detail} />
            <Stack.Screen name={'AddNewTask'} component={AddNewTask} />
        </Stack.Navigator>
    )
}
