import React from 'react';
import {View} from "react-native";

interface Props  {
    width?: number,
    height: number
}

export function SpaceComponent(props: Props) {

    const {width, height} = props
    return (
      <View style={{width,height}}>

      </View>
    );
};
