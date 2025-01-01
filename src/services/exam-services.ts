import { IExam } from "../types/exam-type";
import { SuccessResponse } from "../types/response-type";
import axiosClient from "./axios-client";

const examService = {
  getExams: async () => {
    try {
      const response = await axiosClient.get("/exam");
      return response.data as SuccessResponse<IExam[]>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get exams");
    }
  },

  getExam: async (examId: string) => {
    try {
      const response = await axiosClient.get(`/exam/${examId}`);
      return response.data as SuccessResponse<IExam>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get exam");
    }
  },

  createExam: async (data: any) => {
    try {
      const response = await axiosClient.post("/exam", data);
      return response.data as SuccessResponse<IExam>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to create exam");
    }
  },

  updateExam: async (data: any) => {
    try {
      const response = await axiosClient.put(`/exam/${data?._id}`, data);
      return response.data as SuccessResponse<IExam>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to update exam");
    }
  },

  deleteExam: async (examId: string) => {
    try {
      const response = await axiosClient.delete(`/exam/${examId}`);
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to delete exam");
    }
  },
};

export default examService;
