import React, { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Button } from "react-native";
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  ButtonComponent,
  InputComponent,
} from "../../components";
import { appInfo } from "../../constants/appInfo";
import { StyleSheet } from "react-native";
import { appColors } from "../../constants/appColors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import UpdatePicture from "./components/UpdatePicture";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  editUser,
  removeUser,
  userSelector,
} from "../../redux/reducers/userReducer";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { userApi } from "../../apis";
import { formatBirthday } from "../../utils/formatBirthday";
import DatePicker from "react-native-date-picker";
import { LoadingModal } from "../../modals";
import capitalizedText from "../../utils/capitalizedText";
import { removeAuth } from "../../redux/reducers/authReducer.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";
export default function ProfileScreen({ navigation }: any) {
  const user = useSelector(userSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    name: user,
    birthday: new Date(),
  });
  const handleInfoChange = (key: string, value: string | Date) => {
    const data: any = { ...inputValues };
    data[`${key}`] = value;
    setInputValues(data);
  };

  const handleEditInfo = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.editUser(
        user._id,
        inputValues.name,
        inputValues.birthday
      );

      setIsLoading(false);
      dispatch(editUser(response.data.data));
    } catch (error) {
      setIsLoading(false);
      if (error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Edit Failed",
          textBody: `${error.data.data}`,
          button: "Close",
        });
      }
    }
  };

  return (
    <ContainerComponent back isScroll color={"#fff"}>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}
