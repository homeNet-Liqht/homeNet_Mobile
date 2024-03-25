import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { DocumentPickerResponse } from "react-native-document-picker";

import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import { appInfo } from "../../constants/appInfo";
import { appColors } from "../../constants/appColors";
import DatePicker from "react-native-date-picker";
import Member from "./component/Member";
import { selectFiles } from "../../utils/photoLibraryAction";
import {
  requestExternalReadPermission,
  requestExternalWritePermission,
} from "../../utils/requestDevices";
import { familyApi, taskApi } from "../../apis/index";
import { LoadingModal } from "../../modals";

import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { useDispatch } from "react-redux";
import { refreshTask } from "../../redux/reducers/taskReducer";
const initialValue: {
  title: string;
  description: string;
  location: {
    title: string;
    address: string;
  };
  photo: DocumentPickerResponse[];
  assignees: any[];
  assigner: string;
  startAt: Date;
  endAt: Date;
} = {
  title: "",
  description: "",
  location: {
    title: "",
    address: "",
  },
  photo: [],
  assignees: [],
  assigner: "",
  startAt: new Date(),
  endAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
};

function AddNewTask({ navigation }: any) {
  const [Task, setTask] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [filesResponse, setFilesResponse] = useState<DocumentPickerResponse[]>(
    []
  );
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  const handleMemberPress = (id: string) => {
    const index = Task.assignees.indexOf(id);

    if (index === -1) {
      Task.assignees.push(id);
    } else {
      Task.assignees.splice(index, 1);
    }
    console.log(Task.assignees);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await familyApi.getFamily();

      if (res && res.data && res.data.data.members) {
        setMembers(res.data.data.members);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };
  const handleDocumentSelection = async () => {
    const isReadStoragePermit = await requestExternalReadPermission();
    const isWriteStoragePermit = await requestExternalWritePermission();
    if (isReadStoragePermit && isWriteStoragePermit) {
      const response = await selectFiles();
      if (response) {
        setFilesResponse(response);
        setTask((prevTask) => ({
          ...prevTask,
          photo: [...prevTask.photo, ...response],
        }));
      }
    }
  };
  const handleChange = (key: string, value: Date | any) => {
    let newValue: Date;

    if (key === "startAt") {
      const newStartAt: Date = value;
      const endTime = new Date(newStartAt.getTime() + 2 * 60 * 60 * 1000);
      setTask((prevTask) => ({
        ...prevTask,
        startAt: newStartAt,
        endAt: endTime,
      }));
    } else {
      newValue = value;
      setTask((prevTask) => ({
        ...prevTask,
        [key]: newValue,
      }));
    }
  };

  const handleAddTask = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (Task) {
        formData.append("title", Task.title);
        formData.append("description", Task.description);
        formData.append("startTime", Task.startAt.toISOString());
        formData.append("endTime", Task.endAt.toISOString());
        if (Task.assignees.length > 0) {
          formData.append("assignees", Task.assignees);
        } else {
          formData.append("assignees", Task.assignees);
        }

        if (Task.photo.length > 0) {
          Task.photo.map((photo: DocumentPickerResponse) => {
            formData.append("image", photo);
          });
        } else {
          formData.append("image", Task.photo);
        }
      }
      console.log(formData.getParts());

      console.log("Pre Upload");
      if (Task.assignees.length < 1) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Assignees were missing",
          textBody: "You need to choose at least one person to do this task",
          button: "Got it!",
        });
        return setIsLoading(false);
      }

      const res = await taskApi.createTask(formData);

      if (res.data.code === 200) {
      console.log("send noti");

        await taskApi.send(Task.assignees, "task");
        setIsLoading(false);
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: "New Task",
          textBody: res.data.data,
          button: "Close",
          onHide: () => {
            setTask(initialValue);
            dispatch(refreshTask());

            navigation.navigate("TaskScreen");
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
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Fail",
        textBody: error.data.data,
        button: "Close",
      });
    }
  };

  return (
    <ContainerComponent isScroll title="Add new Task" back>
      <SectionComponent>
        <TextComponent text="Select the date" size={18} styles={styles.title} />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Title" size={18} styles={styles.title} />
        <InputComponent
          placeHolder="Title"
          value={Task.title}
          onChange={(val) => handleChange("title", val)}
          isPassword={false}
          allowClear
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Members" size={18} styles={styles.title} />
        <View style={styles.memberWrapper}>
          {members ? (
            members.map((member) => {
              const isChosen = Task.assignees.includes(member._id);

              return (
                <Member
                  key={member._id}
                  _id={member._id}
                  name={member.name}
                  photo={member.photo}
                  onPress={(id) => handleMemberPress(id)}
                  isPick={isChosen}
                />
              );
            })
          ) : (
            <TextComponent text="Loading..." />
          )}
        </View>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Select time" size={18} styles={styles.title} />
        <RowComponent styles={styles.timeWrapper}>
          <SectionComponent>
            <TextComponent text="From" size={16} color={appColors.gray} />
            <DatePicker
              mode="time"
              date={new Date(Task.startAt)}
              onDateChange={(val) => handleChange("startAt", val)}
              style={styles.time}
            />
          </SectionComponent>
          <TextComponent text=">" size={25} styles={{ fontWeight: "600" }} />
          <SectionComponent>
            <TextComponent text="To" size={16} color={appColors.gray} />
            <DatePicker
              mode="time"
              date={new Date(Task.endAt)}
              onDateChange={(val) => handleChange("endAt", val)}
              style={styles.time}
            />
          </SectionComponent>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Description" size={18} styles={styles.title} />
        <InputComponent
          placeHolder="Description"
          value={Task.description}
          onChange={(val) => handleChange("description", val)}
          multiline
          numberOfLine={4}
          isPassword={false}
          allowClear
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Image(s)" size={18} styles={styles.title} />
        <SectionComponent styles={styles.imageResponseWrapper}>
          {filesResponse &&
            filesResponse.map((file, index) => {
              return (
                <Image
                  key={index}
                  source={{ uri: file.uri }}
                  style={styles.imageResponse}
                />
              );
            })}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleDocumentSelection}
          >
            <EvilIcons name={"image"} size={50} />
          </TouchableOpacity>
        </SectionComponent>
      </SectionComponent>
      <ButtonComponent text="Save" type="primary" onPress={handleAddTask} />
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}
const styles = StyleSheet.create({
  memberWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  timeWrapper: {
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  time: {
    width: appInfo.size.WIDTH * 0.4,
    height: appInfo.size.HEIGHT * 0.1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 12,
  },
  imageResponseWrapper: {
    flexDirection: "row",
    gap: -30,
  },
  imageResponse: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  imagePicker: {
    borderWidth: 1,
    borderStyle: "dashed",
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "white",
  },
});

export default AddNewTask;
function taskRefresh(arg0: boolean): any {
  throw new Error("Function not implemented.");
}
