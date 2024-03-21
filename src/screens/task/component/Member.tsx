import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { RowComponent, TextComponent } from "../../../components";
import { appColors } from "../../../constants/appColors";
import { appInfo } from "../../../constants/appInfo";

interface MemberProps {
  _id: string;
  name: string;
  photo: string;
  isPick?: boolean;
  onPress: (id: string) => void;
}

const Member: React.FC<MemberProps> = ({
  _id,
  name,
  photo,
  onPress,
  isPick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isPick) {
      setIsClicked(true);
    }
  }, [isPick]);

  const handlePress = () => {
    onPress(_id);
    setIsClicked(!isClicked);
  };

  const memberWrapperStyle = {
    backgroundColor: isPick || isClicked ? appColors.primary : appColors.gray,
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
              size={appInfo.size.WIDTH * 0.03}
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
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  memberWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: appInfo.size.HEIGHT * 0.05,
    borderRadius: 35,
    alignItems: "center",
  },
  initialsContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default Member;
