"use client"
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Welcome to Quiz App</h1>
                <p className="text-lg text-gray-600">Challenge yourself with our interactive quiz!</p>
                <Button
                    onClick={() => router.push(user ? '/quiz' : '/auth/sign-in')}
                    className="px-8 py-2"
                >
                    {user ? 'Start Quiz' : 'Sign in to Start'}
                </Button>
            </div>
        </div>
    );
}