import React from 'react';
import { Clock, AlertCircle, XCircle, CheckCircle } from 'lucide-react';

export default function ExamRules() {
  const rules = [
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      title: 'Giới hạn Thời gian',
      description: 'Khi đã bắt đầu, bộ đếm thời gian của bài kiểm tra không thể tạm dừng hoặc kéo dài.'
    },
    {
      icon: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />,
      title: 'Không Quay Lại',
      description: 'Các câu hỏi phải được trả lời theo thứ tự. Bạn không thể quay lại các câu hỏi trước đó.'
    },
    {
      icon: <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />,
      title: 'Hạn chế Trình duyệt',
      description: 'Rời khỏi cửa sổ bài kiểm tra hoặc làm mới trang có thể làm vô hiệu hóa lần thử của bạn.'
    },
    {
      icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />,
      title: 'Kết quả',
      description: 'Điểm số của bạn sẽ được hiển thị ngay sau khi hoàn thành.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quy tắc Bài kiểm tra</h2>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {rules.map((rule, index) => (
          <div key={index} className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">{rule.icon}</div>
            <div>
              <h3 className="font-medium text-sm sm:text-base mb-1">{rule.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}