import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import {
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appColors } from "../../../constants/appColors";
import { appInfo } from "../../../constants/appInfo";

export default function Notify({ message, image, name }: any) {
  const updatedMessage = (message: string) => {
    const messageArray = message.split(": ");
    return {
      title: messageArray[0],
      body: messageArray[1],
    };
  };
  return (
    <SectionComponent styles={styles.wrapper}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View
          style={{
            width: appInfo.size.WIDTH * 0.1,
            height: appInfo.size.WIDTH * 0.1,
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
            text={name[0]}
          />
        </View>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <TextComponent
          text={updatedMessage(message).title}
          size={14}
          styles={{
            marginLeft: 12,
            fontWeight: "700",
          }}
        />
        <SpaceComponent height={3} />
        <TextComponent
          text={updatedMessage(message).body}
          size={12}
          styles={{
            fontStyle: "italic",
            marginLeft: 12,
          }}
        />
      </View>
      <View></View>
    </SectionComponent>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: appColors.blue,
    flexDirection: "row",
    paddingVertical: 24,
    marginVertical: 4,
    borderRadius: 8,
  },
  image: {
    width: appInfo.size.WIDTH * 0.1,
    height: appInfo.size.WIDTH * 0.1,
    borderRadius: 50,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
