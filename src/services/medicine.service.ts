import { axiosInstance } from "@/lib/axios";

export const getMedicines =
  async ({
    page = 1,
    limit = 10,
    searchTerm = "",
    category = "",
    supplier = "",
  }: any) => {
    const { data } =
      await axiosInstance.get(
        "/medicines",
        {
          params: {
            page,
            limit,
            searchTerm,
            category,
            supplier,
          },
        }
      );

    return data;
  };

export const getSingleMedicine =
  async (id: string) => {
    const { data } =
      await axiosInstance.get(
        `/medicines/${id}`
      );

    return data;
  };

export const createMedicine =
  async (payload: any) => {
    const { data } =
      await axiosInstance.post(
        "/medicines",
        payload
      );

    return data;
  };

export const updateMedicine =
  async (
    id: string,
    payload: any
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/medicines/${id}`,
        payload
      );

    return data;
  };

export const deleteMedicine =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/medicines/${id}`
      );

    return data;
  };