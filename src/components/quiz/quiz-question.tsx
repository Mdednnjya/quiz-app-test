import { motion, AnimatePresence } from 'framer-motion';
import {QuizQuestionProps} from "@/app/types";

export const QuizQuestion = ({
    currentQuestionIndex,
    totalQuestions,
    timeLeft,
    question,
    shuffledAnswers,
    onAnswerSubmit,
    }: QuizQuestionProps) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full space-y-6"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1} of {totalQuestions}
                        </span>
                        <span className="text-sm text-gray-600">
                            Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="text-sm text-gray-500">{question.category}</div>
                        <h3
                            className="text-xl font-semibold"
                            dangerouslySetInnerHTML={{ __html: question.question }}
                        />

                        <div className="space-y-3">
                            {shuffledAnswers.map((answer, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.15, delay: index * 0.05 }}
                                    onClick={() => onAnswerSubmit(answer)}
                                    className="w-full p-4 text-left border rounded-md hover:bg-gray-50
                                             transition-colors duration-200 active:outline-none"
                                    dangerouslySetInnerHTML={{ __html: answer }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};