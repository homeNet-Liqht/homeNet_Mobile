import {ReactNode} from "react";
import * as process from "process";
import {StyleProp, TouchableOpacity, View, ViewStyle} from "react-native";
import {appColors} from "../constants/appColors.ts";

interface Props {
    size: number,
    children?: ReactNode,
    color?: string,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
}

const CircleComponent = (props: Props) => {
    const {size, children, color, onPress} = props
    return onPress ? <>
        <TouchableOpacity onPress={onPress} style={{
            width: size ?? 40,
            height: size ?? 40,
            backgroundColor: color ?? appColors.gray,
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 100
        }}>
            {children}
        </TouchableOpacity>
    </>:
        <>
            <View style={{
                width: size ?? 40,
                height: size ?? 40,
                backgroundColor: color ?? appColors.gray,
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 100
            }} >{children}</View>
        </>
}

export default CircleComponent
