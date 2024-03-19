import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React, {ReactNode, useCallback, useRef,} from 'react';

import {useNavigation} from '@react-navigation/native';
import {RowComponent, TextComponent} from '.';
import {ArrowLeft, Edit} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from "../constants/appInfo.ts";
import CustomBottomSheet from "./CustomBottomSheet.tsx";
import BottomSheet, {BottomSheetModal, useBottomSheetModal} from "@gorhom/bottom-sheet";

interface Props {
    backgroundNumber?: 1 | 2;
    isImageBackground?: boolean;
    isScroll?: boolean;
    title?: string;
    children: ReactNode;
    back?: boolean;
    color?: string;

    moreAction?: {
        moreActionIcon: ReactNode,
        dataBottomSheet: {
            key: string,
            title: string,
            icon: ReactNode
        }[],
        titleBottomSheet: string
    },
    confirmAction?: {
        icon: ReactNode,
        action: () => void
    }


}

const ContainerComponent = (props: Props) => {
    const {
        children,
        isScroll,
        isImageBackground,
        title,
        back,
        color,
        backgroundNumber,
        moreAction,
        confirmAction
    } = props;

    const navigation: any = useNavigation();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);


    const headerComponent = () => {
        return (
            <View style={{flex: 1, paddingTop: appInfo.size.HEIGHT * 0.025}}>
                {(title || back) && (
                    <RowComponent
                        styles={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            minWidth: 48,
                            minHeight: 48,
                            justifyContent: 'flex-start',
                        }}>
                        {back && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{marginRight: 12}}>
                                <ArrowLeft size={24} color={appColors.text}/>
                            </TouchableOpacity>
                        )}
                        {title ? <TextComponent text={title} size={16} flex={1}/> : <></>}
                        {moreAction ?
                            <TouchableOpacity onPress={handlePresentModalPress}>
                                {moreAction.moreActionIcon}
                            </TouchableOpacity>
                            : <>
                                {
                                    confirmAction ?
                                        <TouchableOpacity onPress={confirmAction.action}>
                                            {confirmAction.icon}
                                        </TouchableOpacity>
                                        :
                                        <></>
                                }
                            </>
                        }
                    </RowComponent>
                )}
                {returnContainer}
            </View>
        );
    };

    const containerStyle = {
        flex: 1,
        backgroundColor: color ? color : 'white',
    };
    const returnContainer = isScroll ? (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={{flex: 1}}>{children}</View>
    );

    return isImageBackground ? (
        <ImageBackground
            source={
                backgroundNumber == 2
                    ? require('../assets/imgs/blank-img.png')
                    : require('../assets/imgs/splash.png')
            }
            style={{flex: 1}}
            imageStyle={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
            {moreAction && <CustomBottomSheet titleBottomSheet={moreAction.titleBottomSheet} navigation={navigation}
                                              ref={bottomSheetModalRef} dataBottomSheet={moreAction.dataBottomSheet}/>}


        </ImageBackground>
    ) : (
        <SafeAreaView style={containerStyle}>
            <View style={{flex: 1}}>{headerComponent()}</View>
            {moreAction && <CustomBottomSheet titleBottomSheet={moreAction.titleBottomSheet} navigation={navigation}
                                              ref={bottomSheetModalRef} dataBottomSheet={moreAction.dataBottomSheet}/>}
        </SafeAreaView>
    );
};

export default ContainerComponent;
