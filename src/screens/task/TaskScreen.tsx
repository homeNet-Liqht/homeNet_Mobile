import React, { useEffect, useState } from "react";
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColors } from "../../constants/appColors";
import { ScrollView, StyleSheet, Platform } from "react-native";
import { appInfo } from "../../constants/appInfo";
import Task from "./component/Task";
import { taskApi } from "../../apis";
import { LoadingModal } from "../../modals";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Add, ArrowCircleDown } from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, taskSelector } from "../../redux/reducers/taskReducer";
import Detail from "./component/Detail";
import { userSelector } from "../../redux/reducers/userReducer";

interface TaskData {
  _id: string;
  title: string;
  status: string;
  assigner: {
    _id: string;
    photo: string;
  };
}

const initDetailData = {
  _id: "",
  assignees: [{ _id: "", name: "", photo: "" }],
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

export default function TaskScreen({ navigation }: any) {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [detailData, setDetailData] = useState(initDetailData);
  const dispatch = useDispatch();
  const refreshTask = useSelector(taskSelector);
  const userData = useSelector(userSelector);

  const isAssigner = detailData.assigner._id == userData._id;

  useEffect(() => {
    fetchTasks(page);
  }, []);

  useEffect(() => {
    if (refreshTask.refresh) {
      setTaskData([]);
      setPage(0);
      fetchTasks(0); 
      dispatch(addTask());
    }
  }, [refreshTask.refresh]);

  const getTaskDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await taskApi.getSingleTask(id);
      console.log(res.data.data);
      setDetailData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  const fetchTasks = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const res = await taskApi.getTasks(pageNumber);
      if (res.data.data.length === 0) {
        setNoMoreData(true);
      } else {
        setTaskData((prevData) => [...prevData, ...res.data.data]);
        setPage(res.data.lastDataIndex);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const loadMoreTasks = () => {
    if (!isLoading && !noMoreData) {
      const nextPage = page + 1;
      fetchTasks(nextPage);
    }
  };

  return (
    <ContainerComponent>
      <SectionComponent>
        <TextComponent
          text="Task Status"
          size={22}
          styles={{ fontWeight: "bold" }}
        />
      </SectionComponent>
      <SectionComponent>
        <SectionComponent styles={styles.barBorder}>
          <RowComponent styles={styles.barWrapper}>
            <TextComponent
              text="Task"
              size={13}
              styles={{ fontWeight: "300" }}
              color={appColors.gray}
            />
            <RowComponent styles={styles.barItemWrapper}>
              <TextComponent
                text="Status"
                size={13}
                styles={{ fontWeight: "300" }}
                color={appColors.gray}
              />
              <SpaceComponent width={appInfo.size.WIDTH * 0.1} />
              <TextComponent
                text="Owner"
                size={13}
                styles={{ fontWeight: "300" }}
                color={appColors.gray}
              />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
        <ScrollView style={styles.scrollWrapper}>
          {taskData.map((task) => (
            <TouchableOpacity
              key={task._id}
              onPress={() => {
                getTaskDetail(task._id);
                setIsVisible(!isVisible);
              }}
            >
              <Task
                title={task.title}
                status={task.status}
                photo={task.assigner.photo}
              />
            </TouchableOpacity>
          ))}
          {noMoreData && (
            <SectionComponent>
              <RowComponent>
                <TextComponent
                  text="No more data to see"
                  size={11}
                  color={appColors.gray}
                />
              </RowComponent>
            </SectionComponent>
          )}
          {!noMoreData && (
            <RowComponent>
              <TouchableOpacity
                onPress={() => loadMoreTasks()}
                disabled={isLoading}
              >
                <ArrowCircleDown size={25} color={appColors.gray} />
              </TouchableOpacity>
            </RowComponent>
          )}
        </ScrollView>
      </SectionComponent>

      <SectionComponent styles={styles.plus}>
        <TouchableOpacity
          onPress={() => {
            dispatch(addTask());
            navigation.navigate("AddNewTask");
          }}
          style={styles.plusWrapper}
        >
          <Add size={25} color={appColors.white} />
        </TouchableOpacity>
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
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    maxHeight: appInfo.size.HEIGHT * 0.7,
  },
  barBorder: {
    borderTopWidth: 1,
    justifyContent: "center",
    height: appInfo.size.HEIGHT * 0.08,
    borderColor: appColors.gray,
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
