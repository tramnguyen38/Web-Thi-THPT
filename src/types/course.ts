import { ICommonMongodb } from "./common-type";

export interface Lesson extends ICommonMongodb {
  title: string;
  content: string;
  duration: string;
  status: "published" | "draft";
}

export interface Course extends ICommonMongodb {
  title: string;
  description: string;
  duration: string;
  students: number;
  progress: number;
  lessons: Lesson[];
}

export interface CourseStats {
  completionRate: number;
  engagement: "Low" | "medium" | "High";
  totalStudents: number;
  averageScore: number;
}
