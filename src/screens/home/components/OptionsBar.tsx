import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { RowComponent, TextComponent } from '../../../components'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { appColors } from '../../../constants/appColors'

export default function OptionsBar() {
  return (
    <RowComponent
      styles={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity>
        <EvilIcons name={'navicon'} size={30} />
      </TouchableOpacity>
      <RowComponent>
        <TouchableOpacity>
          <EvilIcons name={'plus'} size={35} />
        </TouchableOpacity>
        <TouchableOpacity>
          <EvilIcons name={'bell'} size={35} style={styles.bell} />
          <View style={styles.noti}>
            <TextComponent
              text="0"
              color={appColors.white}
              size={12}
            ></TextComponent>
          </View>
        </TouchableOpacity>
      </RowComponent>
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  noti: {
    position: 'absolute',
    right: -2,
    top: -5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: appColors.primary,
  },
  bell: {
    transform: [
      {
        rotateZ: '20deg',
      },
    ],
  },
})
