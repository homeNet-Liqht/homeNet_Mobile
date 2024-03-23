import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SectionComponent, TextComponent } from "../../../../components";
import { appColors } from "../../../../constants/appColors";
import { appInfo } from "../../../../constants/appInfo";
import Member from "../Member";

interface Member {
  _id: string;
  name: string;
  photo: string;
}
export default function AssigneesPart({
  data,
  members,
  editData,
  isEdit,
  handleChange,
}: any) {
  return (
    <SectionComponent styles={styles.infoWrapper}>
      <TextComponent
        text="Assignees"
        size={12}
        styles={styles.subTitle}
        color={appColors.gray}
      />
      <SectionComponent
        styles={{
          marginTop: 5,
          marginLeft: -15,
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.memberWrapper}>
          {isEdit ? (
            members ? (
              members.map((member: Member) => {
                const isChosen = editData.assignees.some(
                  (assignee) => assignee._id === member._id
                );

                return (
                  <Member
                    key={member._id}
                    _id={member._id}
                    name={member.name}
                    photo={member.photo}
                    isPick={isChosen}
                    onPress={handleChange}
                  />
                );
              })
            ) : (
              <TextComponent text="Loading..." />
            )
          ) : data.assignees && data.assignees.length > 0 ? (
            data.assignees.map((assignee: Member) =>
              assignee.photo ? (
                <Image
                  key={assignee._id}
                  source={{ uri: assignee.photo }}
                  style={[styles.ownerProfile, { marginLeft: -8 }]}
                />
              ) : (
                <View
                  key={assignee._id}
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: appColors.primary,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextComponent
                    color={appColors.white}
                    size={appInfo.size.WIDTH * 0.04}
                    styles={{ fontWeight: "bold" }}
                    text={assignee.name[0]}
                  />
                </View>
              )
            )
          ) : (
            <TextComponent text="Loading..." />
          )}
        </View>
      </SectionComponent>
    </SectionComponent>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 5,
  },
  infoWrapper: {
    justifyContent: "flex-start",
  },
  memberWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  ownerProfile: {
    marginLeft: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});