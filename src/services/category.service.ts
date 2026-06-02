import { axiosInstance } from "@/lib/axios";

export const getCategories = async () => {
  const { data } =
    await axiosInstance.get("/categories");

  return data;
};

export const getSingleCategory =
  async (id: string) => {
    const { data } =
      await axiosInstance.get(
        `/categories/${id}`
      );

    return data;
  };

export const createCategory =
  async (payload: {
    name: string;
  }) => {
    const { data } =
      await axiosInstance.post(
        "/categories",
        payload
      );

    return data;
  };

export const updateCategory =
  async (
    id: string,
    payload: {
      name: string;
    }
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/categories/${id}`,
        payload
      );

    return data;
  };

export const deleteCategory =
  async (id: string) => {
    const { data } =
      await axiosInstance.delete(
        `/categories/${id}`
      );

    return data;
  };