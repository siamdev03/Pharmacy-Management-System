import { axiosInstance } from "@/lib/axios";

export const loginUser = async (
  payload: {
    email: string;
    password: string;
  }
) => {
  const { data } =
    await axiosInstance.post(
      "/auth/login",
      payload
    );

  return data;
};