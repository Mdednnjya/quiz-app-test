'use client';

import { useAuth } from "@/contexts/auth-context";
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-bold text-primary">
                        QuizApp
                    </Link>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                <span className="text-gray-700">
                  Hello, {user.email?.split('@')[0]}
                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/sign-in"
                                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};