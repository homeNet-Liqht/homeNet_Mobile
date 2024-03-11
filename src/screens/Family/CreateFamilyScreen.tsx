import React, {useState} from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent,
} from '../../components';
import {appInfo} from '../../constants/appInfo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {selectFile} from '../../utils/photoLibraryAction';
import { appColors } from '../../constants/appColors';
export default function CreateFamilyScreen() {
    const [familyName, setFamilyName] = useState('');
    const [fileResponse, setFileResponse] =
        useState<DocumentPickerResponse | null>(null);

    const handleOnChange = value => setFamilyName(value);
    const handlePhotoPicker = async () => {
        const response = await selectFile();
        if (response) {
            setFileResponse(response);
        }
    };
    return (
        <ContainerComponent back title="Create a Family">
            <RowComponent>
                <ImageBackground
                    source={require('../../assets/imgs/family-tree.png')}
                    style={styles.image}
                    imageStyle={{
                        resizeMode: 'contain',
                    }}>

                    {fileResponse ? (
                        <RowComponent>
                            <ImageBackground
                                source={{uri: fileResponse[0].uri}}
                                style={styles.imageFrame}>
                                <TouchableOpacity
                                    style={styles.redo}
                                    onPress={()=> setFileResponse(null)}>
                                    <EvilIcons name="redo" size={35} color={appColors.white} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </RowComponent>
                    ) : (
                        <TouchableOpacity style={styles.frame} onPress={handlePhotoPicker}>
                            <EvilIcons name="image" size={85} />
                        </TouchableOpacity>
                    )}
                </ImageBackground>
            </RowComponent>

            <RowComponent>
                <InputComponent
                    value="Hoang's Family"
                    isPassword={false}
                    onChange={handleOnChange}
                />
            </RowComponent>
            <ButtonComponent
                type="primary"
                text="Continue"
                styles={{borderRadius: 25}}
            />
        </ContainerComponent>
    );
}
const styles = StyleSheet.create({
    image: {
        width: appInfo.size.WIDTH * 0.65,
        height: appInfo.size.HEIGHT * 0.65,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingTop: 10,
        borderRadius: 25,
        objectFit: 'cover',
    },
    frame: {
        position: 'absolute',
        bottom: 58,
        right: appInfo.size.WIDTH * 0.22,
        transform: [
            {
                rotateZ: '-3deg',
            },
        ],
    },
    redo: {
        position: 'absolute',
        backgroundColor: appColors.primary,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        top: -20,
        right: -25
    },
    imageFrame: {
        position: 'absolute',
        width: 95,
        height: 65,
        bottom: 58,
        objectFit: 'cover',
        right: appInfo.size.WIDTH * 0.2,
        transform: [
            {
                rotateZ: '-3deg',
            },
        ],
    },
});
