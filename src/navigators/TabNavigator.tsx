import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "./HomeNavigator.tsx";
import { appInfo } from "../constants/appInfo.ts";
import { ReactNode } from "react";
import { appColors } from "../constants/appColors.ts";
import {
  Calendar,
  Home2,
  Location,
  Maker,
  Map,
  Task,
} from "iconsax-react-native";
import CalendarScreen from "../screens/Calendar/CalendarScreen.tsx";
import TaskNavigator from "./TaskNavigator.tsx";
import DrawerNavigator from "./DrawerNavigator.tsx";
import MapScreen from "../screens/map/MapScreen.tsx";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: appInfo.size.HEIGHT * 0.08,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray;
          switch (route.name) {
            case "Home":
              icon = <Home2 size={size} color={color} />;
              break;
            case "Calendar":
              icon = <Calendar size={size} color={color} />;
              break;
            case "Task":
              icon = <Task size={size} color={color} />;
              break;
            case "Map":
              icon = <Location size={size} color={color} />;
              break;
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name={"Home"} component={HomeNavigator} />
      <Tab.Screen name={"Calendar"} component={CalendarScreen} />
      <Tab.Screen name={"Task"} component={TaskNavigator} />
      <Tab.Screen name={"Map"} component={MapScreen} />
    </Tab.Navigator>
  );
}
