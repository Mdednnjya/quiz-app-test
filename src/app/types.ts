import {ReactNode} from "react";

export interface AuthCardProps {
    children: ReactNode;
    title: string;
}

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizContextType {
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    timeLeft: number;
    isFinished: boolean;
    userAnswers: string[];
    loading: boolean;
    startQuiz: () => void;
    submitAnswer: (answer: string) => void;
    resumeQuiz: () => void;
}