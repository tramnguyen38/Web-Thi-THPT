import { Clock } from "lucide-react";

interface TimerBarProps {
  timeLeft: number;
  currentQuestion: number;
  totalQuestions: number;
}

export default function TimerBar({ timeLeft, currentQuestion, totalQuestions }: TimerBarProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-2">
        <span className="text-gray-900">Thời gian còn lại:</span>
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${timeLeft === 0 ? "text-red-500" : "text-gray-500"}`} />
          <span className={`font-medium ${timeLeft === 0 ? "text-red-500" : "text-gray-900"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        {/* <div>
          Question {currentQuestion + 1} of {totalQuestions}
        </div> */}
      </div>
    </div>
  );
}