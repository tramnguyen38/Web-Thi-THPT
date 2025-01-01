import React from "react";
import { IQuestion } from "../../types/question-type";

interface ScoreOverviewProps {
  questions: IQuestion[];
  answers: (number | null)[];
}

const ScoreOverview: React.FC<ScoreOverviewProps> = ({ questions, answers }) => {
  const correctAnswers = answers.filter(
    (answer, index) => answer === Number(questions[index].correctAnswer)
  ).length;
  const totalQuestions = questions.length;
  const score = (correctAnswers / totalQuestions) * 10;

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <div className="flex items-center gap-2 text-green-800">
        <span className="font-medium">Kết quả Bài kiểm tra</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Bạn đã trả lời đúng: {correctAnswers}/{totalQuestions}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Điểm số của bạn là: <strong>{score.toFixed(2)}</strong> đ.
      </div>
    </div>
  );
};

export default ScoreOverview;
