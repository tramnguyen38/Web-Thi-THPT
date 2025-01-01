import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { lessonContents } from "../constants/user/lession";

export default function LessonDetail() {
  const { id = 0 } = useParams();

  const lessonContent = lessonContents[Number(id)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ReactMarkdown className="prose max-w-none">{lessonContent}</ReactMarkdown>
            </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sticky h-fit top-[80px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Thông tin bài học</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>45 phút</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <span>156 học viên đã đăng ký</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span>Trình độ người mới bắt đầu</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Tiến độ của bạn</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Giới thiệu đã hoàn thành</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 rounded-full h-2 w-3/4"></div>
              </div>
              <span className="text-sm text-gray-500">Hoàn thành 75%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
