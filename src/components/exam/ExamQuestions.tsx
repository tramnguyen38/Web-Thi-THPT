import React, { useState } from "react";
import { motion } from "framer-motion";
import { IQuestion } from "../../types/question-type";

interface ExamQuestionsProps {
  questions: IQuestion[];
  answers: (number | null)[];
  setAnswers: (answers: (number | null)[]) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
}

const ExamQuestions: React.FC<ExamQuestionsProps> = ({
  questions,
  answers,
  setAnswers,
  submitted,
  setSubmitted,
}) => {
  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newSelectedAnswers = [...answers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Exam Questions</h2>
      <div className="space-y-4 sm:space-y-6">
        {questions.map((question, questionIndex) => (
          <motion.div
            key={question._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: questionIndex * 0.1 }}
            className="p-3 sm:p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">
              {questionIndex + 1}. {question.question}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  disabled={submitted}
                  onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                  className={`p-2 w-full text-start sm:p-3 rounded-lg border text-sm sm:text-base cursor-pointer ${
                    optionIndex === answers[questionIndex]
                      ? "bg-blue-100 border-blue-200"
                      : "bg-white border-gray-200"
                  } ${
                    submitted &&
                    (optionIndex === Number(question.correctAnswer)
                      ? "bg-green-100 border-green-200"
                      : optionIndex === answers[questionIndex]
                      ? "bg-red-100 border-red-200"
                      : "")
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="bg-blue-100 p-2 rounded-lg mt-4">
                {Number(question.correctAnswer) !== answers[questionIndex] && (
                  <div className=" text-sm sm:text-base">
                    <span className="font-semibold">Đáp án đúng:</span>{" "}
                    {question.options[Number(question.correctAnswer)]}
                  </div>
                )}

                {question.explanation && (
                  <div className=" text-sm sm:text-base mt-2">
                    <span className="font-semibold">Giải thích:</span> {question.explanation}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        disabled={submitted}
        onClick={handleSubmit}
        className={`mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg transition ${
          submitted ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "hover:bg-blue-700 "
        }`}
      >
        {submitted ? "Đã nộp bài" : "Nộp bài"}
      </button>
    </div>
  );
};

export default ExamQuestions;
