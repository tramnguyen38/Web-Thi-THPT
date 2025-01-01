export const FORM_QUESTION = Object.freeze({
  question: "question",
  options: "options",
  correctAnswer: "correctAnswer",
  type: "type",
  difficulty: "difficulty",
  explanation: "explanation",

  grade: "grade",
  subject: "subject",
  level: "level",
} as const);

export const questionTypes = Object.freeze([
  { label: "Trắc nghiệm", value: "multiple" },
  { label: "Tự luận", value: "essay" },
]);

export const difficultyOptions = Object.freeze([
  { label: "Biết", value: "easy" },
  { label: "Hiểu", value: "medium" },
  { label: "Vận dụng", value: "hard" },
]);

export const DIFFICULTY_OPTIONS = Object.freeze({
  easy: "Biết",
  medium: "Hiểu",
  hard: "Vận dụng",
});
