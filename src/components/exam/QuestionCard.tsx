import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { IQuestion } from "../../types/question-type";

interface QuestionCardProps {
  question: IQuestion;
  currentAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionCard({
  question,
  currentAnswer,
  showResult,
  onAnswerSelect,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              currentAnswer === index
                ? showResult
                  ? index === Number(question.correctAnswer)
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult &&
                currentAnswer === index &&
                (index === Number(question.correctAnswer) ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                ))}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
