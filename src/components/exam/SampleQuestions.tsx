import { motion } from "framer-motion";
import { IQuestion } from "../../types/question-type";

interface SampleQuestionsProps {
  questions?: IQuestion[];
}

export default function SampleQuestions({ questions }: SampleQuestionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Sample Questions</h2>
      <div className="space-y-4 sm:space-y-6">
        {questions?.map((question, index) => (
          <motion.div
            key={question._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 sm:p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">
              {index + 1}. {question.question}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="p-2 sm:p-3 bg-white rounded-lg border border-gray-200 text-sm sm:text-base"
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
        These are sample questions to help you understand the exam format. The actual exam will
        contain different questions.
      </p>
    </div>
  );
}
