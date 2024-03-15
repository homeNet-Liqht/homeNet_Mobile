import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColors } from "../../constants/appColors";
import { ScrollView, StyleSheet, Button } from "react-native";
import { appInfo } from "../../constants/appInfo";
import Task from "./component/Task";
import { taskApi } from "../../apis";
import { LoadingModal } from "../../modals";

interface TaskData {
  _id: string;
  title: string;
  status: string;
  assigner: {
    photo: string;
  };
}

export default function TaskScreen() {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await taskApi.getTasks(page);
      if (res.data.data.length === 0) {
        setNoMoreData(true);
      } else {
        setTaskData((prevData) => [...prevData, ...res.data.data]);
        setPage(page + 1); // Increment page directly
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
    }
  };

  const loadMoreTasks = () => {
    if (!isLoading && !noMoreData) {
      // Ensure loading is not in progress and there's more data to load
      fetchTasks();
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
            <Task
              key={task._id}
              title={task.title}
              status={task.status}
              photo={task.assigner.photo}
            />
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
        </ScrollView>
        {!noMoreData && (
          <ButtonComponent
            text={isLoading ? "Loading..." : "Load More"}
            onPress={loadMoreTasks}
            disable={isLoading}
            type="primary"
          />
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    maxHeight: appInfo.size.HEIGHT * 0.3,
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
});
