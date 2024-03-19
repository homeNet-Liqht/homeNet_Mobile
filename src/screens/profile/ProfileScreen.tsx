import React, {useState} from "react";
import {View, Image, FlatList} from "react-native";
import {
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

export default function ProfileScreen({navigation}: any) {
    const user = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);


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
                <RowComponent>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1
                    }}>
                        <TextComponent color={appColors.primary} styles={{fontWeight: "bold"}}
                                       text={"Thai hoang family"}/>
                    </View>
                    <View style={{
                        borderLeftWidth: 1,
                        borderLeftColor: appColors.gray,
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1
                    }}>
                        <TextComponent color={appColors.primary} styles={{fontWeight: "bold"}} text={"0 Task"}/>
                    </View>
                </RowComponent>

                <LoadingModal visible={isLoading}/>
            </ContainerComponent>
        </>

    );
}
