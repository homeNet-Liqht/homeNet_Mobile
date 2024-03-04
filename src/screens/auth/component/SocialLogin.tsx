import * as React from "react";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
} from "../../../components";
import { appColors } from "../../../constants/appColors.ts";
import { Google, Facebook } from "../../../assets/svgs";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import authApi from "../../../apis/authApi.ts";
import LoadingModal from "../../../modals/LoadingModal.tsx";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../redux/reducers/authReducer.ts";
import CookieManager from "@react-native-cookies/cookies";
import {
  Settings,
  LoginManager,
  LoginButton,
  Profile,
} from "react-native-fbsdk-next";
GoogleSignin.configure({
  webClientId:
    "832402804801-e4q8gdqr1sqda5brt14skrda108bt3oh.apps.googleusercontent.com",
});
Settings.setAppID("427623953051055");

const SocialLogin = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;

      const res = await authApi.SignInWithGoogle(user);

      await CookieManager.get(
        `${process.env.REACT_APP_API_URL}/auth/social-login`
      ).then((cookie) => {
        console.log(cookie);
        setIsLoading(false);
        dispatch(
          addAuth({
            email: res.data.data.email,
            accessToken: cookie.accesstoken.value,
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
      ]);

      if (result.isCancelled) {
        console.log("Login Cancelled");
      } else {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          const user = {
            name: profile.name,
            photo: profile.imageURL,
            email: profile.userID,
          };
          const res = await authApi.SignInWithGoogle(user);

          await CookieManager.get(
            `${process.env.REACT_APP_API_URL}/auth/social-login`
          ).then((cookie) => {
            console.log(cookie);
            setIsLoading(false);
            dispatch(
              addAuth({
                email: res.data.data.email,
                accessToken: cookie.accesstoken.value,
              })
            );
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SectionComponent>
      <RowComponent styles={{ paddingHorizontal: 20 }}>
        <ButtonComponent
          styles={{ borderRadius: 30 }}
          text={"Google"}
          type={"primary"}
          color={appColors.white}
          textColor={"black"}
          iconFlex={"left"}
          icon={<Google />}
          onPress={() => handleGoogleLogin()}
        />
        <ButtonComponent
          styles={{ borderRadius: 30 }}
          text={"Facebook"}
          type={"primary"}
          color={appColors.white}
          textColor={"black"}
          iconFlex={"left"}
          icon={<Facebook />}
          onPress={() => handleFacebookLogin()}
        />
      </RowComponent>

      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;
