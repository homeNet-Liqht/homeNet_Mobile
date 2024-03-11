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
    name: user ,
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
        inputValues.birthday,
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
    <ContainerComponent back isScroll color={"#A3A4E5"}>
      <View style={{ backgroundColor: "#A3A4E5" }}>
        <ImageBackground
          source={
            user.photo
              ? { uri: user.photo }
              : require("../../assets/imgs/profile.png")
          }
          style={styles.image}
          imageStyle={{
            resizeMode: "contain",
          }}
        >
          {editImage && <UpdatePicture />}
          <SectionComponent>
            <SpaceComponent height={15}></SpaceComponent>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => setEditImage(!editImage)}
            >
              <EvilIcons
                name={editImage ? "close" : "pencil"}
                size={25}
                color={appColors.gray}
              />
            </TouchableOpacity>
          </SectionComponent>
        </ImageBackground>
        <RowComponent>
          <SectionComponent
            styles={{
              width: appInfo.size.WIDTH * 0.95,
              padding: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: "#fff",
            }}
          >
            <RowComponent styles={{ marginHorizontal: 8 }}>
              <View
                style={{
                  marginRight: 12,
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                {editInfo ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <InputComponent
                      value={inputValues.name}
                      onChange={(value) =>
                        handleInfoChange("name", capitalizedText(value))
                      }
                      isPassword={false}
                      styles={{ width: "70%", height: 40, minHeight: 40 }}
                    />
                    <View>
                      <ButtonComponent
                        text="Pick a new Date"
                        onPress={() => setIsOpen(!isOpen)}
                        type="primary"
                        styles={{
                          minHeight: 50,
                          height: 50,
                        }}
                      />
                      <DatePicker
                        mode="date"
                        modal
                        date={new Date(user.birthday)}
                        onConfirm={(date) => {
                          handleInfoChange("birthday", date);

                          setIsOpen(false);
                        }}
                        open={isOpen}
                        onCancel={() => {
                          setIsOpen(false);
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{ marginLeft: "9%" }}>
                    <TextComponent
                      text={user.name}
                      size={21}
                      styles={{
                        fontWeight: "700",
                      }}
                    />
                    <TextComponent
                      text={formatBirthday(user.birthday)}
                      size={12}
                    />
                  </View>
                )}
                <RowComponent styles={{ width: "85%", overflow: "hidden" }}>
                  <TextComponent
                    text={user.email}
                    size={14}
                    color="#ccc"
                    numberOfLine={1}
                  />
                </RowComponent>
              </View>
              {editInfo ? (
                <ButtonComponent
                  text={"Save"}
                  type="primary"
                  styles={{
                    width: "70%",
                    minHeight: 20,
                    borderRadius: 25,
                    padding: 10,
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    handleEditInfo();
                    setEditInfo(!editInfo);
                  }}
                />
              ) : (
                <ButtonComponent
                  text={"Edit"}
                  type="primary"
                  styles={{
                    width: "70%",
                    minHeight: 20,
                    borderRadius: 25,
                    padding: 10,
                    marginLeft: 10,
                  }}
                  onPress={() => setEditInfo(!editInfo)}
                />
              )}
            </RowComponent>
            <SpaceComponent height={24} />
            <SectionComponent>
              <ButtonComponent
                text="Create your own family group"
                type="primary"
                styles={{ width: "100%", borderRadius: 25 }}
                onPress={() => navigation.navigate("CreateFamilyScreen")}
              />
              <ButtonComponent
                text="Join in a family group with a link"
                type="primary"
                onPress={() => navigation.navigate("JoinFamily")}
                textColor={appColors.primary}
                styles={{
                  width: "100%",
                  borderRadius: 25,
                  backgroundColor: "#fff",
                  borderWidth: 1.5,
                  borderColor: appColors.primary,
                }}
              />
              <ButtonComponent
                text="Log out"
                type="primary"
                textColor="#ECB22F"
                onPress={async () => {
                  await AsyncStorage.removeItem("accessToken");
                  await GoogleSignin.signOut();
                  LoginManager.logOut();
                  dispatch(removeAuth({}));
                }}
                styles={{
                  width: "100%",
                  borderRadius: 25,
                  backgroundColor: "#fff",
                  borderWidth: 1.5,
                  borderColor: "#ECB22F",
                }}
              />
            </SectionComponent>
          </SectionComponent>
        </RowComponent>
      </View>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}
const styles = StyleSheet.create({
  image: {
    width: appInfo.size.WIDTH,
    height: (appInfo.size.HEIGHT * 1.5) / 3,
    justifyContent: "flex-end",
    flexDirection: "row",
    objectFit: "cover",
    paddingTop: 10,
    borderRadius: 25,
  },
  edit: {
    position: "absolute",
    borderRadius: 50,
    right: 12,
    top: 0,
    padding: 12,
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
