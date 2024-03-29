import React, {useEffect, useState} from "react";
import {SectionComponent} from "../../../components";
import {StyleSheet} from "react-native";
import {appColors} from "../../../constants/appColors";
import Modal from "react-native-modal";
import {ScrollView} from "react-native-gesture-handler";
import Member from "./Member";
import {familyApi, taskApi} from "../../../apis";
import TitlePart from "./parts/titlePart";
import {isOwner} from "./parts/buttonStatus";
import Description from "./parts/descriptionPart";
import TimePart from "./parts/timePart";
import AssigneesPart from "./parts/assigneesPart";
import ImagesPart from "./parts/imagePart";
import {
  requestExternalReadPermission,
  requestExternalWritePermission,
} from "../../../utils/requestDevices";
import {selectFiles} from "../../../utils/photoLibraryAction";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../redux/reducers/userReducer";
import {LoadingModal} from "../../../modals";
import {refreshTask} from "../../../redux/reducers/taskReducer";
interface Member {
  _id: string;
  name: string;
  photo: string;
}

interface Props {
  id: string;
  ownerPhoto: string;
  ownerName: string;
  ownerId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  assignees: Member[];
  taskPhoto: string[];
  status: string;
}

export default function Detail(
    {
      id,
      ownerId,
      ownerPhoto,
      ownerName,
      title,
      description,
      startTime,
      endTime,
      assignees,
      taskPhoto,
      status,
      visible,
      onClose,
      isAssigner,
      setIsChange
    }: any) {
  const handleClose = () => {
    onClose();
  };
  const user = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [taskDetail, setTaskDetail] = useState<Props>({
    id: "",
    ownerId: "",
    ownerPhoto: "",
    ownerName: "",
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    assignees: [],
    taskPhoto: [],
    status: "",
  });
  const dispatch = useDispatch();

  const fetchMember = async () => {
    try {
      const res = await familyApi.getFamily();
      setMembers(res.data.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setTaskDetail({
        id,
        ownerId,
        ownerPhoto,
        ownerName,
        title,
        description,
        startTime,
        endTime,
        assignees,
        taskPhoto,
        status,
      });
      fetchMember();
    }
  }, [isEdit]);

  const acceptRequest = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await taskApi.acceptRequest(id);
      if (res.data.code === 200) {


        await taskApi.send(ownerId, "task");
        setIsEdit(false);

        dispatch(refreshTask());

        onClose();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEditTask = async () => {
    try {
      if (taskDetail) {
        setIsLoading(true);
        const assigneesId = taskDetail.assignees.map(
            (assignee) => assignee._id
        );

        if (taskDetail.assignees.length < 1) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Assignees were missing",
            textBody: "You need to choose at least one person to do this task",
            button: "Got it!",
          });
          setIsLoading(false);
          return;
        }
        if (new Date(taskDetail.startTime) < new Date()) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Time Error",
            textBody: "You cannot pick the time from the past",
            button: "Got it!",
          });
          setIsLoading(false);
          return;
        }
        try {
          const res = await taskApi.updateTask(
              assigneesId,
              taskDetail.title,
              taskDetail.startTime,
              taskDetail.endTime,
              taskDetail.description,
              taskDetail.taskPhoto,
              user._id,
              id
          );
          if (res.data.code === 200) {
            const assignees = taskDetail.assignees.map(
                (assignee) => assignee._id
            );

            await taskApi.send(assignees, "update");
            setIsLoading(false);
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Updated Task",
              textBody: res.data.data,
              button: "Close",
              onHide: () => {
                setIsEdit(false);
                setIsChange()
                onClose();

              },
            });
          } else {
            setIsLoading(false);
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: "Fail",
              textBody: res.data.data,
              button: "Close",
            });
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentSelection = async () => {
    const isReadStoragePermit = await requestExternalReadPermission();
    const isWriteStoragePermit = await requestExternalWritePermission();
    if (isReadStoragePermit && isWriteStoragePermit) {
      const response = await selectFiles();
      if (!response) return null;
      try {
        const formData = new FormData();
        response.map((file) => formData.append("image", file));
        console.log(formData.getParts());

        const res = await taskApi.uploadEditImage(formData);

        const fileResponse = res.data.data;
        console.log(fileResponse);

        setTaskDetail((prevTask) => ({
          ...prevTask,
          taskPhoto: [...prevTask.taskPhoto, ...fileResponse],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removePicture = (indexToRemove: number) => {
    setTaskDetail((prevTask) => {
      const updatedTaskPhoto = [...prevTask.taskPhoto];
      updatedTaskPhoto.splice(indexToRemove, 1);
      return {...prevTask, taskPhoto: updatedTaskPhoto};
    });
  };

  const handleMemberPress = (id: string) => {
    setTaskDetail((prevTask) => {
      if (!prevTask) {
        return prevTask;
      }

      const index = prevTask.assignees.findIndex(
          (assignee) => assignee._id === id
      );
      if (index === -1) {
        const member = members.find((member) => member._id === id);
        if (member) {
          return {
            ...prevTask,
            assignees: [...prevTask.assignees, member],
          };
        }
      } else {
        const updatedAssignees = prevTask.assignees.filter(
            (assignee) => assignee._id !== id
        );

        return {
          ...prevTask,
          assignees: updatedAssignees,
        };
      }

      return prevTask;
    });
  };

  const handleChange = (key: string, value: Date | any) => {
    let newValue: Date | string;
    console.log(value);

    if (key === "startAt") {
      const newStartAt: Date = value as Date;
      const endTime = new Date(newStartAt.getTime() + 2 * 60 * 60 * 1000);
      setTaskDetail((prevTask) => ({
        ...prevTask,
        startTime: newStartAt,
        endTime: endTime,
      }));
    } else {
      newValue = value;
      setTaskDetail((prevTask) => ({
        ...prevTask,
        [key]: newValue,
      }));
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await taskApi.delete(user._id, id);
      console.log(res.data);
      if (res.data.code === 200) {
        const assignees = taskDetail.assignees.map((assignee) => assignee._id);

        await taskApi.send(assignees, "delete");
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Delete Task",
          textBody: res.data.data,
          button: "Return now!",
          onHide: () => {
            setIsEdit(false);
            setIsChange()
            onClose();

          },
        });
        setIsLoading(false);
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Delete Task",
          textBody: res.data.data,
          button: "I Got It",

        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
      <Modal style={styles.wrapper} isVisible={visible}>
        <TitlePart
            data={{ownerName, ownerPhoto, title}}
            editData={taskDetail}
            isEdit={isEdit}
            handleChange={(val:any) => handleChange("title", val)}
        />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <SectionComponent>
            <Description
                data={{description}}
                editData={taskDetail}
                isEdit={isEdit}
                handleChange={(val:any) => handleChange("description", val)}
            />
            <TimePart
                data={{endTime}}
                editData={taskDetail}
                isEdit={isEdit}
                handleChangeStartAt={(val:any) => handleChange("startAt", val)}
                handleChangeEndAt={(val:any) => handleChange("endAt", val)}
            />

            <AssigneesPart
                data={{assignees}}
                editData={taskDetail}
                members={members}
                handleChange={(id:any) => handleMemberPress(id)}
                isEdit={isEdit}
            />
            <ImagesPart
                data={{taskPhoto}}
                isEdit={isEdit}
                editData={taskDetail}
                handleChange={() => handleDocumentSelection()}
                removePicture={(index:any) => removePicture(index)}
            />
          </SectionComponent>

          <SectionComponent>
            {isOwner({
              id,
              isAssigner,
              status,
              isEdit,
              setIsEdit,
              onClose,
              handleEditTask,
              handleDeleteTask,
              acceptRequest,
            })}
          </SectionComponent>
        </ScrollView>
        <LoadingModal visible={isLoading}/>
      </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: appColors.white,
    paddingTop: 24,
    borderRadius: 15,
    justifyContent: "center",
  },
  subTitle: {
    marginBottom: 5,
  },
});
