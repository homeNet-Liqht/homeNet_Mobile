import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator.tsx";
import DrawerCustoms from "../components/DrawerCustoms.tsx";
import TaskNavigator from "./TaskNavigator.tsx";
import TabNavigator from "./TabNavigator.tsx";

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  return(
      <Drawer.Navigator
          screenOptions={{
              headerShown: false,
              drawerPosition: "left",
          }}
          drawerContent={props => <DrawerCustoms {...props}/>}>
          <Drawer.Screen name={"Draw"} component={TabNavigator}/>
      </Drawer.Navigator>
  )
}

export default DrawerNavigator
