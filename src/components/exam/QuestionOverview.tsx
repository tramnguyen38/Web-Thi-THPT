import { AlertCircle } from "lucide-react";
import { IQuestion } from "../../types/question-type";
import ScoreOverview from "./ScoreOverview";

interface QuestionOverviewProps {
  questions?: IQuestion[];
  answers: (number | null)[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
  submitted?: boolean;
}

export default function QuestionOverview({
  questions,
  answers,
  currentQuestion,
  onQuestionSelect,
  submitted,
}: QuestionOverviewProps) {
  const allQuestionsAnswered =
    answers.length === questions?.length && answers.every((answer) => answer !== null);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Tổng quan Câu hỏi</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions?.map((_, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
              currentQuestion === index
                ? "bg-blue-600 text-white"
                : submitted && answers[index] !== null
                ? submitted && answers[index] === Number(questions[index].correctAnswer)
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {/* <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-gray-100"></div>
          <span>Chưa trả lời</span>
        </div> */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-blue-600"></div>
          <span>Câu hỏi hiện tại</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-green-100"></div>
          <span>Trả lời đúng</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-red-100"></div>
          <span>Trả lời sai</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 text-blue-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Tiến độ Bài kiểm tra</span>
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-600">
            {answers.filter((a) => a !== null).length} trong số {questions?.length} câu hỏi đã được
            trả lời
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{
                width: `${
                  (answers.filter((a) => a !== null).length / (questions?.length ?? 1)) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {submitted && allQuestionsAnswered && questions && (
        <ScoreOverview questions={questions} answers={answers} />
      )}
    </div>
  );
}
