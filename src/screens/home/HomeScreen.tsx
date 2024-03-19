import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RowComponent, TextComponent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../apis";
import { addUser, userSelector } from "../../redux/reducers/userReducer";
import { LoadingModal } from "../../modals";
import { globalStyles } from "../styles/globalStyles.ts";
import { appColors } from "../../constants/appColors.ts";
import { appInfo } from "../../constants/appInfo.ts";
import { HambergerMenu, Notification } from "iconsax-react-native";
import getCurrentPosition from "../../utils/getCurrentPosition.ts";
import getWeatherOfCurrentPosition from "../../utils/getWeatherOfCurrentPosition.ts";
import CircleComponent from "../../components/CircleComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }: any) {
  const [userData, setUserData] = useState(useSelector(userSelector));
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    icon: "",
    temp: "",
    weather: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.name == "") {
      setIsLoading(true);
      getCurrentUser();
    }
  }, [dispatch]);

  useEffect(() => {
    getWeatherInCurrentPosition();
  }, []);

  const getWeatherInCurrentPosition = async () => {
    const currentPosition = await getCurrentPosition();

    if (currentPosition) {
      const res = await getWeatherOfCurrentPosition(
        currentPosition.latitude,
        currentPosition.longitude
      );
      res &&
        setCurrentWeather({
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          weather: res.data.weather[0].description,
        });
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await userApi.currentUser();
    if (currentUser) {
      const user = currentUser.data;
      dispatch(addUser(user));
      setUserData(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }

    return (
      <View style={[globalStyles.container]}>
        <View
          style={{
            height: appInfo.size.HEIGHT * 0.2,
            backgroundColor: appColors.primary,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            padding: StatusBar.currentHeight,
            justifyContent: "space-between",
          }}
        >
          <RowComponent styles={{ justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={25} color={appColors.white} />
            </TouchableOpacity>
            <RowComponent>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${currentWeather.icon}.png`,
                }}
                width={50}
                height={50}
              />
              <TextComponent
                size={10}
                color={appColors.white}
                text={currentWeather.weather}
              />
              <TextComponent
                size={10}
                color={"yellow"}
                styles={{ fontWeight: "bold" }}
                text={
                  " " +
                  (parseFloat(currentWeather.temp) - 273.15).toString() +
                  "°C"
                }
              />
            </RowComponent>
            <CircleComponent color={"#524CE0"} size={36}>
              <Notification size={24} color={appColors.white} />
              <View
                style={{
                  backgroundColor: "coral",
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  position: "absolute",
                  right: 8,
                  top: 5,
                }}
              />
            </CircleComponent>
          </RowComponent>
          <RowComponent
            styles={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <TextComponent
              size={12}
              color={appColors.white}
              text={"Good Morning"}
            />
            <TextComponent
              color={appColors.white}
              size={24}
              styles={{ fontWeight: "bold" }}
              text={userData.name}
            />
          </RowComponent>
        </View>

        <View
          style={{
            flex: 1,
          }}
        ></View>
        <LoadingModal visible={isLoading} />
      </View>
    );
  };
}

export default HomeScreen;
