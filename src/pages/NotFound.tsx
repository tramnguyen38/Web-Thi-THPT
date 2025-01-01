import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-9xl font-bold text-blue-600"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">Không tìm thấy trang</h2>
        <p className="text-gray-600 mt-2 mb-8">
          Trang bạn tìm kiếm không tồn tại hoặc bị di chuyển.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Quay về trang chủ
        </Link>
      </motion.div>
    </div>
  );
}