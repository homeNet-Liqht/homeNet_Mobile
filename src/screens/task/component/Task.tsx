import React from "react";
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appInfo } from "../../../constants/appInfo";
import { Image, Platform, StyleSheet } from "react-native";
import capitalizedText from "../../../utils/capitalizedText";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TaskProps {
  title: string;
  status: string;
  photo: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "accepting":
      return "green";
    case "pending":
      return "orange";
    case "finished":
      return "blue";
    case "cancelled":
      return "red";
    default:
      return "black";
  }
};

const Task: React.FC<TaskProps> = ({ title, status, photo }) => {
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
          <TextComponent text={capitalizedStatus} size={13} color={color} />
          <SpaceComponent width={appInfo.size.WIDTH * 0.1} />
          <Image source={{ uri: photo }} style={styles.ownerImage} />
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
