import React from "react";
import {
  InputComponent,
  SectionComponent,
  TextComponent,
} from "../../../../components";
import { appColors } from "../../../../constants/appColors";
import { Image, StyleSheet, View } from "react-native";
import { appInfo } from "../../../../constants/appInfo";

export default function TitlePart({
  data,
  editData,
  isEdit,
  handleChange,
}: any) {
  return (
    <SectionComponent styles={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
      <SectionComponent>
        {isEdit ? (
          <InputComponent
            isPassword={false}
            value={editData.title}
            onChange={(val) => handleChange("title", val)}
          />
        ) : (
          <TextComponent
            text={data.title}
            size={16}
            styles={{ fontWeight: "700" }}
          />
        )}
      </SectionComponent>
      <SectionComponent styles={styles.ownerWrapper}>
        <TextComponent text="Owner" size={10} color={appColors.gray} />
        {data.ownerPhoto ? (
          <Image
            source={{ uri: data.ownerPhoto }}
            style={styles.ownerProfile}
          />
        ) : (
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: appColors.primary,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextComponent
              color={appColors.white}
              size={appInfo.size.WIDTH * 0.02}
              styles={{ fontWeight: "bold" }}
              text={data.ownerName[0]}
            />
          </View>
        )}
      </SectionComponent>
    </SectionComponent>
  );
}

const styles = StyleSheet.create({
  ownerProfile: {
    marginLeft: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  ownerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
