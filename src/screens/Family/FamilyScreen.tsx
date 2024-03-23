import React, {useEffect, useState} from 'react';
import {
    Image,
    StyleSheet, TouchableOpacity, View,

} from 'react-native';
import {
    ContainerComponent, RowComponent, SpaceComponent, TextComponent,
} from '../../components';
import {appInfo} from '../../constants/appInfo';

import {LoadingModal} from "../../modals";
import {familyApi} from "../../apis";
import {appColors} from "../../constants/appColors.ts";
import AntDesign from "react-native-vector-icons/AntDesign"
import Share from "react-native-share"
import FamilyApi from "../../apis/familyApi.ts";
export default function FamilyScreen({navigation}: any) {

    const [isLoading, setIsLoading] = useState(false)
    const [family, setFamily] = useState<any>()
    const [showInvitation, setShowInvitation] = useState(false)
    useEffect(() => {
        GetFamily()
    }, []);

    const handleShowInvitation = async () => {
            setIsLoading(true)
        try {
            const link = await FamilyApi.getFamilyLink()
            const shareOptions = {
                message: `${link.data.data}`,
            }

            try {
                const shareResponse = await Share.open(shareOptions);
                setIsLoading(false)

            }catch (e:any){
                setIsLoading(false)

            }
        }catch (e:any){
            setIsLoading(false)
        }

    }

    const GetFamily = async () => {
        try {
            setIsLoading(true)
            const res = await familyApi.getFamily()
            res ? setFamily(res.data.data) : setFamily(null)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }


    return (



        <ContainerComponent
            title={"Create Family"}
            back>
            {family && <>
                <RowComponent>
                    <Image source={{uri: family.photo}} style={[styles.imgContainer]}/>
                </RowComponent>
                <SpaceComponent height={20}/>
                <RowComponent>
                    <TextComponent text={"Name"} color={appColors.gray} size={16}/>
                </RowComponent>
                <SpaceComponent height={10}/>
                <RowComponent styles={{
                    alignItems: "flex-start"

                }}>
                    <TextComponent
                        styles={{fontWeight: "bold"}}
                        size={24} color={appColors.primary} text={family.familyName}/>
                </RowComponent>
                <SpaceComponent height={20}/>
                <RowComponent>
                    <TextComponent text={"Members"} color={appColors.gray} size={16}/>
                </RowComponent>
                <SpaceComponent height={20}/>
                <LoadingModal visible={isLoading}/>
                {
                    family && family.members.map((item: any, index: any) => (
                        <RowComponent key={index}>
                            <TouchableOpacity style={{
                                width: appInfo.size.WIDTH * 0.8,
                                height: appInfo.size.HEIGHT * 0.1,
                                backgroundColor: family.host == item._id ? appColors.red : appColors.primary,
                                borderRadius: 100,
                                padding: appInfo.size.HEIGHT * 0.01,
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 15
                            }}>
                                <Image style={{
                                    width: appInfo.size.HEIGHT * 0.08,
                                    height: appInfo.size.HEIGHT * 0.08,
                                    borderRadius: 100,
                                }} source={{uri: item.photo}}/>

                                <TextComponent size={16} styles={{
                                    fontWeight: "bold",
                                    marginLeft: 16
                                }} color={appColors.white} text={item.name}/>
                            </TouchableOpacity>
                        </RowComponent>
                    ))
                }
                <SpaceComponent height={10}/>

                <RowComponent>
                    <TouchableOpacity onPress={() => handleShowInvitation()}>
                        <AntDesign size={20} name={"pluscircleo"}/>
                    </TouchableOpacity>
                </RowComponent>

            </>}

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
