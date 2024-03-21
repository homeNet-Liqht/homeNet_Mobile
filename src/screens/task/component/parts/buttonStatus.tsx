import React from "react";
import { StyleSheet } from "react-native";
import { SectionComponent, ButtonComponent } from "../../../../components";

interface Props {
  isAssigner: boolean;
  status: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  handleEditTask: () => void;
}

const mergedStyles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
  },
});

export const isAccepting = (status: string, onClose: () => void) => {
  return status === "accepting" ? (
    <SectionComponent styles={mergedStyles.buttonWrapper}>
      <ButtonComponent text="Accepting" type="primary" />
      <ButtonComponent text="Close" type="primary" onPress={onClose} />
    </SectionComponent>
  ) : (
    <SectionComponent styles={mergedStyles.buttonWrapper}>
      <ButtonComponent text="Mark as Done" type="primary" />
      <ButtonComponent text="Close" type="primary" onPress={onClose} />
    </SectionComponent>
  );
};

export const isOwner = ({
  isAssigner,
  status,
  isEdit,
  setIsEdit,
  onClose,
  handleEditTask,
}: Props) => {
  return isAssigner ? (
    <SectionComponent styles={mergedStyles.buttonWrapper}>
      {isEdit ? (
        <>
          <ButtonComponent
            text="Save"
            type="primary"
            onPress={() => {
              handleEditTask();
            }}
          />
          <ButtonComponent
            text="Cancel"
            type="primary"
            onPress={() => setIsEdit(false)}
          />
        </>
      ) : (
        <>
          <ButtonComponent
            text="Edit"
            type="primary"
            onPress={() => setIsEdit(true)}
          />
          <ButtonComponent text="Delete" type="primary" />
          <ButtonComponent text="Close" type="primary" onPress={onClose} />
        </>
      )}
    </SectionComponent>
  ) : (
    isAccepting(status, onClose)
  );
};
