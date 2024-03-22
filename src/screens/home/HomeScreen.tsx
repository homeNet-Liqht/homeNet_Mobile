import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
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
import capitalizedText from "../../utils/capitalizedText.tsx";
import { Address } from "../../models/address.tsx";
import reverseGeoCode from "../../utils/reverseLocation.ts";

function HomeScreen({ navigation }: any) {
  const [userData, setUserData] = useState(useSelector(userSelector));
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    icon: "",
    temp: "",
    weather: "",
  });
  const [address, setAddress] = useState<Address>();
  const dispatch = useDispatch();
  const temperatureConvert = (temp: any) => Math.floor(temp - 273.15) + "°";
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
      const resWeather = await getWeatherOfCurrentPosition(
        currentPosition.latitude,
        currentPosition.longitude
      );
      const resLocation = await reverseGeoCode(
        currentPosition.latitude,
        currentPosition.longitude
      );
      resWeather &&
        setCurrentWeather({
          icon: resWeather.data.weather[0].icon,
          temp: resWeather.data.main.temp,
          weather: resWeather.data.weather[0].description,
        });
      resLocation && setAddress(resLocation);
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await userApi.currentUser();
    if (currentUser) {
      dispatch(addUser(currentUser.data));
      setUserData(currentUser.data);
    }
    setIsLoading(false);
  };

  return (
    <View style={[globalStyles.container]}>
      <View
        style={{
          height: appInfo.size.HEIGHT * 0.25,
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
          {currentWeather ? (
            <SectionComponent
              styles={{ justifyContent: "center", alignItems: "center" }}
            >
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
                  text={
                    currentWeather.weather
                      ? capitalizedText(currentWeather.weather)
                      : "Loading..."
                  }
                />
                <TextComponent
                  size={10}
                  color={"yellow"}
                  styles={{ fontWeight: "bold" }}
                  text={
                    currentWeather.temp &&
                    " " +
                      temperatureConvert(currentWeather.temp).toString() +
                      "C"
                  }
                />
              </RowComponent>
              {address ? (
                <TextComponent
                  text={`${address.city}, ${address.countryName}`}
                  size={12}
                  styles={{ fontWeight: "bold" }}
                />
              ) : (
                <RowComponent>
                  <TextComponent text="Loading..." size={10} />
                </RowComponent>
              )}
            </SectionComponent>
          ) : null}
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
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
          </TouchableOpacity>
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
            text={userData.greeting && userData.greeting + ", "}
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
}

export default HomeScreen;

const styles = StyleSheet.create({});
