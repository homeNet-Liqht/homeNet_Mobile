import React, { useState } from "react";
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import ImageViewer from "react-native-image-zoom-viewer";
import { Image, StyleSheet, View } from "react-native";
import { appColors } from "../../../constants/appColors";
import Modal from "react-native-modal";
import { appInfo } from "../../../constants/appInfo";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
export default function Detail({
  id,
  ownerPhoto,
  ownerName,
  title,
  description,
  startTime,
  endTime,
  visible,
  assignees,
  taskPhoto,
  status,
  onClose,
  isAssigner,
}: any) {
  const handleClose = () => {
    onClose();
  };
  const isAccepting = (status: string) => {
    const [imageGalleryVisible, setImageGalleryVisible] = useState(false);
    return status === "accepting" ? (
      <SectionComponent styles={styles.buttonWrapper}>
        <ButtonComponent text="Accepting" type="primary" />
        <ButtonComponent
          text="Close"
          type="primary"
          onPress={() => handleClose()}
        />
      </SectionComponent>
    ) : (
      <SectionComponent styles={styles.buttonWrapper}>
        <ButtonComponent text="Mark as Done" type="primary" />
        <ButtonComponent
          text="Close"
          type="primary"
          onPress={() => handleClose()}
        />
      </SectionComponent>
    );
  };

  const isOwner = (isAssigner: boolean, status: string) => {
    return isAssigner ? (
      <SectionComponent styles={styles.buttonWrapper}>
        <ButtonComponent text="Edit" type="primary" />
        <ButtonComponent text="Delete" type="primary" />
        <ButtonComponent
          text="Close"
          type="primary"
          onPress={() => handleClose()}
        />
      </SectionComponent>
    ) : (
      isAccepting(status)
    );
  };

  return (
    <Modal style={styles.wrapper} isVisible={visible}>
      <SectionComponent styles={styles.titleWrapper}>
        <SectionComponent>
          <TextComponent
            text={title}
            size={16}
            styles={{ fontWeight: "700" }}
          />
        </SectionComponent>
        <SectionComponent styles={styles.ownerWrapper}>
          <TextComponent text="Owner" size={10} color={appColors.gray} />
          {ownerPhoto ? (
            <Image source={{ uri: ownerPhoto }} style={styles.ownerProfile} />
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
                text={ownerName[0]}
              />
            </View>
          )}
        </SectionComponent>
      </SectionComponent>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <SectionComponent>
          <SectionComponent styles={styles.infoWrapper}>
            <TextComponent
              text="Description"
              size={12}
              styles={styles.subTitle}
              color={appColors.gray}
            />
            <TextComponent text={description} />
          </SectionComponent>
          <SectionComponent styles={styles.infoWrapper}>
            <TextComponent text="Due date" size={12} color={appColors.gray} />
            <TextComponent text={endTime} />
          </SectionComponent>
          <SectionComponent styles={styles.infoWrapper}>
            <TextComponent
              text="Assignees"
              size={12}
              styles={styles.subTitle}
              color={appColors.gray}
            />
            <SectionComponent
              styles={{
                marginTop: 5,
                marginLeft: -15,
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {assignees && assignees.length > 0 ? (
                assignees.map((assignee:any) =>
                  assignee.photo ? (
                    <Image
                      key={assignee._id}
                      source={{ uri: assignee.photo }}
                      style={[styles.ownerProfile, { marginLeft: -8 }]}
                    />
                  ) : (
                    <View
                      key={assignee._id}
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
                        size={appInfo.size.WIDTH * 0.04}
                        styles={{ fontWeight: "bold" }}
                        text={assignee.name[0]}
                      />
                    </View>
                  )
                )
              ) : (
                <TextComponent text="Loading..." />
              )}
            </SectionComponent>
          </SectionComponent>
          <SectionComponent styles={styles.infoWrapper}>
            {taskPhoto && taskPhoto.length > 0 && (
              <>
                <TextComponent
                  text="Images"
                  size={12}
                  styles={styles.subTitle}
                  color={appColors.gray}
                />
                <SectionComponent styles={styles.imagesWrapper}>
                  {taskPhoto.map((photo :any, index:any) => (
                    <TouchableOpacity key={index}>
                      <Image source={{ uri: photo }} style={styles.taskImage} />
                    </TouchableOpacity>
                  ))}
                </SectionComponent>
              </>
            )}
          </SectionComponent>
        </SectionComponent>
        <ImageViewer imageUrls={taskPhoto} enableImageZoom  />
        <SectionComponent>{isOwner(isAssigner, status)}</SectionComponent>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: appColors.white,
    paddingTop: 24,
    borderRadius: 15,
    justifyContent: "center",
  },
  subTitle: {
    marginBottom: 5,
  },
  infoWrapper: {
    justifyContent: "flex-start",
  },
  titleWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonWrapper: {
    justifyContent: "center",
  },
  ownerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerProfile: {
    marginLeft: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  taskImage: {
    marginTop: 5,
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 5,
    resizeMode: "cover",
  },
  imagesWrapper: {
    marginLeft: -15,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
