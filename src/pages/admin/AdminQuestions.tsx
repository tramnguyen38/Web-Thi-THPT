import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import QuestionModal from "../../components/modals/QuestionModal";
import { DIFFICULTY_OPTIONS } from "../../constants/question";
import questionService from "../../services/question-services";
import { IQuestion } from "../../types/question-type";

export default function AdminQuestions() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const { mutate: onDelete, isPending } = useMutation({
    mutationFn: questionService.deleteQuestion,
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setSelectedQuestion(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting question:", error);
    },
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`question-manager`],
    queryFn: () => questionService.getQuestions(),
    refetchOnWindowFocus: false,
  });
  const questions = data?.data;

  const handleEditQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedQuestion) {
      onDelete(selectedQuestion._id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý câu hỏi</h1>
        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Thêm câu hỏi
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Câu hỏi
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Độ Vận dụng
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bài học
              </th> */}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions?.map((question) => (
              <tr key={question._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{question.question}</div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{question.type}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {DIFFICULTY_OPTIONS?.[question.difficulty]}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{question.lesson}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setSelectedQuestion(null);
        }}
        question={selectedQuestion}
        refetch={refetch}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedQuestion(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Xóa Câu Hỏi"
        message="Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
