import { axiosInstance } from "@/lib/axios";

export const getNotifications =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/notifications"
      );

    return data;
  };

export const getUnreadCount =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/notifications/unread-count"
      );

    return data;
  };

export const markAllAsRead =
  async () => {
    const { data } =
      await axiosInstance.patch(
        "/notifications/read-all"
      );

    return data;
  };