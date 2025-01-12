import { Button } from '@/components/ui/button';
import {QuizWelcomeProps} from "@/app/types";

export const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Welcome to the Quiz!</h1>
                <p className="text-gray-600">You have 10 minutes to complete 10 questions.</p>
                <Button onClick={onStart}>Start Quiz</Button>
            </div>
        </div>
    );
};