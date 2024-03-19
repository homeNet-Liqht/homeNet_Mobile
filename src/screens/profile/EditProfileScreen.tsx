import React, {useState} from "react";
import {View, Image, FlatList, TouchableOpacity, Modal, Platform, TextInput, StyleSheet} from "react-native";
import {
    ContainerComponent, InputComponent,
    RowComponent, SectionComponent, SpaceComponent,
    TextComponent,
} from "../../components";
import {appInfo} from "../../constants/appInfo";
import {appColors} from "../../constants/appColors";
import {useSelector} from "react-redux";
import {userSelector,} from "../../redux/reducers/userReducer";
import {LoadingModal} from "../../modals";
import {Camera, Check, Edit} from "iconsax-react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from "react-native-date-picker";
import {userApi} from "../../apis";
import Entypo from "react-native-vector-icons/Entypo";


export default function EditProfileScreen({navigation}: any) {
    const user = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [photo, setPhoto] = useState();

    const [date, setDate] = useState(new Date(user.birthday))
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)

    const formData = new FormData();


    const handleCancel = () => {
        setSelectedImage(null)
        console.log("cancel")
    }

    const handleChangeImage = async () => {
        setIsLoading(true)
        formData.append('image', photo);
        try {
            await userApi.updateImage(formData, user._id)
            setIsLoading(false)
        }catch (e:any) {
            console.log(e)
            setIsLoading(false)
        }


    }

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        // @ts-ignore
        launchImageLibrary(options, (response:any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setPhoto(response.assets[0])
                setSelectedImage(imageUri);
            }
        });
    };

    const handleConfirm  = () =>{
        console.log("hhw")
    }

    const confirmAction = {
        icon: <Check  color={appColors.primary} size={20}/>,
        action: () =>handleConfirm()

    }

    return (
        <>
            <ContainerComponent
                back
                title={"Edit Profile"}
                isScroll color={"#fff"}
                confirmAction={confirmAction}
            >
                <RowComponent styles={{flexDirection: "column", paddingTop: appInfo.size.HEIGHT * 0.03}}>
                    {user.photo || selectedImage
                        ?
                        <Image style={{
                            width: appInfo.size.WIDTH * 0.3,
                            height: appInfo.size.WIDTH * 0.3,
                            backgroundColor: appColors.primary,
                            borderRadius: 100,
                        }} source={{uri: selectedImage ? selectedImage : user.photo}}/>
                        :
                        <View style={{
                            width: appInfo.size.WIDTH * 0.3,
                            height: appInfo.size.WIDTH * 0.3,
                            backgroundColor: appColors.primary,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TextComponent
                                color={appColors.white}
                                size={appInfo.size.WIDTH * 0.05}
                                styles={{fontWeight: "bold"}}
                                text={user.name[0]}/>
                        </View>}
                    {
                        !selectedImage ? <TouchableOpacity style={{
                            padding: 5,
                            borderRadius: 100
                        }} onPress={openImagePicker}>
                            <TextComponent text={"change your photo"} color={appColors.primary}/>
                        </TouchableOpacity>:
                            <RowComponent justify={"space-around"} styles={{width: appInfo.size.WIDTH * 0.5, paddingTop: 10}}>
                                <TouchableOpacity onPress={handleCancel}>
                                    <TextComponent text={"cancel"} color={appColors.primary}  />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {handleChangeImage()}}>
                                    <TextComponent text={"Save"} color={appColors.primary} />
                                </TouchableOpacity>
                            </RowComponent>
                    }
                </RowComponent>
                <SectionComponent>
                    <View>
                        <TextComponent styles={{fontWeight:"bold"}} size={16} text={"Name"}/>
                        <TextInput onChangeText={val =>{setName(val)}} defaultValue={user.name} style={{
                            borderBottomWidth: 1,
                            borderColor: appColors.gray
                        }}/>
                    </View>
                    <SpaceComponent height={20}/>
                    <View>
                        <TextComponent   styles={{fontWeight:"bold"}} size={16}  text={"Phone"}/>
                        <TextInput keyboardType={"numeric"}
                                   onChangeText={val =>{setPhone(val)}}
                                   defaultValue={user.phone}
                                   placeholder={"Your phone"} style={{
                            borderBottomWidth: 1,
                            borderColor: appColors.gray
                        }}/>
                    </View>
                    <SpaceComponent height={20}/>
                    <View>
                        <TextComponent styles={{fontWeight:"bold"}} size={16} text={"Birth Day"}/>
                        <DatePicker mode={"date"} date={date} maximumDate = { new Date()} onDateChange={val => {setDate(val)}} />
                    </View>

                </SectionComponent>
                <LoadingModal visible={isLoading}/>
            </ContainerComponent>
        </>

    );
}

const styles = StyleSheet.create({


});
