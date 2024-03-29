import React, { useEffect, useState } from "react";
import {
  ContainerComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import Notify from "./component/notify";
import { notifyApi } from "../../apis";
import { Image } from "react-native";
import { appInfo } from "../../constants/appInfo";
export default function Notification({ navigation }: any) {
  const [notifications, setNotifications] = useState<Object[]>();
  const refreshNotifications = notifications?.length;
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    setIsLoading(true);

    try {
      const res = await notifyApi.show();
      setNotifications(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.data.data);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back title="Notifications" isScroll>
      <SectionComponent
        styles={{ justifyContent: "center", alignItems: "center" }}
      >
        {notifications ? (
          notifications.map((notification, index) => (
            <Notify
              key={index}
              message={notification.message}
              image={notification.sender_id.photo}
              name={notification.sender_id.name}
              taskId={notification.task_id}
              type={notification.type}
              navigation={navigation}
            />
          ))
        ) : (
          <SectionComponent
            styles={{
              alignSelf: "center",
              marginTop: appInfo.size.HEIGHT * 0.2,
            }}
          >
            <Image source={require("../../assets/imgs/notification.png")} />
            <TextComponent text={"No notification to show!"} />
          </SectionComponent>
        )}
      </SectionComponent>
    </ContainerComponent>
  );
}
