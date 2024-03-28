import React, {useEffect, useState} from "react";

import {
    ContainerComponent, RowComponent, SectionComponent, TextComponent,
} from "../../components";

import {appColors} from "../../constants/appColors";
import {appInfo} from "../../constants/appInfo";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import RenderItem from "./component/RenderItem.tsx";
import {Image, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Add} from "iconsax-react-native";
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

    }, [item, userData]);

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
        {key: 'Yesterday', title: 'Yesterday'},
        {key: 'Today', title: 'Today'},
        {key: 'Tomorrow', title: 'Tomorrow'},
    ]);

    const renderScene = SceneMap({
        Yesterday: () => RenderItem(pastTask),
        Today: () => RenderItem(todayTask),
        Tomorrow: () => RenderItem(futureTask),
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

        </ContainerComponent>
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
