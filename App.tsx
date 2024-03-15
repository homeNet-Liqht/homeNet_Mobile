import React, { useEffect } from "react";


import { SplashScreen } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./src/redux/store.ts";
import AppRouter from "./src/navigators/AppRouter.tsx";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { NotificationServices } from "./src/utils/notificationService.tsx";


function App(): React.JSX.Element {
  useEffect(() => {
  NotificationServices.checkNotificationPerson();
  }, []);


    return (
        <>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <StatusBar
                        backgroundColor={"rgba(0, 0, 0, 0)"} // Transparent background color
                        translucent={true} // Make the status bar translucent
                        barStyle={"dark-content"}
                    />
                    <AlertNotificationRoot>
                        <Provider store={store}>
                            <NavigationContainer>
                                <AppRouter/>
                            </NavigationContainer>
                        </Provider>
                    </AlertNotificationRoot>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    )

}

export default App;
