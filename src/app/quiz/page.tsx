'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useQuiz } from '@/contexts/quiz-context';
import { QuizLoading } from "@/components/quiz/quiz-loading";
import { QuizWelcome } from "@/components/quiz/quiz-welcome";
import { QuizQuestion} from "@/components/quiz/quiz-question";
import { QuizResults} from "@/components/quiz/quiz-results";

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
        const savedState = localStorage.getItem(`quizState_${user?.uid}`);
        if (savedState) {
            resumeQuiz();
        }
    }, [resumeQuiz, user]);

    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            const currentQuestion = questions[currentQuestionIndex];
            const answers = [
                ...currentQuestion.incorrect_answers,
                currentQuestion.correct_answer
            ];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [currentQuestionIndex, questions]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isFinished && questions.length > 0) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isFinished, questions.length]);

    if (loading) {
        return <QuizLoading />;
    }

    if (!questions.length) {
        return <QuizWelcome onStart={startQuiz} />;
    }

    if (isFinished) {
        return (
            <QuizResults
                score={score}
                incorrectAnswers={userAnswers.length - score}
                unanswered={questions.length - userAnswers.length}
                onTryAgain={startQuiz}
            />
        );
    }

    return (
        <QuizQuestion
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            question={questions[currentQuestionIndex]}
            shuffledAnswers={shuffledAnswers}
            onAnswerSubmit={submitAnswer}
        />
    );
}