import {StyleProp, Text, TextStyle} from "react-native";
import {appColors} from "../constants/appColors.ts";

interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    title?: boolean,
    styles?: StyleProp<TextStyle>
}

const TextComponent = (props: Props) => {
    const {text,title,color, size, flex, font, styles} = props

    return(
        <Text style={[{
            color: color ?? appColors.text,
            flex: flex ?? 0,
            fontSize: size ?? title ? 24: 14,
        }, styles ]}>{text}</Text>
    )
}


export default TextComponent
