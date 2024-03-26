import React, {useEffect, useState} from "react";

import {
    ContainerComponent, SectionComponent,
} from "../../components";

import {appColors} from "../../constants/appColors";
import {appInfo} from "../../constants/appInfo";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import RenderItem from "./component/RenderItem.tsx";
import {Platform, StyleSheet, TouchableOpacity} from "react-native";
import {Add} from "iconsax-react-native";
import {taskApi} from "../../apis";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reducers/userReducer.ts";

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

export default function TaskScreen({navigation}: any) {
    const [index, setIndex] = React.useState(1);
    const [todayTask,setTodayTask,] = useState<TaskData[]>([])
    const [pastTask,setPastTask,] = useState<TaskData[]>([])
    const [futureTask,setFutureTask,] = useState<TaskData[]>([])



    const userData = useSelector(userSelector);


    useEffect(() => {
        handleFetchTodayTask()
        handleFetchYesterdayTask()
        handleFetchTomorrowTask()
    }, []);

    const handleFetchTodayTask = async () => {
        try {
            const res = await taskApi.getTaskById( userData._id, "present")
            setTodayTask(res.data.data)
        }catch (e) {
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
            const res = await taskApi.getTaskById( userData._id, "future")
            setFutureTask(res.data.data)

        }catch (e) {
            console.log(e)
        }
    }






    const [routes] = React.useState([
        {key: 'Yesterday', title: 'Yesterday'},
        {key: 'Today', title: 'Today'},
        {key: 'Tomorrow', title: 'Tomorrow'},
    ]);

    const renderScene = SceneMap({
        Yesterday:() => RenderItem(pastTask),
        Today:() => RenderItem(todayTask),
        Tomorrow:() => RenderItem(futureTask),
    });


    const renderTabBar = (props:any) => (
        <TabBar
            {...props}
            activeColor={appColors.primary}
            indicatorStyle={{ backgroundColor: appColors.primary }}
            labelStyle={{
                color: "black",
                textTransform: "none"
        }}
            style={{ backgroundColor: "white" }}
        />
    );

    return (
        <ContainerComponent title={"Task Status"}>

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
                    <Add size={25} color={appColors.white} />
                </TouchableOpacity>
            </SectionComponent>



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
