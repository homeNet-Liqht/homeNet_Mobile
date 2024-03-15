import React, { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import {
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from "../../components";

const initialValue = {
  title: "",
  description: "",
  location: {
    title: "",
    address: "",
  },
  photo: [""],
  assignees: [""],
  assigner: [],
  startAt: "",
  endAt: "",
};

function TaskScreen() {
  const [Task, setTask] = useState(initialValue);
  const handleChange = (key: string, value: string) => {
    const items = { ...Task };
    items[`${key}`] = value;
    setTask(items);
  };

  const handleAddTask = async () => {
    console.log(Task);
  };

  return (
    <ContainerComponent isScroll title="Add new Task">
      <SectionComponent>
        <TextComponent text="Add new" size={18} />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeHolder="Title"
          value={Task.title}
          onChange={(val) => handleChange("title", val)}
          isPassword={false}
          allowClear
        />
        <InputComponent
          placeHolder="Description"
          value={Task.title}
          onChange={(val) => handleChange("description", val)}
          multiline
          numberOfLine={4}
          isPassword={false}
          allowClear
          
        />
      </SectionComponent>
    </ContainerComponent>
  );
}

export default TaskScreen;
