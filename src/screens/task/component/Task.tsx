import React from "react";
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appInfo } from "../../../constants/appInfo";
import { Image, Platform, StyleSheet, View } from "react-native";
import capitalizedText from "../../../utils/capitalizedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors } from "../../../constants/appColors";

interface TaskProps {
  title: string;
  status: string;
  photo: string;
  name: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return appColors.primary;
    case "time":
      return appColors.orange;
    case "finished":
      return appColors.green;
    case "missing":
      return appColors.red;
    default:
      return appColors.text;
  }
};

const Task: React.FC<TaskProps> = ({ title, status, photo, name }) => {
  const color = getStatusColor(status);
  const capitalizedTitle = capitalizedText(title);
  const capitalizedStatus = capitalizedText(status);
  return (
    <SectionComponent styles={styles.taskWrapper}>
      <RowComponent styles={styles.taskShow}>
        <TextComponent
          text={capitalizedTitle}
          size={13}
          styles={{
            fontWeight: "700",
            maxWidth: appInfo.size.WIDTH * 0.3,
          }}
        />
        <RowComponent styles={styles.taskShow}>
          <TextComponent text={status === "time" ? "Your time has come" : capitalizedStatus} size={13} color={color} styles={{fontWeight: "700"}}/>
          <SpaceComponent width={appInfo.size.WIDTH * 0.1} />
          {photo ? (
            <Image
              style={{
                width: appInfo.size.WIDTH * 0.1,
                height: appInfo.size.WIDTH * 0.1,
                backgroundColor: appColors.primary,
                borderRadius: 100,
              }}
              source={{ uri: photo }}
            />
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
        </RowComponent>
      </RowComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    marginBottom: 12,
    borderRadius: 7,
    paddingTop: 15,
    ...Platform.select({
      android: {
        elevation: 1.5,
      },
    }),
  },
  taskShow: {
    justifyContent: "space-between",
  },
  ownerImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    resizeMode: "cover",
  },
});

export default Task;
