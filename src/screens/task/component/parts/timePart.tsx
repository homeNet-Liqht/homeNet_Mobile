import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  SectionComponent,
  TextComponent,
  RowComponent,
} from "../../../../components";
import DatePicker from "react-native-date-picker";
import { appInfo } from "../../../../constants/appInfo";
import { appColors } from "../../../../constants/appColors";
import { formatBirthday } from "../../../../utils/formatBirthday";

export default function TimePart({
  data,
  editData,
  isEdit,
  handleChangeStartAt,
  handleChangeEndAt,
}: any) {
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(
    new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
  );

  const handleStartDateTimeChange = (date: Date) => {
    const currentTime = new Date();
    if (date < currentTime) {
      date = currentTime;
    }
    const newEndDateTime = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    setStartDateTime(date);
    setEndDateTime(newEndDateTime);
    handleChangeStartAt(date);
    handleChangeEndAt(newEndDateTime);
  };

  const handleEndDateTimeChange = (date: Date) => {
    setEndDateTime(date);
    handleChangeEndAt(date);
  };

  let content;

  if (isEdit) {
    content = (
      <SectionComponent>
        <RowComponent styles={styles.timeWrapper}>
          <SectionComponent>
            <TextComponent text="From" size={16} color={appColors.gray} />
            <DatePicker
              mode="time"
              date={startDateTime}
              onDateChange={handleStartDateTimeChange}
              style={styles.time}
            />
          </SectionComponent>
          <TextComponent text=">" size={25} styles={{ fontWeight: "600" }} />
          <SectionComponent>
            <TextComponent text="To" size={16} color={appColors.gray} />
            <DatePicker
              mode="time"
              date={endDateTime}
              onDateChange={handleEndDateTimeChange}
              style={styles.time}
            />
          </SectionComponent>
        </RowComponent>
      </SectionComponent>
    );
  } else {
    content = (
      <SectionComponent>
        <TextComponent
          text={formatBirthday(data.endTime)}
          styles={{ marginLeft: -15 }}
        />
      </SectionComponent>
    );
  }

  return (
    <SectionComponent styles={styles.infoWrapper}>
      {!isEdit && (
        <TextComponent text="Due date" size={12} color={appColors.gray} />
      )}
      {content}
    </SectionComponent>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    justifyContent: "flex-start",
  },
  timeWrapper: {
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  time: {
    width: appInfo.size.WIDTH * 0.3,
    height: appInfo.size.HEIGHT * 0.1,
  },
});
