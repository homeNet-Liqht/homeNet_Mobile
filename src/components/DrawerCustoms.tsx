import {FlatList, Image, StatusBar, TouchableOpacity, View} from "react-native";
import {RowComponent, TextComponent} from "./index.ts";
import {removeUser, userSelector} from "../redux/reducers/userReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {globalStyles} from "../screens/styles/globalStyles.ts";
import {appColors} from "../constants/appColors.ts";
import {appInfo} from "../constants/appInfo.ts";
import {Calendar, Logout, User} from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {LoginManager} from "react-native-fbsdk-next";
import {removeAuth} from "../redux/reducers/authReducer.ts";

const DrawerCustoms = ({navigation}: any) => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const size = 20;
    const color = appColors.gray
    const DrawMenu = [
        {
            key: "ProfileScreen",
            title: "My Profile",
            icon: <User size={size} color={color}/>
        },
        {
            key: "Calendar",
            title: "Calendar",
            icon: <Calendar size={size} color={color}/>
        },
        {
            key: "Logout",
            title: "Logout",
            icon: <Logout size={size} color={color}/>
        },
    ]

    const handleLogout = async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        await GoogleSignin.signOut();
        LoginManager.logOut();
        dispatch(removeAuth({}));
        dispatch(removeUser());
    }

    return (
        <View style={[globalStyles.container, {
            padding: 16,
            paddingTop: StatusBar.currentHeight
        }]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Home", {
                    screen: "ProfileScreen"
                })
            }}>
                <View>
                    {user.photo
                        ?
                        <Image style={{

                            width: appInfo.size.WIDTH * 0.2,
                            height: appInfo.size.WIDTH * 0.2,
                            backgroundColor: appColors.primary,
                            borderRadius: 100,
                        }} source={{uri: user.photo}}/>
                        :
                        <View style={{
                            width: appInfo.size.WIDTH * 0.2,
                            height: appInfo.size.WIDTH * 0.2,
                            backgroundColor: appColors.primary,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TextComponent
                                color={appColors.white}
                                size={appInfo.size.WIDTH * 0.05}
                                styles={{fontWeight: "bold"}}
                                text={user.name[0]}/>
                        </View>}
                    <TextComponent size={appInfo.size.WIDTH * 0.06} styles={{fontWeight: "bold",marginTop:5}} text={user.name}/>
                </View>
            </TouchableOpacity>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={DrawMenu}
                style={{flex: 1, marginVertical: 20}}
                renderItem={({item, index}) => (
                    <RowComponent
                        styles={{
                            paddingVertical: 12,
                            justifyContent: "flex-start",
                        }}
                        onPress={() => {
                            item.key == "Logout" ? handleLogout() : navigation.navigate(`${item.key}`)
                        }}
                    >
                        {item.icon}
                        <TextComponent styles={{
                            paddingLeft: 12
                        }} text={item.title}/>
                    </RowComponent>
                )}/>
        </View>
    )
}

export default DrawerCustoms
