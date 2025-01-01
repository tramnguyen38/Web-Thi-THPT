import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, Edit, FileText, Plus, Target, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import QuestionModal from "../../components/modals/QuestionModal";
import examService from "../../services/exam-services";
import { IQuestion } from "../../types/question-type";
import { DIFFICULTY_OPTIONS } from "../../constants/question";
import { toast } from "sonner";

export default function ExamDetail() {
  const { id } = useParams();
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`exam-manager`, id],
    queryFn: () => examService.getExam(id as string),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const exam = data?.data;

  const { mutate: onUpdateExam } = useMutation({
    mutationFn: (id) =>
      examService.updateExam({
        ...exam,
        questions: exam?.questions ? [...exam.questions, id] : [id],
      }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error updating exam", error);
      toast.error("Error deleting question");
    },
  });

  const handleEditQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{exam?.title}</h1>
                <p className="text-gray-600 mb-6">{exam?.description}</p>
              </div>
              <button
                onClick={() => setIsQuestionModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Thêm câu hỏi
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{exam?.duration}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-400" />
                <span>Đúng: {exam?.passingScore}%</span>
              </div> */}
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <span>{exam?.questions?.length} câu hỏi</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {exam?.questions?.map((question: IQuestion, index: number) => (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Câu {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="p-2 text-blue-600 hover:text-blue-900"
                      title="Edit Question"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question)}
                      className="p-2 text-red-600 hover:text-red-900"
                      title="Xóa câu hỏi"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-800 mb-4">{question.question}</p>

                <div className="space-y-2 mb-4">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === Number(question.correctAnswer)
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 rounded ${
                      question.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : question.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {DIFFICULTY_OPTIONS[question.difficulty]}
                  </span>
                  {/* <span>{question.type}</span> */}
                </div>

                {question.explanation && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-[74px]">
            <h2 className="text-xl font-semibold mb-4">Tóm tắt Câu hỏi</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between border-b text-sm text-gray-600 py-2">
                  <span>Tổng số Câu hỏi</span>
                  <span>{exam?.questions?.length}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Biết</span>
                    <span>
                      {exam?.questions?.filter((q: IQuestion) => q.difficulty === "easy").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hiểu</span>
                    <span>
                      {exam?.questions?.filter((q: IQuestion) => q.difficulty === "medium").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vận dụng</span>
                    <span>
                      {exam?.questions?.filter((q: IQuestion) => q.difficulty === "hard").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Loại Câu hỏi</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trắc nghiệm</span>
                    <span>
                      {
                        exam?.questions?.filter((q: IQuestion) => q.type === "multiple-choice")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Đúng/Sai</span>
                    <span>
                      {exam?.questions?.filter((q: IQuestion) => q.type === "true/false").length}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setSelectedQuestion(null);
        }}
        question={selectedQuestion}
        refetch={refetch}
        handleUpdateExam={onUpdateExam}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedQuestion(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Xóa câu hỏi"
        message="Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
