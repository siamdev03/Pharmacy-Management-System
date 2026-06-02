import { axiosInstance } from "@/lib/axios";

export const getSales =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/sales"
      );

    return data;
  };

export const createSale =
  async (payload: any) => {
    const { data } =
      await axiosInstance.post(
        "/sales",
        payload
      );

    return data;
  };

export const deleteSale =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/sales/${id}`
      );

    return data;
  };