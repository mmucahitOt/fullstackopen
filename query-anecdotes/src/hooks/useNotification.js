import { useContext } from "react";
import { NotificationContext } from "../providers/NotificationContextProvider";

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch.notification;
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch.notificationDispatch;
};
