import {launchCamera} from 'react-native-image-picker';

export const captureImage = async () => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        saveToPhotos: true,
      });
      return response;
    } catch (error) {
      console.warn('Error capturing image:', error);
      return null;
    }
  };