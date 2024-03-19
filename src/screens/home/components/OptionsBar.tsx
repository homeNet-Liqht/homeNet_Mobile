import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RowComponent, TextComponent } from "../../../components";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { appColors } from "../../../constants/appColors";
import getCurrentLocation from "../../../utils/currentLocation";
import { requestLocationPermission } from "../../../utils/requestDevices";
import axios from "axios";
import { Address } from "../../../models/address";

export default function OptionsBar({ navigation }: any) {
  const [Address, setAddress] = useState<Address | undefined>();
  const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=0OPlFVVJSTYFPB-K40HdhGU8wcF6Xb895fCoJ5m1xhM&at=${lat},${long}&lang=en-US`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setAddress(items[0].address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const granted = await requestLocationPermission();
        if (granted) {
          const position: any = await getCurrentLocation();
          reverseGeoCode(position.latitude, position.longitude);
        }
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    fetchCurrentLocation();
  }, []);

  return (
    <RowComponent
      styles={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity>
        <EvilIcons name={"navicon"} size={30} />
      </TouchableOpacity>
      <RowComponent>
        {Address && (
          <RowComponent styles={{ marginRight: 10 }}>
            <TextComponent
              text={`${Address.city}, ${Address.countryName}`}
              size={16}
            />
          </RowComponent>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <EvilIcons name={"bell"} size={35} style={styles.bell} />
          <View style={styles.noti}>
            <TextComponent
              text="0"
              color={appColors.white}
              size={12}
            ></TextComponent>
          </View>
        </TouchableOpacity>
      </RowComponent>
    </RowComponent>
  );
}

const styles = StyleSheet.create({
  noti: {
    position: "absolute",
    right: -2,
    top: -5,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: appColors.primary,
  },
  bell: {
    transform: [
      {
        rotateZ: "20deg",
      },
    ],
  },
});
