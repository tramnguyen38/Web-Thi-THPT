import create from "zustand";

interface Exam {
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  attempts: number;
  bestScore?: number;
  passingScore: number;
  questions: string[]; // Assuming questions are stored as an array of question IDs
}

interface ExamStore {
  exams: Exam[];
  addExam: (exam: Exam) => void;
  updateExam: (index: number, updatedExam: Exam) => void;
  removeExam: (index: number) => void;
}

const useExamStore = create<ExamStore>((set) => ({
  exams: [],
  addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
  updateExam: (index, updatedExam) =>
    set((state) => {
      const exams = [...state.exams];
      exams[index] = updatedExam;
      return { exams };
    }),
  removeExam: (index) =>
    set((state) => {
      const exams = state.exams.filter((_, i) => i !== index);
      return { exams };
    }),
}));

export default useExamStore;
