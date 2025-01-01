import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";
import useAuthStore from "../store/auth-store";

export default function LandingPage() {
  const { isAuthenticated, userRole } = useAuthStore();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(userRole === "admin" ? "/admin" : "/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Làm chủ kiến thức của bạn với học tập tương tác
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nâng cao trải nghiệm học tập của bạn với nền tảng thi toàn diện của chúng tôi. Thực
            hành, học hỏi và xuất sắc với các bài đánh giá cá nhân hóa.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Bắt đầu
            </button>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Tính năng nền tảng</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-blue-600" />}
              title="Nội dung phong phú"
              description="Truy cập các bài học và tài liệu học tập toàn diện"
            />
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8 text-blue-600" />}
              title="Bài kiểm tra thực hành"
              description="Chuẩn bị với các câu hỏi trắc nghiệm và bài thi thử"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-blue-600" />}
              title="Theo dõi tiến độ"
              description="Giám sát hiệu suất của bạn với phân tích chi tiết"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Hỗ trợ chuyên gia"
              description="Nhận hướng dẫn từ các nhà giáo dục có kinh nghiệm"
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="10,000+" label="Học sinh đang hoạt động" />
            <StatCard number="500+" label="Câu hỏi thực hành" />
            <StatCard number="50+" label="Mô-đun khóa học" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
}
