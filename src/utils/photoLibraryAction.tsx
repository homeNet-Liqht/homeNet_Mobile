import DocumentPicker from "react-native-document-picker";
import ImageCropPicker from "react-native-image-crop-picker";
export const selectFile = async () => {
  try {
    const response = await DocumentPicker.pick({
      presentationStyle: "fullScreen",
    });
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const selectFiles = async () => {
  try {
    const responses = await DocumentPicker.pick({
      allowMultiSelection: true,
      type: [DocumentPicker.types.images],
    });

    if (!responses) {
      return null;
    }

    return responses;
  } catch (error) {
    console.warn("Error selecting files: ", error);
    return null;
  }
};
