import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {QuizResultsProps} from "@/app/types";

export const QuizResults = ({ score, incorrectAnswers, unanswered, onTryAgain }: QuizResultsProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Quiz Results</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-md">
                        <p className="text-green-700">Correct Answers: {score}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-md">
                        <p className="text-red-700">Incorrect Answers: {incorrectAnswers}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-gray-700">Unanswered: {unanswered}</p>
                    </div>
                </div>
                <Button onClick={onTryAgain} className="w-full">Try Again</Button>
            </motion.div>
        </div>
    );
};