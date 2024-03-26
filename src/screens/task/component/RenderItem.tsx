import {View} from "react-native";
import {ContainerComponent, TextComponent} from "../../../components";
import {useState} from "react";
import { useSelector} from "react-redux";
import {userSelector} from "../../../redux/reducers/userReducer.ts";
import {taskApi} from "../../../apis";
import {appInfo} from "../../../constants/appInfo.ts";
import {appColors} from "../../../constants/appColors.ts";

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

const RenderItem = (Data: TaskData[]) => {

    const [taskData, setTaskData] = useState<TaskData[]>(Data);
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
            console.log("hhhuuuuu", res.data.data)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };


    const handleCloseModal = () => {
        setIsVisible(false);
    };


    return(
       <ContainerComponent>
           {
               Data.map((item: any, index: any)=>(
                   <>
                       <View style={{
                           width: appInfo.size.WIDTH,
                           height: appInfo.size.HEIGHT * 0.3,
                           backgroundColor: appColors.primary
                       }}>
                           <TextComponent text={item.description}/>
                       </View>
                   </>
               ))
           }
       </ContainerComponent>
    )
}

export default RenderItem
