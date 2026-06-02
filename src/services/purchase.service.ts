import { axiosInstance } from "@/lib/axios";

export const getPurchases =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/purchases"
      );

    return data;
  };

export const getSinglePurchase =
  async (id: string) => {
    const { data } =
      await axiosInstance.get(
        `/purchases/${id}`
      );

    return data;
  };

export const createPurchase =
  async (payload: any) => {
    const { data } =
      await axiosInstance.post(
        "/purchases",
        payload
      );

    return data;
  };

export const updatePurchase =
  async (
    id: string,
    payload: any
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/purchases/${id}`,
        payload
      );

    return data;
  };

export const deletePurchase =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/purchases/${id}`
      );

    return data;
  };