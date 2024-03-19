import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator.tsx";
import CreateFamilyScreen from "../screens/Family/CreateFamilyScreen.tsx";

import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { useEffect, useRef } from "react";
import NotificationPopup from "react-native-push-notification-popup";
import PopupComponent from "../components/PopupComponent.tsx";
import DrawerNavigator from "./DrawerNavigator.tsx";
export default function MainNavigator() {
  const notificationPopupRef = useRef<NotificationPopup | null>(null);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (mess: FirebaseMessagingTypes.RemoteMessage) => {
        if (Platform.OS === "android" && notificationPopupRef.current) {
          notificationPopupRef.current.show({
            title: mess.notification?.title,
            body: mess.notification?.body,
          });
        }
      }
    );
    return unsubscribe;
  });

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Main'} component={DrawerNavigator} />
        <Stack.Screen
          name={"CreateFamilyScreen"}
          component={CreateFamilyScreen}
        />
      </Stack.Navigator>
      <NotificationPopup
        ref={notificationPopupRef}
        renderPopupContent={(options) => <PopupComponent options={options} />} 
      />
    </>
  );

}
