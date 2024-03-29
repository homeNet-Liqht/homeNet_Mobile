import React, {useEffect, useState} from "react";

import {
    ButtonComponent,
    ContainerComponent, RowComponent, SectionComponent, TextComponent,
} from "../../components";

import {appColors} from "../../constants/appColors";
import {appInfo} from "../../constants/appInfo";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import RenderItem from "./component/RenderItem.tsx";
import {Image, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Add, Data} from "iconsax-react-native";
import {familyApi, taskApi} from "../../apis";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reducers/userReducer.ts";
import {LoadingModal} from "../../modals";

interface TaskData {
    _id: string;
    title: string;
    status: string;
    description: string,
    startTime: string,
    endTime: string,
    assigner: {
        _id: string;
        photo: string;
        name: string;
    };

}

export default function TaskScreen({route, navigation}: any) {
    const [isLoading, setIsLoading] = useState(false);

    const item = route.params?.item

    const [index, setIndex] = React.useState(1);
    const [todayTask, setTodayTask,] = useState<TaskData[]>([])
    const [pastTask, setPastTask,] = useState<TaskData[]>([])
    const [futureTask, setFutureTask,] = useState<TaskData[]>([])
    const [members, setMembers] = useState<any[]>([]);
    const [userData, setUserData] = useState(useSelector(userSelector))
    const [isChange, setIsChange] = useState(false)

    const [family, setFamily] = useState<any>();

    useEffect(() => {
        GetFamily()
    }, []);
    const GetFamily = async () => {
        try {
            setIsLoading(true);
            const res = await familyApi.getFamily();
            res ? setFamily(res.data.data) : setFamily(null);

            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };


    const fetchMember = async () => {
        try {
            const res = await familyApi.getFamily();
            setMembers(res.data.data.members);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        handleFetchTodayTask()
        handleFetchYesterdayTask()
        handleFetchTomorrowTask()
        fetchMember()

    }, [item, userData,isChange]);

    const handleFetchTodayTask = async () => {
        setIsLoading(true);
        try {
            const res = await taskApi.getTaskById(userData._id, "present")

            setTodayTask(res.data.data)

            setIsLoading(false);

        } catch (e) {
            console.log(e)
        }
    }

    const handleSetIsChange = () => {
        setIsChange(!isChange)
    }

    const handleFetchYesterdayTask = async () => {
        try {
            const res = await taskApi.getTaskById(userData._id, "past")
            setPastTask(res.data.data)

        } catch (e) {
            console.log(e)
        }
    }

    const handleFetchTomorrowTask = async () => {
        try {
            const res = await taskApi.getTaskById(userData._id, "future")
            setFutureTask(res.data.data)

        } catch (e) {
            console.log(e)
        }
    }

    const [routes] = React.useState([
        {key: 'Past', title: 'Past'},
        {key: 'Today', title: 'Today'},
    ]);

    const renderScene = SceneMap({
        Past: () => RenderItem(pastTask, () => handleSetIsChange()),
        Today: () => RenderItem(todayTask,() =>  handleSetIsChange()),
    });


    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            activeColor={appColors.primary}
            indicatorStyle={{backgroundColor: appColors.primary}}
            labelStyle={{
                color: "black",
                textTransform: "none"
            }}
            style={{backgroundColor: "white"}}
        />
    );
    return (
        family ?
            <ContainerComponent title={"Task Status"}>

                <RowComponent styles={{
                    width: appInfo.size.WIDTH * 0.99,

                }} justify={"space-around"}>
                    <RowComponent styles={{flex:1}}>
                        <TextComponent text={userData.name} styles={{fontWeight: "bold"}}  size={16} color={appColors.red}/>
                    </RowComponent>
                    <RowComponent styles={{flex:1}}>
                        {
                            members.map((item: any, index: any) => (

                                <TouchableOpacity key={index} onPress={() => {
                                    setUserData(item)
                                }}>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: userData._id == item._id ? appColors.red : appColors.gray1,
                                        borderRadius: 100,
                                        marginLeft: 1,
                                        justifyContent: 'center',
                                        alignItems: "center",

                                    }}>
                                        {
                                            item.photo
                                                ?
                                                <Image style={{
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 100
                                                }} source={{uri: item.photo}}/>
                                                :
                                                <View>
                                                    <TextComponent text={item.name[0]}/>
                                                </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </RowComponent>
                </RowComponent>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: appInfo.size.WIDTH}}
                />

                <SectionComponent styles={styles.plus}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AddNewTask");
                        }}
                        style={styles.plusWrapper}
                    >
                        <Add size={25} color={appColors.white}/>

                    </TouchableOpacity>
                </SectionComponent>
                <LoadingModal visible={isLoading}/>

            </ContainerComponent>:
            <>
                <SectionComponent
                    styles={{
                        height: appInfo.size.HEIGHT,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <RowComponent
                        styles={{
                            width: appInfo.size.WIDTH * 0.9,
                            backgroundColor: appColors.primary,
                            borderRadius: 20,
                            padding: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <SectionComponent
                            styles={{
                                flex: 1,
                                height: appInfo.size.HEIGHT * 0.15,
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextComponent
                                size={14}
                                color={appColors.white}
                                styles={{ fontWeight: "bold" }}
                                text={"Create Family now!!"}
                            />
                            <ButtonComponent
                                styles={{
                                    borderRadius: 30,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5,
                                    minHeight: 10,
                                    marginBottom: 0,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: appColors.red,
                                }}
                                text={"Create"}
                                onPress={() => {
                                    navigation.navigate("CreateFamilyScreen");
                                }}
                                type={"primary"}
                                textStyles={{ fontWeight: "bold" }}
                                textColor={appColors.white}
                                color={appColors.white}
                            />
                            <ButtonComponent
                                styles={{
                                    borderRadius: 30,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5,
                                    minHeight: 10,
                                    marginBottom: 0,
                                    backgroundColor: appColors.orange,
                                }}
                                text={"Join"}
                                onPress={() => {
                                    navigation.navigate("JoinFamilyScreen");
                                }}
                                textStyles={{ fontWeight: "bold" }}
                                type={"primary"}
                                textColor={appColors.white}
                                color={appColors.white}
                            />
                        </SectionComponent>
                        <SectionComponent styles={{ flex: 1 }}>
                            <Image
                                source={require("../../assets/imgs/family-draw.png")}
                                style={{
                                    width: appInfo.size.WIDTH * 0.4,
                                    resizeMode: "stretch",
                                    height: appInfo.size.HEIGHT * 0.133,
                                }}
                            />
                        </SectionComponent>
                    </RowComponent>
                </SectionComponent>
            </>
    );
}


const styles = StyleSheet.create({
    plus: {
        position: "absolute",
        bottom: appInfo.size.HEIGHT * 0.005,
        right: appInfo.size.WIDTH * 0.01,
    },
    plusWrapper: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: appColors.primary,
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
            android: {
                elevation: 1.5,
            },
        }),
    },
});
