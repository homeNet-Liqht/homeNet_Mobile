import React from "react";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import { Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { appInfo } from "../../../constants/appInfo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function allScene() {
  return (
    <SectionComponent>
      <ScrollView
        style={{ width: appInfo.size.WIDTH, flexDirection: "column" }}
      >
        <RowComponent
          styles={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingVertical: 20,
            paddingHorizontal: 6,
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
      </ScrollView>
    </SectionComponent>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
