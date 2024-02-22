import {StyleSheet} from "react-native";
import {appColors} from "../../constants/appColors.ts";

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: appColors.white
    },
    text: {
        fontSize: 14,
        color: appColors.text,
    },
    button:{
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appColors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
    }
})
