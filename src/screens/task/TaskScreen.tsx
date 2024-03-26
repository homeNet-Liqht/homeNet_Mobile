import React from "react";

import {
    ContainerComponent,
} from "../../components";

import {appColors} from "../../constants/appColors";
import {appInfo} from "../../constants/appInfo";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import RenderItem from "./component/RenderItem.tsx";

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

    const Today : TaskData[] = [
        {
            _id: "660234427b6ff89455d3bcdc",
            assigner: {
                _id: "6600e01d9479d68008ff71fe",
                photo: '',
                name: "Thang Nguyen"
            },
            title: "Today task title",
            description: "Today task description",
            startTime: "2024-03-26T06:30:00.000Z",
            endTime: "2024-03-26T08:34:00.000Z",
            status: "finished",
        },
    ]
    const Yesterday : TaskData[] = [
        {
            _id: "660234427b6ff89455d3bcdc",
            assigner: {
                _id: "6600e01d9479d68008ff71fe",
                photo: '',
                name: "Thang Nguyen"
            },
            title: "Yesterday task title",
            description: "Yesterday task description",
            startTime: "2024-03-26T06:30:00.000Z",
            endTime: "2024-03-26T08:34:00.000Z",
            status: "finished",
        },
        {
            _id: "660234427b6ff89455d3bcdc",
            assigner: {
                _id: "6600e01d9479d68008ff71fe",
                photo: '',
                name: "Thang Nguyen"
            },
            title: "Yesterday task title 1",
            description: "Yesterday task description 1",
            startTime: "2024-03-26T06:30:00.000Z",
            endTime: "2024-03-26T08:34:00.000Z",
            status: "finished",
        },
    ]
    const Tomorrow : TaskData[] = [
        {
            _id: "660234427b6ff89455d3bcdc",
            assigner: {
                _id: "6600e01d9479d68008ff71fe",
                photo: '',
                name: "Thang Nguyen"
            },
            title: "Tomorrow task title ",
            description: "Tomorrow task description 1",
            startTime: "2024-03-26T06:30:00.000Z",
            endTime: "2024-03-26T08:34:00.000Z",
            status: "finished",
        },  {
            _id: "66023df8a479125df9f27372",
            assigner: {
                _id: "65e96dd38679eff77eb806ab",
                name: "Thang Tran",
                photo: "https://lh3.googleusercontent.com/a/ACg8ocLNTz1HlQqq6jayNR8r2-IF9KWwykLj6G5c4BHumrfhV2k=s96-c"
            },
            title: "Tomorrow task title 2",
            description: "Tomorrow task description 2",
            startTime: "2024-03-26T04:39:00.000Z",
            endTime: "2024-03-26T06:39:00.000Z",
            status: "accepting",

        },
    ]



    const renderScene = SceneMap({
        Yesterday:() => RenderItem(Yesterday),
        Today:() => RenderItem(Today),
        Tomorrow:() => RenderItem(Tomorrow),
    });


    const [routes] = React.useState([
        {key: 'Yesterday', title: 'Yesterday'},
        {key: 'Today', title: 'Today'},
        {key: 'Tomorrow', title: 'Tomorrow'},
    ]);

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


        </ContainerComponent>
    );
}


