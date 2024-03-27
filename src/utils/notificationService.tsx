import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { userApi } from "../apis";

export class NotificationServices {
  static checkNotificationPerson = async () => {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await this.getFCMToken();
    }
  };

  static getFCMToken = async () => {
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    if (!fcmToken) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem("fcmToken", token);
        await this.updateTokenForUser(token);
      }
    } else {
      await this.updateTokenForUser(fcmToken);
    }
  };

  static updateTokenForUser = async (token: string) => {
    const res = await AsyncStorage.getItem("user");

    if (res) {
      const auth = JSON.parse(res);
      const { fcmToken } = auth;

      if (!fcmToken.includes(token)) {
        fcmToken.push(token);

        await this.Update(auth._id, fcmToken);

      }
    }
  };

  static Update = async (id: string, token: string[]) => {

    try {
      const res = await userApi.updateFCMToken(id, token);
    } catch (error) {
      console.log(error);
    }
  };
}
