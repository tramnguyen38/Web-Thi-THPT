import React from "react";
import { Book, CheckCircle, Clock, Target } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tổng quan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Book className="w-8 h-8 text-blue-600" />}
          title="Bài học đã hoàn thành"
          value="12/45"
        />
        <StatCard
          icon={<CheckCircle className="w-8 h-8 text-green-600" />}
          title="Bài kiểm tra thực hành"
          value="24"
        />
        <StatCard
          icon={<Target className="w-8 h-8 text-purple-600" />}
          title="Điểm Hiểu"
          value="85%"
        />
        <StatCard
          icon={<Clock className="w-8 h-8 text-yellow-600" />}
          title="Thời gian học"
          value="45h"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Bài học gần đây</h2>
          <div className="space-y-4">
            {[
              { title: "Nhập môn HTML", progress: 100 },
              { title: "JavaScript cơ bản", progress: 75 },
              { title: "Lập trình web cơ bản", progress: 30 },
            ].map((lesson, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-gray-600">{lesson.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Bài kiểm tra sắp tới</h2>
          <div className="space-y-4">
            {[
              { title: "Nhập môn HTML", date: "2024-03-25", time: "10:00 AM" },
              { title: "JavaScript cơ bản", date: "2024-03-28", time: "2:00 PM" },
              { title: "Lập trình web cơ bản", date: "2024-04-01", time: "11:00 AM" },
            ].map((exam, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{exam.title}</h3>
                  <p className="text-sm text-gray-600">
                    {exam.date} at {exam.time}
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Bắt đầu
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600">{title}</h3>
    </div>
  );
}
