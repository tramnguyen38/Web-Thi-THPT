import { ICommonMongodb } from "./common-type";

export interface IUser extends ICommonMongodb {
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface IUserProgress extends ICommonMongodb {
  userId: string;
  courseId: number;
  lessonId: number;
  completed: boolean;
  score?: number;
  lastAccessed: Date;
}
