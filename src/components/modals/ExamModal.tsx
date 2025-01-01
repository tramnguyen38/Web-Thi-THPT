import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FORM_EXAM } from "../../constants/exam";
import examService from "../../services/exam-services";
import questionService from "../../services/question-services";
import { IExam } from "../../types/exam-type";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: IExam | null;
  refetch?: () => void;
}

export default function ExamModal({ isOpen, onClose, exam = null, refetch }: ExamModalProps) {
  const methods = useForm({
    defaultValues: {
      [FORM_EXAM.title]: exam?.title ?? "",
      [FORM_EXAM.description]: exam?.description ?? "",
      [FORM_EXAM.duration]: exam?.duration ?? 60,
      [FORM_EXAM.questions]: exam?.questions ?? [],
      [FORM_EXAM.easySize]: exam?.easySize ?? 0,
      [FORM_EXAM.mediumSize]: exam?.mediumSize ?? 0,
      [FORM_EXAM.hardSize]: exam?.hardSize ?? 0,
      [FORM_EXAM.subject]: exam?.subject ?? "computer",
    },
  });
  const {
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const { mutate: onUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: examService.updateExam,
    onSuccess: () => {
      toast.success("Bài kiểm tra đã được cập nhật thành công");
      reset();
      onClose();
      refetch && refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: onCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: examService.createExam,
    onSuccess: () => {
      toast.success("Bài kiểm tra đã được tạo thành công");
      reset();
      onClose();
      refetch && refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: onRandomQuestion, isPending: isPendingRandomQuestion } = useMutation({
    mutationFn: questionService?.getRandomQuestionsByDifficulty,
    onSuccess: (data) => {
      onCreate({
        ...methods.getValues(),
        questions: data?.data,
      });
    },
    onError: (error) => toast.error(error.message),
  });

  const isFormValid = watch(FORM_EXAM.title) && watch(FORM_EXAM.description);
  const isSubmitDisabled = isPendingCreate || isPendingUpdate || !isFormValid;

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;

    const { easySize, mediumSize, hardSize, subject } = data;

    if (easySize <= 0 || mediumSize <= 0 || hardSize <= 0) {
      toast.error("Hãy chọn số lượng câu hỏi cho mỗi loại. Mỗi loại ít nhất 1 câu");
      return;
    }

    if (exam) {
      onUpdate({ ...exam, ...data });
    } else {
      onRandomQuestion({
        easySize,
        mediumSize,
        hardSize,
        subject
      });
    }
  };
  const onErrors = (errors: any) => console.error(errors);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {exam ? "Chỉnh sửa Bài kiểm tra" : "Thêm bài kiểm tra mới"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
              <input
                type="text"
                {...register(FORM_EXAM.title)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mô tả</label>
              <textarea
                {...register(FORM_EXAM.description)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thời gian (phút)</label>
              <input
                type="number"
                {...register(FORM_EXAM.duration)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chủ đề</label>
              <select
                {...register(FORM_EXAM.subject, { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="computer">Máy tính và xã hội tri thức</option>
                <option value="network">Mạng máy tính và Internet</option>
                <option value="ethics">Đạo đức, pháp luật và văn hóa trong môi trường số</option>
                <option value="problem-solving">
                  Giải quyết vấn đề với sự trợ giúp của máy tính
                </option>
                <option value="career-guidance">Hướng nghiệp với tin học</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Số câu biết</label>
              <input
                type="number"
                {...register(FORM_EXAM.easySize)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Số câu hiểu</label>
              <input
                type="number"
                {...register(FORM_EXAM.mediumSize)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Số câu vận dụng</label>
              <input
                type="number"
                {...register(FORM_EXAM.hardSize)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {exam ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
