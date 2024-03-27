import {TouchableOpacity, View} from "react-native";
import {ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../../components";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../redux/reducers/userReducer.ts";
import {taskApi} from "../../../apis";
import {appInfo} from "../../../constants/appInfo.ts";
import {appColors} from "../../../constants/appColors.ts";
import Entypo from "react-native-vector-icons/Entypo";
import Detail from "./Detail.tsx";
import {LoadingModal} from "../../../modals";
import {err} from "react-native-svg";

const initDetailData = {
    _id: "",
    assignees: [{_id: "", name: "", photo: ""}],
    assigner: {
        _id: "",
        name: "",
        photo: "",
    },
    task: {
        _id: "",
        startTime: "",
        endTime: "",
        description: "",
        photo: [],
        location: [],
        status: "",
        title: "",
    },
};

interface TaskData {
    _id: string;
    title: string;
    status: string;
    assigner: {
        _id: string;
        photo: string;
        name: string;
    };
}

const RenderItem = (Data: TaskData[] ) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [detailData, setDetailData] = useState(initDetailData);
    const userData = useSelector(userSelector);
    const isAssigner = detailData.assigner._id == userData._id;


    const getTaskDetail = async (id: string) => {
        setIsLoading(true);
        try {
            const res = await taskApi.getSingleTask(id);
            setDetailData(res.data.data);
            setIsVisible(true)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    };


    const handleCloseModal = () => {
        setIsVisible(false);
    };


    return (
        <ContainerComponent isScroll>
            <SectionComponent>

                {
                    Data.map((item: any, index: any) => (
                        <TouchableOpacity  key={index} onPress={() => {
                            getTaskDetail(item._id)
                        }}>
                            <View style={{
                                width: appInfo.size.WIDTH * 0.9,
                                height: appInfo.size.HEIGHT * 0.1,
                                backgroundColor: appColors.primary,
                                marginBottom: 15,
                                borderRadius: 10,
                                padding: 10
                            }}>
                                <RowComponent justify={"flex-start"}>
                                    <View style={{
                                        height: appInfo.size.HEIGHT * 0.07,
                                        width: appInfo.size.HEIGHT * 0.07,
                                        backgroundColor: appColors.gray1,
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Entypo size={appInfo.size.HEIGHT * 0.03} color={appColors.white}
                                                name={"calendar"}/>
                                    </View>

                                    <View style={{
                                        marginLeft: appInfo.size.WIDTH * 0.01,
                                        justifyContent: "space-between",
                                        flexDirection: "column",
                                        height: appInfo.size.HEIGHT * 0.065,
                                    }}>
                                        <TextComponent styles={{fontWeight: "bold"}} color={appColors.white}
                                                       text={item.title}/>
                                        <RowComponent styles={{
                                            alignItems: "center"
                                        }} justify={"flex-start"}>
                                            <Entypo size={15} color={appColors.white} name={"clock"}/>
                                            <TextComponent
                                                styles={{
                                                    marginLeft: appInfo.size.WIDTH * 0.01,
                                                }}
                                                color={appColors.white}
                                                text={`${new Date(new Date(item.startTime)
                                                    .getTime() + (7 * 60 * 60 * 1000))
                                                    .toISOString().split('T')[1]
                                                    .split('.')[0]} - ${new Date(new Date(item.endTime)
                                                    .getTime() + (7 * 60 * 60 * 1000))
                                                    .toISOString().split('T')[1]
                                                    .split('.')[0]}`}/>
                                        </RowComponent>
                                    </View>
                                </RowComponent>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </SectionComponent>

            <Detail
                visible={isVisible}
                id={detailData.task._id}
                status={detailData.task.status}
                ownerName={detailData.assigner.name}
                ownerPhoto={detailData.assigner.photo}
                title={detailData.task.title}
                description={detailData.task.description}
                startTime={detailData.task.startTime}
                endTime={detailData.task.endTime}
                assignees={detailData.assignees}
                taskPhoto={detailData.task.photo}
                onClose={() => handleCloseModal()}
                isAssigner={isAssigner}
            />
            <LoadingModal visible={isLoading}/>

        </ContainerComponent>

    )
}

export default RenderItem
