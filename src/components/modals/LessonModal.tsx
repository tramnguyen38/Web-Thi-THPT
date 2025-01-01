import React, { useState } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: {
    id?: number;
    title: string;
    content: string;
    duration: string;
    status: "published" | "draft";
  };
  onSubmit: (lessonData: any) => void;
}

export default function LessonModal({ isOpen, onClose, lesson, onSubmit }: LessonModalProps) {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    content: lesson?.content || "",
    duration: lesson?.duration || "",
    status: lesson?.status || "draft",
  });

  const [previewMode, setPreviewMode] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {lesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Nội dung (Markdown)</label>{" "}
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {previewMode ? "Edit" : "Preview"}
              </button>
            </div>
            {previewMode ? (
              <div className="prose max-w-none border rounded-md p-4 min-h-[300px] bg-gray-50">
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={12}
                required
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thời gian học</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., 45 mins"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as "published" | "draft" })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="draft">Nháp</option>
                <option value="published">Công khai</option>
              </select>
            </div>
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
              {lesson ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
