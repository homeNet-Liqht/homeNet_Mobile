import React from "react";
import { ButtonComponent, SectionComponent, TextComponent } from ".";
import { Image, StyleSheet } from "react-native";
import { appInfo } from "../constants/appInfo";
import LinearGradient from "react-native-linear-gradient";
import { appColors } from "../constants/appColors";
import { ContentOptionsBase } from "react-native-push-notification-popup"; // Import ContentOptionsBase type

interface PopupComponentProps {
  options: ContentOptionsBase; 
}

const PopupComponent: React.FC<PopupComponentProps> = ({ options }) => {
  const { title, body } = options; 

  return (
    <LinearGradient
      colors={[
        "rgba(55,55,55,0.8)",
        "rgba(131,162,255,0.8)",
        "rgba(72,143,211,0.8)",
      ]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.container}
    >
      <SectionComponent styles={styles.wrapper}>
        <Image
          source={require("../assets/imgs/icon.png")}
          style={styles.image}
        />
        <SectionComponent styles={styles.textWrapper}>
          <TextComponent
            text="HOMENET"
            size={16}
            styles={{ fontWeight: "700" }}
            color={appColors.white}
          />
          <TextComponent
            text={`${title}\n${body}`} 
            size={15}
            color={appColors.white}
            styles={{ fontWeight: "500" }}
          />
        </SectionComponent>
      </SectionComponent>
      <SectionComponent styles={styles.buttonWrapper}>
        <ButtonComponent text="Detail" color={appColors.white} />
        <ButtonComponent text="I got it!" color={appColors.white} />
      </SectionComponent>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: appInfo.size.HEIGHT * 0.2,
    width: appInfo.size.WIDTH * 0.95,
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 5,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 5,
    objectFit: "cover",
  },
  textWrapper: {},
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default PopupComponent;
