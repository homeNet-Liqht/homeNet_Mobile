import React from "react";
import { Image, TouchableOpacity, Button, StyleSheet } from "react-native";
import {
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import { appColors } from "../../../constants/appColors";

export default function Notify() {
  return (
    <SectionComponent styles={styles.wrapper}>
      <RowComponent
        styles={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 6,
          backgroundColor: appColors.blue
        }}
      >
        <Image
          source={require("../../../assets/imgs/profile.png")}
          style={styles.image}
        />
        <SectionComponent styles={{ flexDirection: "column", gap: 10 }}>
          <TextComponent
            text="Thai Hoang just assign you a Task"
            styles={{ fontWeight: "700", fontSize: 16, width: "80%" }}
          />
          <TouchableOpacity>
            <Button title="detail" />
          </TouchableOpacity>
        </SectionComponent>

        <SectionComponent>
          <TextComponent text="18m" />
        </SectionComponent>
      </RowComponent>
    </SectionComponent>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
