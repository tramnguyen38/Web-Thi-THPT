import { IQuestion } from "../types/question-type";
import { SuccessResponse } from "../types/response-type";
import axiosClient from "./axios-client";

const questionService = {
  getQuestions: async () => {
    try {
      const response = await axiosClient.get("/question");
      return response.data as SuccessResponse<IQuestion[]>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get questions");
    }
  },

  getQuestion: async (questionId: string) => {
    try {
      const response = await axiosClient.get(`/question/${questionId}`);
      return response.data as SuccessResponse<IQuestion>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get question");
    }
  },

  createQuestion: async (data: IQuestion) => {
    try {
      const response = await axiosClient.post("/question", data);
      return response.data as SuccessResponse<IQuestion>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to create question");
    }
  },

  updateQuestion: async (data: IQuestion) => {
    try {
      const response = await axiosClient.put(`/question/${data._id}`, data);
      return response.data as SuccessResponse<IQuestion>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to update question");
    }
  },

  deleteQuestion: async (questionId: string) => {
    try {
      const response = await axiosClient.delete(`/question/${questionId}`);
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to delete question");
    }
  },

  getRandomQuestionsByDifficulty: async ({
    easySize,
    mediumSize,
    hardSize,
    subject
  }: {
    easySize: string;
    mediumSize: string;
    hardSize: string;
    subject: string;
  }) => {
    try {
      const response = await axiosClient.post("/question/random", {
        easySize,
        mediumSize,
        hardSize,
        subject
      });
      return response.data as SuccessResponse<IQuestion[]>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get random questions");
    }
  },
};

export default questionService;
