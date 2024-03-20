import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  SectionComponent,
  InputComponent,
  TextComponent,
} from "../../../../components";
import { appColors } from "../../../../constants/appColors";

export default function Description({
  data,
  editData,
  isEdit,
  handleChange,
}: any) {
  return (
    <SectionComponent styles={styles.infoWrapper}>
      <TextComponent
        text="Description"
        size={12}
        styles={styles.subTitle}
        color={appColors.gray}
      />
      {isEdit ? (
        <InputComponent
          isPassword={false}
          value={editData.title}
          onChange={handleChange}
        />
      ) : (
        <TextComponent text={data.description} />
      )}
    </SectionComponent>
  );
}
const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 5,
  },
  infoWrapper: {
    justifyContent: "flex-start",
  },
});
