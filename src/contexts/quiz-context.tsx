"use client"
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Question, QuizContextType } from "@/app/types";
import { useAuth } from '@/contexts/auth-context';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const getStorageKey = useCallback(() => {
        return user ? `quizState_${user.uid}` : null;
    }, [user]);

    useEffect(() => {
        const storageKey = getStorageKey();
        if (storageKey) {
            const savedQuizState = localStorage.getItem(storageKey);
            if (savedQuizState) {
                const state = JSON.parse(savedQuizState);
                setQuestions(state.questions || []);
                setCurrentQuestionIndex(state.currentQuestionIndex || 0);
                setScore(state.score || 0);
                setTimeLeft(state.timeLeft || 600);
                setUserAnswers(state.userAnswers || []);
                setIsActive(true);
            }
        }
    }, [getStorageKey]);

    const saveState = useCallback(() => {
        const storageKey = getStorageKey();
        if (storageKey && questions.length > 0) {
            const state = {
                questions,
                currentQuestionIndex,
                score,
                timeLeft,
                userAnswers,
            };
            localStorage.setItem(storageKey, JSON.stringify(state));
        }
    }, [questions, currentQuestionIndex, score, timeLeft, userAnswers, getStorageKey]);

    useEffect(() => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(600);
        setIsFinished(false);
        setUserAnswers([]);
        setIsActive(false);
    }, [user?.uid]);

    useEffect(() => {
        if (isActive) {
            saveState();
        }
    }, [isActive, saveState]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (!isFinished && questions.length > 0 && timeLeft > 0 && isActive) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsFinished(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isFinished, questions.length, isActive]);

    const startQuiz = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10');
            const data = await response.json();
            setQuestions(data.results);
            setCurrentQuestionIndex(0);
            setScore(0);
            setTimeLeft(600);
            setIsFinished(false);
            setUserAnswers([]);
            setIsActive(true);

            const storageKey = getStorageKey();
            if (storageKey) {
                localStorage.removeItem(storageKey);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    }, [getStorageKey]);

    const submitAnswer = useCallback((answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correct_answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        setUserAnswers((prev) => [...prev, answer]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setIsFinished(true);
            setIsActive(false);
            const storageKey = getStorageKey();
            if (storageKey) {
                localStorage.removeItem(storageKey);
            }
        }
    }, [questions, currentQuestionIndex, getStorageKey]);

    const resumeQuiz = useCallback(() => {
        const storageKey = getStorageKey();
        if (storageKey) {
            const savedState = localStorage.getItem(storageKey);
            if (savedState) {
                const state = JSON.parse(savedState);
                setQuestions(state.questions || []);
                setCurrentQuestionIndex(state.currentQuestionIndex || 0);
                setScore(state.score || 0);
                setTimeLeft(state.timeLeft || 600);
                setUserAnswers(state.userAnswers || []);
                setIsActive(true);
            }
        }
    }, [getStorageKey]);

    const value = {
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
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};