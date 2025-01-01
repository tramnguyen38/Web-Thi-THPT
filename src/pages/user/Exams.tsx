import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, FileText, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import examService from "../../services/exam-services";

export default function Exams() {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`exam-user`],
    queryFn: () => examService.getExams(),
    refetchOnWindowFocus: false,
  });

  const exams = data?.data;

  const handleExamClick = (examId: string) => {
    navigate(`/exams/${examId}`);
  };

  return (
    <>
      <SEO
        title="Các Bài Kiểm tra Có sẵn - Nền tảng Học tập"
        description="Thực hiện các bài kiểm tra và đánh giá để đánh giá kiến thức của bạn"
        keywords="bài kiểm tra trực tuyến, bài kiểm tra thực hành, đánh giá, đánh giá học tập"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
          Các Bài Kiểm tra Có sẵn
        </h1>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exams?.map((exam, index) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleExamClick(exam._id)}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold mb-2">{exam.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{exam.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{exam.questions?.length} câu hỏi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2 text-blue-600 text-sm sm:text-base">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Xem Chi tiết</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
