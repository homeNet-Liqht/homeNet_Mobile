import React, {useState} from "react";
import {View, Image, FlatList, TouchableOpacity, Modal, Platform, TextInput, StyleSheet} from "react-native";
import {
    ContainerComponent, InputComponent,
    RowComponent, SectionComponent, SpaceComponent,
    TextComponent,
} from "../../components";
import {appInfo} from "../../constants/appInfo";
import {appColors} from "../../constants/appColors";
import {useDispatch, useSelector} from "react-redux";
import {addUser, userSelector,} from "../../redux/reducers/userReducer";
import {LoadingModal} from "../../modals";
import DatePicker from "react-native-date-picker";
import {userApi} from "../../apis";
import {selectFile} from "../../utils/photoLibraryAction.tsx";
import {DocumentPickerResponse} from "react-native-document-picker";
import Feather from "react-native-vector-icons/Feather"



export default function EditProfileScreen({navigation}: any) {
    const dispatch =useDispatch()
    const user = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [photo, setPhoto] = useState<DocumentPickerResponse>();

    const [isChangePhoto, setIsChangePhoto] = useState(false)

    const [date, setDate] = useState(new Date(user.birthday))
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)

    const formData = new FormData();



    const openImagePicker = async ({navigation} : any) =>{
        const res =  await selectFile()
        if (res){
            setPhoto(res[0])
            setSelectedImage(res[0].uri)
            setIsChangePhoto(true)
        }
    }



    const handleChangeImage = async () => {
        setIsLoading(true)
        formData.append('image', photo);
        try {
            await userApi.updateImage(formData, user._id)
            await getCurrentUser()
            setIsChangePhoto(false)
            setIsLoading(false)
        }catch (e:any) {
            setIsLoading(false)
        }
    }

    const getCurrentUser = async () => {
        const currentUser = await userApi.currentUser();
        if (currentUser) {
            dispatch(addUser(currentUser.data));
        }
    };

    const handleCancel = () => {
        setIsChangePhoto(false)
    }

    const handleConfirm  = async () =>{
        try {
            setIsLoading(true)
            const res = await userApi.editUser(user._id,name,date,phone)
            await getCurrentUser()
            setIsLoading(false)
            navigation.navigate("ProfileScreen")
        }catch (e) {
            setIsLoading(false)
        }
    }

    const confirmAction = {
        icon: <Feather name={"check"}  color={appColors.primary} size={24}/>,
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
                        isChangePhoto ?
                            <RowComponent justify={"space-around"} styles={{width: appInfo.size.WIDTH * 0.5, paddingTop: 10}}>
                                <TouchableOpacity onPress={handleCancel}>
                                    <TextComponent text={"cancel"} color={appColors.primary}  />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {handleChangeImage()}}>
                                    <TextComponent text={"Save"} color={appColors.primary} />
                                </TouchableOpacity>
                            </RowComponent>:<TouchableOpacity style={{
                                padding: 5,
                                borderRadius: 100
                            }} onPress={openImagePicker}>
                                <TextComponent text={"change your photo"} color={appColors.primary}/>
                            </TouchableOpacity>
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
