import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../../../components';
import {DocumentPickerResponse} from 'react-native-document-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {appInfo} from '../../../constants/appInfo';
import { captureImage } from '../../../utils/cameraAction';
import { selectFile } from '../../../utils/photoLibraryAction';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../utils/requestDevices';

export default function UpdatePicture() {
  const [fileResponse, setFileResponse] =
    useState<DocumentPickerResponse | any>();
  const [selectedImage, setSelectedImage] = useState<string | any>(null);

  const handleCaptureImage = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      const response = await captureImage();
      if (response) setSelectedImage(response);
    }
  };

  const handleDocumentSelection = async () => {
    const response = await selectFile();
    if (response) {
      setFileResponse(response);
    }
  };

  return (
    <RowComponent>
      {(fileResponse || selectedImage) && (
        <TouchableOpacity style={styles.check}>
          <EvilIcons name="like" size={25} />
        </TouchableOpacity>
      )}

      <SectionComponent styles={styles.container}>
        {fileResponse || selectedImage ? (
          <SectionComponent styles={[styles.wrapper, styles.nonImage]}>
            {fileResponse ? (
              <Image
                source={{uri: fileResponse[0]?.uri}}
                style={{width: '100%', height: '100%', borderRadius: 25}}
              />
            ) : selectedImage ? (
              <Image
                source={{uri: selectedImage?.assets[0]?.uri}}
                style={{width: '100%', height: '100%', borderRadius: 25}}
              />
            ) : (
              <View></View>
            )}
          </SectionComponent>
        ) : (
          <SectionComponent styles={styles.wrapper}>
            <RowComponent>
              <TouchableOpacity onPress={handleCaptureImage}>
                <EvilIcons name={'camera'} size={100} />
              </TouchableOpacity>
              <SpaceComponent width={50} />
              <TouchableOpacity onPress={handleDocumentSelection}>
                <EvilIcons name={'image'} size={100} />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
        )}
      </SectionComponent>
    </RowComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    width: appInfo.size.WIDTH,
    height: appInfo.size.HEIGHT * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonImage: {
    borderWidth: 0,
  },
  check: {
    position: 'absolute',
    top: 56,
    right: -20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 0,
    position: 'absolute',
    width: appInfo.size.WIDTH * 0.9,
    height: appInfo.size.HEIGHT * 0.45,
    backgroundColor: 'transparent',
    borderRadius: 25,
    top: 0,
    right: 0,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
