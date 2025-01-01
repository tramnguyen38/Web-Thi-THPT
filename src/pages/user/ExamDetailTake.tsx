import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionOverview from "../../components/exam/QuestionOverview";
import TimerBar from "../../components/exam/TimerBar";
import examService from "../../services/exam-services";
import ExamQuestions from "../../components/exam/ExamQuestions";

export default function PracticeDetailTake() {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`exam-manager`, id],
    queryFn: () => examService.getExam(id as string),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const examQuestions = data?.data?.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [_showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(Number(data?.data?.duration || 0) * 60 || 3600); // 60 minutes in seconds

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowResult(false);
  };

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(examQuestions?.length).fill(null)
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResult(true);
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (submitted) {
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 ">
            {examQuestions && examQuestions.length > 0 && (
              <ExamQuestions
                questions={examQuestions}
                answers={answers}
                setAnswers={setAnswers}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            )}
          </div>

          <div className="lg:col-span-1 h-fit lg:sticky lg:top-24">
            <QuestionOverview
              questions={examQuestions}
              answers={answers}
              currentQuestion={currentQuestion}
              onQuestionSelect={handleJumpToQuestion}
              submitted={submitted}
            />
            <TimerBar
              timeLeft={timeLeft}
              currentQuestion={currentQuestion}
              totalQuestions={Number(examQuestions?.length)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
