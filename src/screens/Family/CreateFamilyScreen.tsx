import React, {useState} from 'react';
import {
    Image, KeyboardAvoidingView, Platform,
    StyleSheet, TouchableOpacity, View,

} from 'react-native';
import {
    ButtonComponent,
    ContainerComponent, InputComponent, RowComponent,
} from '../../components';
import {appInfo} from '../../constants/appInfo';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {appColors} from '../../constants/appColors';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {selectFile} from "../../utils/photoLibraryAction.tsx";
import {Camera} from "iconsax-react-native";
import {familyApi} from "../../apis";
import {LoadingModal} from "../../modals";


export default function CreateFamilyScreen({navigation}: any) {

    const [familyName, setFamilyName] = useState("")
    const [photo, setPhoto] = useState<DocumentPickerResponse>();
    const formData = new FormData();
    const [isLoading,setIsLoading] = useState(false)
    const openImagePicker = async () => {
        const res = await selectFile()
        res && setPhoto(res[0])
    }
    const handleCreateFamily = async () =>{
        formData.append('image', photo);
        formData.append('familyName',familyName);
        setIsLoading(true)
        try {
            const res = await familyApi.create(formData)
            navigation.negative("ProfileScreen")
            setIsLoading(false)
        }catch (e:any) {
            console.log(e.error)
            setIsLoading(false)
        }
    }

    return (

        <ContainerComponent
            title={"Create Family"}
            back
        >

            <Image style={{
                width: appInfo.size.WIDTH,
                height: appInfo.size.HEIGHT * 0.4,
                bottom: appInfo.size.HEIGHT * 0.2,

                resizeMode: "contain",
                justifyContent: 'center',
                alignItems: "center",
                position: "absolute"
            }} source={require("../../assets/imgs/cr-famlily.png")}/>


            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    height: appInfo.size.HEIGHT
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}

            >

                <RowComponent>
                    {
                        photo ?
                            <TouchableOpacity onPress={() => openImagePicker()}>
                                <Image source={{uri: photo.uri}} style={[styles.imgContainer]}/>
                            </TouchableOpacity>
                            :
                            <>
                                <TouchableOpacity
                                    style={[styles.imgContainer, {
                                        backgroundColor: appColors.gray,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }]}
                                    onPress={() =>openImagePicker()}
                                >
                                    <FontAwesome name={"image"} size={32} color={"white"}/>
                                </TouchableOpacity>
                            </>
                    }
                </RowComponent>
                <RowComponent styles={{
                    flex: 1,
                    alignItems: "flex-end"

                }}>
                    <InputComponent styles={{
                        width: appInfo.size.WIDTH * 0.9,
                        backgroundColor: "white"

                    }} value={familyName} onChange={val => {
                        setFamilyName(val)
                    }} placeHolder={"Family name"} isPassword={false}/>
                </RowComponent>
            </KeyboardAvoidingView>
            <ButtonComponent text={"Create"} styles={{
                borderRadius: 100,
            }} type={"primary"} onPress={() => handleCreateFamily()}/>
            <LoadingModal visible={isLoading}/>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        borderRadius: 15,
        width: appInfo.size.WIDTH * 0.9,
        height: appInfo.size.HEIGHT * 0.3,
        resizeMode: "cover",
    },


})
