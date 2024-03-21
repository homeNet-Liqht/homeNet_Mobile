import React, {useEffect, useState} from "react";
import {View, Image, FlatList} from "react-native";
import {
    ButtonComponent,
    ContainerComponent,
    RowComponent, SectionComponent,

    SpaceComponent,
    TextComponent,
} from "../../components";

import {appInfo} from "../../constants/appInfo";
import {appColors} from "../../constants/appColors";
import {useSelector} from "react-redux";
import {userSelector,} from "../../redux/reducers/userReducer";
import {LoadingModal} from "../../modals";
import Entypo from "react-native-vector-icons/Entypo";
import {Edit, Lock, Logout} from "iconsax-react-native";
import {familyApi} from "../../apis";

export default function ProfileScreen({navigation}: any) {
    const user = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [family, setFamily]= useState<any>(1)

    useEffect(() => {
        GetFamily()
    }, []);


    const GetFamily = async () =>{
        try {
            setIsLoading(true)
            const res = await familyApi.getFamily()
            res ? setFamily(res.data.data): setFamily(null)
            setIsLoading(false)
        }catch (e){
            setIsLoading(false)
        }
    }

    const size = 20;
    const color = appColors.gray


    const bottomSheetFlatList = [
        {
            key: "EditProfileScreen",
            title: "Edit profile",
            icon: <Edit size={size} color={color}/>
        },
        {
            key: "Change Password",
            title: "Change Password",
            icon: <Lock size={size} color={color}/>
        },
        {
            key: "Logout",
            title: "Logout",
            icon: <Logout size={size} color={color}/>
        },
    ]
    const moreAction = {
        moreActionIcon: <Entypo name={"dots-three-vertical"} size={20}/>,
        titleBottomSheet: 'Settings',
        dataBottomSheet: bottomSheetFlatList,
    }
    return (
        <>
            <ContainerComponent
                back
                title={"My Profile"}
                isScroll color={"#fff"}
                moreAction={moreAction}


            >

                <RowComponent styles={{flexDirection: "column", paddingTop: appInfo.size.HEIGHT * 0.03}}>
                    {user.photo
                        ?
                        <Image style={{
                            width: appInfo.size.WIDTH * 0.3,
                            height: appInfo.size.WIDTH * 0.3,
                            backgroundColor: appColors.primary,
                            borderRadius: 100,
                        }} source={{uri: user.photo}}/>
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
                    <TextComponent size={appInfo.size.WIDTH * 0.06}
                                   styles={{fontWeight: "bold", marginTop: appInfo.size.HEIGHT * 0.02}}
                                   text={user.name}/>
                </RowComponent>
                <SpaceComponent height={20}/>
                {
                    !family ?

                        <>
                            <SectionComponent styles={{
                                justifyContent:"center",
                                alignItems: "center",
                            }}>

                                <RowComponent styles={{
                                    width: appInfo.size.WIDTH * 0.9,
                                    backgroundColor: appColors.primary,
                                    borderRadius: 20,
                                    padding: 5,
                                    flexDirection: "row",
                                    alignItems:"center",
                                    justifyContent: "space-between"
                                }}>
                                    <SectionComponent styles={{
                                        flex: 1,
                                        height: appInfo.size.HEIGHT *0.15,
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        }} >
                                        <TextComponent size={14}
                                                       color={appColors.white}
                                                       styles={{fontWeight: "bold"}}
                                                       text={"Create Family now!!"}/>
                                        <ButtonComponent styles={{
                                            borderRadius: 30,
                                            paddingHorizontal: 5,
                                            paddingVertical: 5,
                                            minHeight: 10,
                                            marginBottom:0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: appColors.red,
                                        }}
                                                         text={"Create"}
                                                         onPress={() => {
                                                             navigation.navigate("CreateFamilyScreen")
                                                         }}
                                                         type={"primary"}
                                                         textStyles={{fontWeight: "bold"}}
                                                         textColor={appColors.white}
                                                         color ={appColors.white}/>



                                        <ButtonComponent  styles={{
                                            borderRadius: 30,
                                            paddingHorizontal: 5,
                                            paddingVertical: 5,
                                            minHeight: 10,
                                            marginBottom:0,
                                            backgroundColor: appColors.orange,

                                        }}  text={"Join"} textStyles={{fontWeight: "bold"}} type={"primary"} textColor={appColors.white} color={appColors.white}/>
                                    </SectionComponent>
                                    <SectionComponent styles={{flex: 1  }} >
                                        <Image source={require("../../assets/imgs/family-draw.png")} style={{
                                            width: appInfo.size.WIDTH * 0.4,
                                            resizeMode: "stretch",
                                            height: appInfo.size.HEIGHT *0.133}} />

                                    </SectionComponent>

                                </RowComponent>


                            </SectionComponent>
                        </>:
                        <RowComponent>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1
                            }}>
                                <TextComponent color={appColors.primary} styles={{fontWeight: "bold"}}
                                               text={family.familyName}/>
                            </View>
                            <View style={{
                                borderLeftColor: appColors.gray,
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1
                            }}>
                                <TextComponent color={appColors.primary} styles={{fontWeight: "bold"}} text={"0 Task"}/>
                            </View>
                        </RowComponent>
                }


                <LoadingModal visible={isLoading}/>
            </ContainerComponent>
        </>

    );

}
