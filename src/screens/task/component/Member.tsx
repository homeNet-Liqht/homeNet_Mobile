import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { RowComponent, TextComponent } from "../../../components";
import { appColors } from "../../../constants/appColors";
import { appInfo } from "../../../constants/appInfo";
import { TouchableOpacity } from "react-native-gesture-handler";

interface MemberProps {
  _id: string;
  name: string;
  photo: string;
  onPress: (id: string) => void;
}

const Member: React.FC<MemberProps> = ({ _id, name, photo, onPress }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    onPress(_id);
    setIsClicked(!isClicked);
  };

  // Define dynamic styles outside of StyleSheet.create
  const memberWrapperStyle = {
    backgroundColor: isClicked ? appColors.primary : appColors.gray,
  };

  const initialsContainerStyle = {
    backgroundColor: isClicked ? appColors.white : appColors.primary,
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <RowComponent styles={[styles.memberWrapper, memberWrapperStyle]}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <View style={[styles.initialsContainer, initialsContainerStyle]}>
            <TextComponent
              color={isClicked ? appColors.gray : appColors.white}
              size={appInfo.size.WIDTH * 0.05}
              styles={{ fontWeight: "bold" }}
              text={name[0]}
            />
          </View>
        )}
        <TextComponent text={name} color={appColors.white} />
      </RowComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  memberWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: appInfo.size.HEIGHT * 0.06,
    borderRadius: 35,
    alignItems: "center",
  },
  initialsContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default Member;
