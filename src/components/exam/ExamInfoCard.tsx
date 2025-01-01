import { Play } from "lucide-react";
import { IExam } from "../../types/exam-type";

interface ExamInfoCardProps {
  exam?: IExam;
  onStartExam: () => void;
}

export default function ExamInfoCard({ exam, onStartExam,  }: ExamInfoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
      <button
        onClick={onStartExam}
        className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
      >
        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
        Bắt đầu bài kiểm tra ngay
      </button>

      <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
        Hãy chắc chắn rằng bạn đã xem lại tất cả các quy tắc của bài kiểm tra trước khi bắt đầu
      </p>
    </div>
  );
}
