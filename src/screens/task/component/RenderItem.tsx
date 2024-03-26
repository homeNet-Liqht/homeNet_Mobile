import {View} from "react-native";
import {ContainerComponent, RowComponent, SectionComponent, TextComponent} from "../../../components";
import {useState} from "react";
import { useSelector} from "react-redux";
import {userSelector} from "../../../redux/reducers/userReducer.ts";
import {taskApi} from "../../../apis";
import {appInfo} from "../../../constants/appInfo.ts";
import {appColors} from "../../../constants/appColors.ts";
import Entypo from "react-native-vector-icons/Entypo";
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
           <SectionComponent >

           {
               Data.map((item: any, index: any)=>(
                   <>
                       <View key={index} style={{
                           width: appInfo.size.WIDTH * 0.9,
                           height: appInfo.size.HEIGHT * 0.1,
                           backgroundColor: appColors.primary,
                           marginBottom: 15,
                           borderRadius: 20,
                           padding:10
                       }}>
                           <RowComponent>
                               <View style={{

                               }}>
                                   <Entypo size={appInfo.size.HEIGHT * 0.07} name={"calendar"}/>
                               </View>
                               <TextComponent color={appColors.white} text={item.description}/>

                           </RowComponent>
                       </View>
                   </>
               ))
           }
           </SectionComponent>
       </ContainerComponent>

    )
}

export default RenderItem
