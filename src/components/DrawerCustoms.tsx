import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { RowComponent, TextComponent } from "./index.ts";
import { removeUser, userSelector } from "../redux/reducers/userReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../screens/styles/globalStyles.ts";
import { appColors } from "../constants/appColors.ts";
import { appInfo } from "../constants/appInfo.ts";
import { Calendar, Logout, User } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";
import { authSelector, removeAuth } from "../redux/reducers/authReducer.ts";
import { useState } from "react";
import LoadingModal from "../modals/LoadingModal.tsx";
import userApi from "../apis/userApi.ts";

const DrawerCustoms = ({ navigation }: any) => {
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  const size = 20;
  const color = appColors.gray;
  const DrawMenu = [
    {
      key: "ProfileScreen",
      title: "My Profile",
      icon: <User size={size} color={color} />,
    },
    {
      key: "Calendar",
      title: "Calendar",
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: "Logout",
      title: "Logout",
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleLogout = async () => {
    try {
      
      setIsLoading(true);
      const fcmToken = await AsyncStorage.getItem("fcmToken");
      console.log(user);
      
      if(fcmToken) {
        if (user.fcmToken && user.fcmToken.length > 0) {
          const items = [...user.fcmToken];
          const index = items.findIndex(e => e === fcmToken)
          console.log(index);
          if (index !== -1) {
            items.splice(index, 1)
          }

          console.log(items);
          await userApi.updateFCMToken(user._id, items)
        }
      }
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      await GoogleSignin.signOut();
      await LoginManager.logOut();
      await dispatch(removeAuth());
      await dispatch(removeUser());

      setIsLoading(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View
      style={[
        globalStyles.container,
        {
          padding: 16,
          paddingTop: StatusBar.currentHeight,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home", {
            screen: "ProfileScreen",
          });
        }}
      >
        <View>
          {user.photo ? (
            <Image
              style={{
                width: appInfo.size.WIDTH * 0.2,
                height: appInfo.size.WIDTH * 0.2,
                backgroundColor: appColors.primary,
                borderRadius: 100,
              }}
              source={{ uri: user.photo }}
            />
          ) : (
            <View
              style={{
                width: appInfo.size.WIDTH * 0.2,
                height: appInfo.size.WIDTH * 0.2,
                backgroundColor: appColors.primary,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextComponent
                color={appColors.white}
                size={appInfo.size.WIDTH * 0.05}
                styles={{ fontWeight: "bold" }}
                text={user.name[0]}
              />
            </View>
          )}
          <TextComponent
            size={appInfo.size.WIDTH * 0.06}
            styles={{ fontWeight: "bold", marginTop: 5 }}
            text={user.name}
          />
        </View>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={DrawMenu}
        style={{ flex: 1, marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <RowComponent
            styles={{
              paddingVertical: 12,
              justifyContent: "flex-start",
            }}
            onPress={() => {
              item.key == "Logout"
                ? handleLogout()
                : navigation.navigate(`${item.key}`);
            }}
          >
            {item.icon}
            <TextComponent
              styles={{
                paddingLeft: 12,
              }}
              text={item.title}
            />
          </RowComponent>
        )}
      />
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default DrawerCustoms;
