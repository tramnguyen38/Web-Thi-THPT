import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block p-4 bg-red-100 rounded-full"
        >
          <AlertCircle className="w-16 h-16 text-red-600" />
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-900 mt-6">Oops! Có lỗi</h1>
        <p className="text-gray-600 mt-2 mb-8">
          {error.statusText || error.message || "An unexpected error occurred"}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Quay về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
