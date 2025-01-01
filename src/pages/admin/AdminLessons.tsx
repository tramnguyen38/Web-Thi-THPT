import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LessonModal from "../../components/modals/LessonModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import { motion } from "framer-motion";

export default function AdminLessons() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const lessons = [
    {
      id: 1,
      title: "Giới thiệu về React",
      duration: "45 phút",
      students: 156,
      content:
        "# Giới thiệu về React\n\nReact là một thư viện JavaScript để xây dựng giao diện người dùng.",
      status: "đã xuất bản",
    },
    {
      id: 2,
      title: "Quản lý State",
      duration: "60 phút",
      students: 143,
      content: "# Quản lý State\n\nHọc cách quản lý state trong các ứng dụng React.",
      status: "đã xuất bản",
    },
    {
      id: 3,
      title: "React Hooks",
      duration: "50 phút",
      students: 128,
      content: "# React Hooks\n\nLàm chủ việc sử dụng React Hooks trong các ứng dụng của bạn.",
      status: "bản nháp",
    },
  ];

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleDeleteLesson = (lessonId: number) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    setSelectedLesson(lesson);
    setIsDeleteModalOpen(true);
  };

  const handleLessonSubmit = (lessonData: any) => {
    console.log("Updating lesson:", lessonData);
    // Add API call here
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting lesson:", selectedLesson?.id);
    // Add API call here
    setIsDeleteModalOpen(false);
    setSelectedLesson(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lí bài học</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Thêm bài học
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{lesson.title}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    lesson.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {lesson.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-500">Thời gian: {lesson.duration}</div>
                <div className="text-sm text-gray-500">Số lượng học sinh: {lesson.students}</div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/admin/lessons/${lesson.id}`)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleEditLesson(lesson)}
                  className="p-2 text-blue-600 hover:text-blue-900"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteLesson(lesson.id)}
                  className="p-2 text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <LessonModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLesson(null);
        }}
        lesson={selectedLesson}
        onSubmit={handleLessonSubmit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedLesson(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Lesson"
        message="Are you sure you want to delete this lesson? This action cannot be undone."
      />
    </div>
  );
}
