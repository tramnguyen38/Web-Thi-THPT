import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Đợi chút nhé ^^</p>
      </motion.div>
    </div>
  );
}