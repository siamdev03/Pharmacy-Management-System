import { axiosInstance } from "@/lib/axios";

export const getSuppliers =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/suppliers"
      );

    return data;
  };

export const getSingleSupplier =
  async (id: string) => {
    const { data } =
      await axiosInstance.get(
        `/suppliers/${id}`
      );

    return data;
  };

export const createSupplier =
  async (payload: any) => {
    const { data } =
      await axiosInstance.post(
        "/suppliers",
        payload
      );

    return data;
  };

export const updateSupplier =
  async (
    id: string,
    payload: any
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/suppliers/${id}`,
        payload
      );

    return data;
  };

export const deleteSupplier =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/suppliers/${id}`
      );

    return data;
  };