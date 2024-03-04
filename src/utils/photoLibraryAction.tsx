import DocumentPicker from 'react-native-document-picker';
export const selectFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      return response;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };
  