import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  SectionComponent,
  ButtonComponent,
  TextComponent,
} from "../../../../components";
import Modal from "react-native-modal";
import { appColors } from "../../../../constants/appColors";
import { appInfo } from "../../../../constants/appInfo";

interface Props {
  id: string;
  isAssigner: boolean;
  status: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  handleEditTask: () => void;
  handleDeleteTask: (id: string) => void;
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
  id,
  isAssigner,
  status,
  isEdit,
  setIsEdit,
  onClose,
  handleEditTask,
  handleDeleteTask,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const confirmDelete = () => {
    handleDeleteTask(id);
  };

  return (
    <SectionComponent styles={mergedStyles.buttonWrapper}>
      {isEdit ? (
        <>
          <ButtonComponent
            text="Save"
            type="primary"
            onPress={handleEditTask}
          />
          <ButtonComponent
            text="Cancel"
            type="primary"
            color={appColors.white}
            textColor={appColors.primary}
            styles={{
              borderWidth: 2,
              borderColor: appColors.primary,
            }}
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
          <ButtonComponent
            textColor={appColors.primary}
            text="Delete"
            type="primary"
            onPress={toggleModal}
            color={appColors.white}
            styles={{
              borderWidth: 2,
              borderColor: appColors.primary,
            }}
          />
          <ButtonComponent
            text="Close"
            type="primary"
            onPress={onClose}
            textColor="black"
            textStyles={{ fontWeight: "600" }}
            color={appColors.blue}
          />
        </>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn={"fadeIn"}
        animationOut={"fadeOutUpBig"}
      >
        <SectionComponent styles={styles.modalWrapper}>
          <TextComponent
            text="Delete this Task?"
            styles={{ marginVertical: 45 }}
            size={18}
            color={"black"}
          />
          <SectionComponent styles={styles.deleteButtonsWrapper}>
            <ButtonComponent
              text="Yes"
              type="primary"
              onPress={confirmDelete}
            />
            <ButtonComponent
              text="No"
              type="primary"
              onPress={toggleModal}
              color="white"
              textColor={appColors.primary}
              styles={{
                borderWidth: 2,
                borderColor: appColors.primary,
              }}
            />
          </SectionComponent>
        </SectionComponent>
      </Modal>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    borderRadius: 15,
    position: "absolute",
    bottom: appInfo.size.HEIGHT * 0.025,
    backgroundColor: appColors.white,
    width: appInfo.size.WIDTH * 0.8,
    height: appInfo.size.HEIGHT * 0.2,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  deleteButtonsWrapper: {
    marginTop: 25,
    flexDirection: "row",
  },
});
