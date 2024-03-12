import {Platform, StyleProp, Text, TextStyle} from "react-native";
import {appColors} from "../constants/appColors.ts";
import {globalStyles} from "../screens/styles/globalStyles.ts";

interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    title?: boolean,
    styles?: StyleProp<TextStyle>
    numberOfLine?: number;

}

const TextComponent = (props: Props) => {
    const {
        text,
        title,
        color,
        size,
        flex,
        styles,
        numberOfLine,

    } = props
    const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

    return (
        <Text
            numberOfLines={numberOfLine}
            style={[
                globalStyles.text,
                {
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontSize: size ? size : title ? 24 : fontSizeDefault,
                },
                styles,
            ]}>
            {text}
        </Text>
    );
}


export default TextComponent
