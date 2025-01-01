import { ICommonMongodb } from "./common-type";
import { IQuestion } from "./question-type";

export interface IExam extends ICommonMongodb {
  title: string;
  description: string;
  duration: number;
  // bestScore?: number;
  // passingScore?: number;
  questions?: IQuestion[];
  easySize: number;
  mediumSize: number;
  hardSize: number;
  subject: string;
}
