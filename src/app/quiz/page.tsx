'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useQuiz } from '@/contexts/quiz-context';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const {
        questions,
        currentQuestionIndex,
        score,
        timeLeft,
        isFinished,
        userAnswers,
        loading,
        startQuiz,
        submitAnswer,
        resumeQuiz,
    } = useQuiz();

    useEffect(() => {
        if (!user) {
            router.push('/auth/sign-in');
        }
    }, [user, router]);

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            resumeQuiz();
        }
    }, [resumeQuiz]);

    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            const currentQuestion = questions[currentQuestionIndex];
            const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [currentQuestionIndex, questions]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">Loading questions...</div>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Welcome to the Quiz!</h1>
                    <p className="text-gray-600">You have 10 minutes to complete 10 questions.</p>
                    <Button onClick={startQuiz}>Start Quiz</Button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const incorrectAnswers = userAnswers.length - score;
        const unanswered = questions.length - userAnswers.length;

        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6">
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
                    <Button onClick={startQuiz} className="w-full">Try Again</Button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full space-y-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-gray-600">
                        Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="text-sm text-gray-500">{currentQuestion.category}</div>
                    <h3 className="text-xl font-semibold"
                        dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

                    <div className="space-y-3">
                        {shuffledAnswers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => submitAnswer(answer)}
                                className="w-full p-4 text-left border rounded-md hover:bg-gray-50
                                transition-colors duration-200 focus:outline-noneactive:outline-none"
                                dangerouslySetInnerHTML={{__html: answer}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}