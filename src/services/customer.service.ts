import { axiosInstance } from "@/lib/axios";

export const getCustomers =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/customers"
      );

    return data;
  };

export const getSingleCustomer =
  async (id: string) => {
    const { data } =
      await axiosInstance.get(
        `/customers/${id}`
      );

    return data;
  };

export const createCustomer =
  async (payload: any) => {
    const { data } =
      await axiosInstance.post(
        "/customers",
        payload
      );

    return data;
  };

export const updateCustomer =
  async (
    id: string,
    payload: any
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/customers/${id}`,
        payload
      );

    return data;
  };

export const deleteCustomer =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/customers/${id}`
      );

    return data;
  };