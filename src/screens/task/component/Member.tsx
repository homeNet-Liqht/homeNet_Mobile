import React from "react";
import { Image, StyleSheet } from "react-native";
import { RowComponent, TextComponent } from "../../../components";
import { appColors } from "../../../constants/appColors";
import { appInfo } from "../../../constants/appInfo";

export default function Member() {
  return (
    <RowComponent styles={styles.memberWrapper}>
      <Image
        source={require("../../../assets/imgs/profile.png")}
        style={styles.image}
      />
      <TextComponent text="Name" color={appColors.white} />
    </RowComponent>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    objectFit: "cover",
  },
  memberWrapper: {
    justifyContent: "space-around",
    backgroundColor: appColors.gray,
    width: appInfo.size.WIDTH * 0.3,
    height: appInfo.size.HEIGHT * 0.06,
    borderRadius: 30,
  },
});
