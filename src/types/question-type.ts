import { ICommonMongodb } from "./common-type";

export interface IQuestion extends ICommonMongodb {
  question: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "true/false";
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
  grade: string;
  subject: string;
  level: string;
}
