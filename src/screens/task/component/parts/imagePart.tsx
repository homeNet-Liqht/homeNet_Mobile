import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SectionComponent, TextComponent } from "../../../../components";
import { appColors } from "../../../../constants/appColors";
import ImageView from "react-native-image-viewing";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function ImagesPart({
  data,
  editData,
  isEdit,
  handleChange,
  removePicture,
}: any) {
  const [imageGalleryVisible, setImageGalleryVisible] = useState(false);
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  const taskPhotoObjects = data.taskPhoto.map((url: string) => ({ uri: url }));

  const handleRemovePicture = (index: number) => {
    removePicture(index);
  };

  return (
    <SectionComponent styles={styles.infoWrapper}>
      {data.taskPhoto && data.taskPhoto.length > 0 && (
        <>
          <TextComponent
            text="Images"
            size={12}
            styles={styles.subTitle}
            color={appColors.gray}
          />
          <SectionComponent styles={styles.imagesWrapper}>
            {isEdit ? (
              <>
                {editData.taskPhoto.map((photo: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleRemovePicture(index)}
                  >
                    <ImageBackground
                      borderRadius={12}
                      source={{ uri: photo }}
                      style={[styles.taskImage, styles.wrapperPicker]}
                    >
                      <EvilIcons
                        name="trash"
                        size={55}
                        color={appColors.white}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={handleChange}
                >
                  <EvilIcons name={"image"} size={50} />
                </TouchableOpacity>
              </>
            ) : (
              data.taskPhoto.map((photo: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setImageGalleryVisible(true);
                    setImageGalleryIndex(index);
                  }}
                >
                  <Image source={{ uri: photo }} style={styles.taskImage} />
                </TouchableOpacity>
              ))
            )}
          </SectionComponent>
        </>
      )}
      <ImageView
        images={taskPhotoObjects}
        visible={imageGalleryVisible}
        onRequestClose={() => setImageGalleryVisible(false)}
        imageIndex={imageGalleryIndex}
        doubleTapToZoomEnabled
      />
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
  imagePicker: {
    borderWidth: 1,
    borderStyle: "dashed",
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "white",
  },
  wrapperPicker: {
    justifyContent: "center",
    alignItems: "center",
  },
});
