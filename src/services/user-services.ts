import { SuccessResponse } from "../types/response-type";
import { IUser } from "../types/user-type";
import axiosClient from "./axios-client";

const userService = {
  me: async () => {
    try {
      const response = await axiosClient.get("/user/me");
      return response.data as SuccessResponse<IUser>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get me");
    }
  },
};

export default userService;
