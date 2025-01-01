import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, BookOpen, FileQuestion, Award, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [
      {
        label: "Hiệu suất của học sinh",
        data: [65, 72, 78, 85],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const quickActions = [
    {
      title: "Thêm Khóa học Mới",
      icon: <BookOpen className="w-6 h-6" />,
      onClick: () => navigate("/admin/courses"),
      color: "bg-blue-600",
    },
    {
      title: "Tạo Bài kiểm tra",
      icon: <FileQuestion className="w-6 h-6" />,
      onClick: () => navigate("/admin/exams"),
      color: "bg-green-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
        <div className="flex gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2`}
            >
              {action.icon}
              {action.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-8 h-8 text-blue-600" />}
          title="Tổng số Học sinh"
          value="1,234"
          onClick={() => {}}
        />
        <StatCard
          icon={<BookOpen className="w-8 h-8 text-green-600" />}
          title="Khóa học Đang hoạt động"
          value="45"
          onClick={() => navigate("/admin/courses")}
        />
        <StatCard
          icon={<FileQuestion className="w-8 h-8 text-purple-600" />}
          title="Tổng số Bài kiểm tra"
          value="28"
          onClick={() => navigate("/admin/exams")}
        />
        <StatCard
          icon={<Award className="w-8 h-8 text-yellow-600" />}
          title="Điểm Hiểu"
          value="78%"
          onClick={() => {}}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Khóa học Gần đây</h2>
          <div className="space-y-4">
            {[
              { title: "Khái niệm Trí tuệ nhân tạo (AI)", students: 156 },
              { title: "Mạng máy tính và Internet", students: 143 },
              { title: "Giữ gìn tính nhân văn trong thế giới ảo", students: 128 },
            ].map((course, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.students} học sinh</p>
                </div>
                <button
                  onClick={() => navigate("/admin/courses")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Xem Chi tiết
                </button>
              </div>
            ))}
            <button
              onClick={() => navigate("/admin/courses")}
              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-5 h-5" />
              Thêm Khóa học Mới
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Bài kiểm tra Gần đây</h2>
          <div className="space-y-4">
            {[
              { title: "Khái niệm Trí tuệ nhân tạo (AI)", attempts: 89 },
              { title: "Mạng máy tính và Internet", attempts: 76 },
              { title: "Đánh giá Cuối kỳ", attempts: 45 },
            ].map((exam, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{exam.title}</h3>
                  <p className="text-sm text-gray-500">{exam.attempts} lần thử</p>
                </div>
                <button
                  onClick={() => navigate("/admin/exams")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Xem Chi tiết
                </button>
              </div>
            ))}
            <button
              onClick={() => navigate("/admin/exams")}
              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-5 h-5" />
              Tạo Bài kiểm tra Mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600">{title}</h3>
    </div>
  );
}
