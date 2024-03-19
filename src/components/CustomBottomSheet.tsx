// @flow
import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {RowComponent, TextComponent} from "./index.ts";
import {forwardRef, ReactNode, useCallback, useMemo} from "react";
import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, useBottomSheetModal} from "@gorhom/bottom-sheet";
import {appColors} from "../constants/appColors.ts";
import {appInfo} from "../constants/appInfo.ts";

interface Props {
    titleBottomSheet: string,
    dataBottomSheet:  {
        key: string,
        title: string,
        icon: ReactNode
    }[],
    navigation: any
}

type Ref = BottomSheetModal


const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const initialSizeOfBottomSheet = (props.dataBottomSheet?.length === 2) ? "20%" : (props.dataBottomSheet?.length === 1) ? "15%" : "25%";

    const scalableSizeOfBottomSheet = (props.dataBottomSheet?.length > 3) ? "50%" : initialSizeOfBottomSheet

    const snapPoints = useMemo(() => [initialSizeOfBottomSheet, scalableSizeOfBottomSheet  ], [])

    const renderBackdrop = useCallback(
        (props: any) =>
            <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>
        , []
    )
    const { dismiss, dismissAll } = useBottomSheetModal();

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
        >
            {props.titleBottomSheet && <View style={style.containerHeaderLine}>
                <TextComponent styles={{fontWeight: "bold"}} size={16} text={props.titleBottomSheet}/>
            </View>}
            {
                props.dataBottomSheet && <BottomSheetFlatList data={props.dataBottomSheet} renderItem={({item, index}) => (
                    <RowComponent
                        styles={{
                            paddingLeft:15,
                            marginTop:8,
                            // backgroundColor: "yellow",
                            height: appInfo.size.HEIGHT * 0.05,
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        onPress={() => {
                            dismiss()
                            props.navigation.navigate(`${item.key}`)
                        }}
                    >
                        {item.icon}
                        <TextComponent styles={{
                            paddingLeft: 12
                        }} text={item.title}/>
                    </RowComponent>
                )}/>
            }
        </BottomSheetModal>
    );
})


const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center"
    },
    containerHeaderLine: {
        padding: 5,
        alignItems: "center",
        color: "#fff",
        borderBottomColor: appColors.gray,
        borderBottomWidth: 0.2
    }

})

export default CustomBottomSheet


