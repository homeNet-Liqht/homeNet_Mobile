import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import getCurrentLocation from "../../../utils/currentLocation";
import { requestLocationPermission } from "../../../utils/requestDevices";
import {
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import capitalizedText  from "../../../utils/capitalizedText";

export default function WeatherBar() {
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const granted = await requestLocationPermission();
        if (granted) {
          const position: any = await getCurrentLocation();
          setCurrentPosition(position);
        }
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (currentPosition.latitude && currentPosition.longitude) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${process.env.WEATHER_APP_API}`
          );
          setCurrentWeather({
            icon: response.data.weather[0].icon,
            temp: response.data.main.temp,
            weather: response.data.weather[0].description,
          });
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      }
    };

    fetchWeather();
  }, [currentPosition]);

  const temperatureConvert = (temp: any) => Math.floor(temp - 273.15) + "°";

  return (
    <SectionComponent styles={{ padding: 0 }}>
      {currentPosition && currentWeather ? (
        <RowComponent
          styles={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <Image
            source={{
              uri: `http://openweathermap.org/img/w/${currentWeather.icon}.png`,
            }}
            width={50}
            height={50}
          />
          <TextComponent
            text={capitalizedText(currentWeather.weather) + " "}
            size={18}
          />
          <TextComponent
            text={temperatureConvert(currentWeather.temp)}
            size={18}
          />
        </RowComponent>
      ) : (
        <TextComponent text="Loading" />
      )}
    </SectionComponent>
  );
}
