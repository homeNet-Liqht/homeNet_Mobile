import React, { useEffect, useState } from "react";
import { ContainerComponent, SectionComponent } from "../../components";
import Notify from "./component/notify";
import { notifyApi } from "../../apis";

export default function Notification() {
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
      <Notify />
      <Notify />
      <Notify />
      <Notify />
    </ContainerComponent>
  );
}
