import { AuthStorage } from "../lib/local-storage";
import { ILogIn, IRegister, IResponseLogin, ITokens } from "../types/auth-types";
import { SuccessResponse } from "../types/response-type";
import axiosClient from "./axios-client";

const authService = {
  register: async (data: IRegister) => {
    try {
      const response = await axiosClient.post("/auth/register", data);
      return response.data as SuccessResponse<ITokens>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to register");
    }
  },

  login: async (data: ILogIn) => {
    try {
      const response = await axiosClient.post("/auth/login", data);
      return response.data as SuccessResponse<IResponseLogin>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to login");
    }
  },

  logout: async () => {
    try {
      const response = await axiosClient.post("/auth/logout");
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to logout");
    } finally {
      AuthStorage.clearToken();
    }
  },

  refresh_token: async ({ refresh_token }: { refresh_token: string }) => {
    try {
      const response = await axiosClient.post("/auth/refresh-token", { refresh_token });
      return response.data as SuccessResponse<ITokens>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to refresh token");
    }
  },

  resetPassword: async ({ email }: { email: string }) => {
    try {
      const response = await axiosClient.post("/auth/reset-password", { email });
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to reset password");
    }
  },

  verifyEmail: async ({ token }: { token: string }) => {
    try {
      const response = await axiosClient.get("/auth/verify-email", { params: { token } });
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to verify email");
    }
  },
};

export default authService;
