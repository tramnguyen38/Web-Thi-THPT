import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, Edit, FileText, Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import ExamModal from "../../components/modals/ExamModal";
import examService from "../../services/exam-services";

export default function Exams() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleExamClick = (examId: number | string) => {
    navigate(`/admin/exams/${examId}`);
  };

  const {
    data: exams,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`exam-manager`],
    queryFn: () => examService.getExams(),
    refetchOnWindowFocus: false,
  });

  const { mutate: onDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: examService.deleteExam,
  });

  const handleDeleteExam = (examId: number | string) => {
    onDeleteById(examId?.toString(), {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleOpenModalOpenCourse = () => {
    setSelectedExam(null);
    setIsModalOpen(true);
  };
  const handleOpenModalEditCourse = (exam: any) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Các Bài Kiểm tra Có sẵn - Nền tảng Học tập"
        description="Thực hiện các bài kiểm tra và đánh giá để đánh giá kiến thức của bạn"
        keywords="bài kiểm tra trực tuyến, bài kiểm tra thực hành, đánh giá, đánh giá học tập"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            Các Bài Kiểm tra Có sẵn
          </h1>
          <button
            onClick={handleOpenModalOpenCourse}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Thêm bài kiểm tra
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exams?.data?.map((exam, index) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <div className="flex space-x-2">
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModalEditCourse(exam);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button> */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteExam(exam?._id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold mb-2">{exam?.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {exam?.description}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{exam?.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{exam?.questions?.length} câu hỏi</span>
                  </div>
                </div>

                <div
                  onClick={() => handleExamClick(exam._id)}
                  className="flex items-center justify-between "
                >
                  <div className="flex items-center gap-1 sm:gap-2 text-blue-600 text-sm sm:text-base hover:underline transition-all">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Xem Chi tiết</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExam(null);
        }}
        refetch={refetch}
        exam={selectedExam}
      />
    </>
  );
}
