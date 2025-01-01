import React, { useState } from "react";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CourseModal from "../../components/modals/CourseModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";

export default function AdminCourses() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Khái niệm Trí tuệ nhân tạo (AI)",
      description: "AI là khả năng máy tính thực hiện các công việc trí tuệ như con người.",
      duration: "6 tuần",
      lessons: 12,
      students: 156,
    },
    {
      id: 2,
      title: "Mạng máy tính và Internet",
      description: "Mạng máy tính kết nối các thiết bị để truyền và trao đổi dữ liệu.",
      duration: "8 tuần",
      lessons: 15,
      students: 143,
    },
    {
      id: 3,
      title: "Giữ gìn tính nhân văn trong thế giới ảo",
      description: "Giao tiếp qua mạng kết nối mọi người nhanh chóng, tiện lợi.",
      duration: "12 tuần",
      lessons: 24,
      students: 128,
    },
    {
      id: 4,
      title: "Giữ gìn tính nhân văn trong thế giới ảo",
      description: "Giao tiếp qua mạng kết nối mọi người nhanh chóng, tiện lợi.",
      duration: "12 tuần",
      lessons: 24,
      students: 128,
    },
   
  ];

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      console.log("Đang xóa khóa học:", courseId);
    }
  };

  const handleSubmit = (courseData: any) => {
    console.log("Đang gửi dữ liệu khóa học:", courseData);
    // Thêm API call ở đây
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lí khóa học</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Thêm khóa học
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course?.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Thời gian: {course.duration}</div>
                <div className="text-sm text-gray-500">Bài học: {course.lessons}</div>
                <div className="text-sm text-gray-500">Số lượng học sinh: {course.students}</div>
              </div>
              <button
                onClick={() => navigate(`/admin/courses/${course.id}`)}
                className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse!}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
