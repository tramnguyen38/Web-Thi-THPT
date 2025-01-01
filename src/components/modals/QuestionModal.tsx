import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FORM_QUESTION } from "../../constants/question";
import questionService from "../../services/question-services";
import { IQuestion } from "../../types/question-type";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: IQuestion | null;
  refetch?: () => void;
  handleUpdateExam?: any;
}

export default function QuestionModal({
  isOpen,
  onClose,
  question,
  refetch,
  handleUpdateExam,
}: QuestionModalProps) {
  const [options, setOptions] = useState(question?.options || [""]);
  const methods = useForm({
    defaultValues: {
      [FORM_QUESTION.question]: question?.question ?? "",
      [FORM_QUESTION.options]: question?.options ?? [],
      [FORM_QUESTION.correctAnswer]: question?.correctAnswer ?? 0,
      [FORM_QUESTION.type]: question?.type ?? "multiple-choice",
      [FORM_QUESTION.difficulty]: question?.difficulty ?? "easy",
      [FORM_QUESTION.explanation]: question?.explanation ?? "",
      [FORM_QUESTION.grade]: question?.grade ?? "grade11",
      [FORM_QUESTION.subject]: question?.subject ?? "computer",
      [FORM_QUESTION.level]: question?.level ?? "levelA",
    },
  });
  const {
    watch,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const { mutate: onCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: questionService.createQuestion,
    onSuccess: async (data) => {
      if (handleUpdateExam) {
        await handleUpdateExam(data?.data?._id);
      }
      toast.success("Tạo câu hỏi thành công");
      reset();
      onClose();
      refetch && refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: onUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: questionService.updateQuestion,
    onSuccess: () => {
      toast.success("Cập nhật câu hỏi thành công");
      reset();
      onClose();
      refetch && refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const isFormValid = watch(FORM_QUESTION.question);
  const isSubmitDisabled = isPendingCreate || isPendingUpdate || !isFormValid;

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;
    const formatData = { ...data, type: "multiple-choice" };

    if (question) {
      onUpdate({ ...question, ...formatData });
    } else {
      onCreate(formatData);
    }
  };
  const onErrors = (errors: any) => console.error(errors);

  const handleAddOption = () => {
    console.log(options);
    if (options && options?.length < 6) {
      setOptions((prev) => [...prev, ""]);
      setValue(FORM_QUESTION.options, [...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options && options?.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      setValue(FORM_QUESTION.options, newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    if (options) {
      const newOptions = options.map((option, i) => (i === index ? value : option));
      setOptions(newOptions);
      setValue(FORM_QUESTION.options, newOptions);
    }
  };

  useEffect(() => {
    if (question) {
      reset({
        [FORM_QUESTION.question]: question.question,
        [FORM_QUESTION.options]: question.options,
        [FORM_QUESTION.correctAnswer]: question.correctAnswer,
        [FORM_QUESTION.difficulty]: question.difficulty,
        [FORM_QUESTION.explanation]: question.explanation,
        [FORM_QUESTION.grade]: question.grade,
        [FORM_QUESTION.subject]: question.subject,
        [FORM_QUESTION.level]: question.level,
      });
      setOptions(question.options);
    }
  }, [question]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {question ? "Chỉnh sửa Câu hỏi" : "Thêm câu hỏi mới"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Câu hỏi</label>
              <textarea
                {...register(FORM_QUESTION.question, { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Các tùy chọn</label>{" "}
              <div className="space-y-2">
                {options?.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={(options?.length ?? 0) <= 2}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                disabled={(options?.length ?? 0) >= 6}
              >
                <Plus className="w-4 h-4" />
                Thêm tùy chọn
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Câu trả lời đúng</label>
                <select
                  {...register(FORM_QUESTION.correctAnswer, { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  {options?.map((_, index) => (
                    <option key={index} value={index}>
                      Lựa chọn {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lớp</label>
                <select
                  {...register(FORM_QUESTION.grade, { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="grade11">Lớp 11</option>
                  <option value="grade12">Lớp 12</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chủ đề</label>
              <select
                {...register(FORM_QUESTION.subject, { required: true })}
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

            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Loại câu hỏi</label>
                <select
                  {...register(FORM_QUESTION.type, { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="multiple-choice">Nhiều lựa chọn</option>
                  <option value="true/false">Đúng/Sai</option>
                </select>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700">Độ khó</label>
                <select
                  {...register(FORM_QUESTION.difficulty, { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="easy">Biết</option>
                  <option value="medium">Hiểu</option>
                  <option value="hard">Vận dụng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Năng lực</label>
                <select
                  {...register(FORM_QUESTION.level, { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="levelA">Năng lực A</option>
                  <option value="levelB">Năng lực B</option>
                  <option value="levelC">Năng lực C</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giải thích (tùy chọn)
              </label>
              <textarea
                {...register(FORM_QUESTION.explanation, { required: false })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
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
                {question ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
