import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import questionService from '../../services/question-services';
import { useQuery } from '@tanstack/react-query';

export default function Practice() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`question-manager`],
    queryFn: () => questionService.getQuestions(),
    refetchOnWindowFocus: false,
  });
  const questions = data?.data;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion((prev) => Math.min(prev + 1, questions ? questions.length - 1 : prev));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Câu hỏi ôn tập</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <span className="text-sm text-gray-500">
            Câu {currentQuestion + 1} / {questions?.length}
          </span>
          <h2 className="text-xl font-semibold mt-2">
            {questions?.[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-4">
          {questions?.[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border ${
                selectedAnswer === index
                  ? showResult
                    ? index === Number(questions?.[currentQuestion].correctAnswer)
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === selectedAnswer && (
                  index === Number(questions?.[currentQuestion].correctAnswer) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Câu tiếp theo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}