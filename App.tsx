import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import {Provider} from "react-redux";
import store from "./src/redux/store.ts";
import AppRouter from "./src/navigators/AppRouter.tsx";
import {AlertNotificationRoot} from "react-native-alert-notification";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CalendarProvider} from "react-native-calendars";
import getCurrentPosition from "./src/utils/getCurrentPosition.ts";
import locationApi from "./src/apis/locationApi.ts";

function App(): React.JSX.Element {


    const intervalId = setInterval(() => {
        getCurrentPosition().then(async  (item) =>{
            try {
                await locationApi.updateLocation(item.latitude, item.longitude)
            }catch (e) {
                console.log("cannot update",e)
            }
        })
    }, 15000);


    return (
        <>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <CalendarProvider date={"yyyy-MM-dd"}>
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
                    </CalendarProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    );
}

export default App;
