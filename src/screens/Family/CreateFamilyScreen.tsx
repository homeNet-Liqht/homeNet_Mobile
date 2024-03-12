import React, {useState} from 'react';
import {
    Image, SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    ButtonComponent,
    InputComponent,
    RowComponent, TextComponent,
} from '../../components';
import {appInfo} from '../../constants/appInfo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {selectFile} from '../../utils/photoLibraryAction';
import {appColors} from '../../constants/appColors';
import {ArrowLeft} from "iconsax-react-native";

export default function CreateFamilyScreen({navigation}: any) {
    const [familyName, setFamilyName] = useState('');
    const [fileResponse, setFileResponse] =
        useState<DocumentPickerResponse | any>(null);

    const handleOnChange = (value: any) => setFamilyName(value);
    const handlePhotoPicker = async () => {
        const response = await selectFile();
        if (response) {
            setFileResponse(response);
        }
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <RowComponent
                styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    minWidth: 48,
                    minHeight: 48,
                    justifyContent: 'flex-start',
                }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{marginRight: 12}}>
                    <ArrowLeft size={24} color={appColors.text}/>
                </TouchableOpacity>
                <TextComponent text={"My Family"} size={16} flex={1}/>
            </RowComponent>

            {fileResponse ? (
                <RowComponent>
                    <Image
                        style={{
                            backgroundColor: appColors.gray,
                            width: appInfo.size.HEIGHT * 0.2,
                            height: appInfo.size.HEIGHT * 0.2,
                            borderRadius: 100
                        }}
                        source={{uri: fileResponse[0].uri}}/>

                    <TouchableOpacity
                        style={{
                            backgroundColor: appColors.primary,
                            position: "absolute",
                            top: 10,
                            width: 40,
                            height: 40
                        }}
                        onPress={() => setFileResponse(null)}>
                        <EvilIcons name="close" size={35} color={appColors.white}/>
                    </TouchableOpacity>

                </RowComponent>
            ) : (
                <TouchableOpacity style={{
                    backgroundColor: appColors.gray,
                    width: appInfo.size.HEIGHT * 0.2,
                    height: appInfo.size.HEIGHT * 0.2,
                    borderRadius: 100

                }} onPress={handlePhotoPicker}>
                    <EvilIcons style={{position: "absolute", right: "23%", top: "30%"}} name="image" size={85}/>
                </TouchableOpacity>
            )}


            <RowComponent styles={{flexDirection: "column"}}>
                <InputComponent value={familyName} onChange={val => setFamilyName(val)} isPassword={false}/>
                <ButtonComponent text={"Create"} color={appColors.primary} type={"primary"}/>
            </RowComponent>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({});
