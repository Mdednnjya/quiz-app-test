"use client"
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Clock, Award, BookOpen } from 'lucide-react';

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();

    if (user) {
        return (
            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-20">
                    <div className="text-center space-y-8">
                        <h1 className="text-5xl font-bold">
                            Ready to Challenge Yourself?
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Welcome back! Put your knowledge to the test with our diverse range of quizzes.
                            Track your progress and compete with others.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                            <div className="p-6 bg-white rounded-lg shadow-sm border">
                                <Clock className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-lg">Timed Challenges</h3>
                                <p className="text-gray-600 mt-2">Race against the clock to test your speed</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-sm border">
                                <Target className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-lg">Track Progress</h3>
                                <p className="text-gray-600 mt-2">Monitor your improvement over time</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-sm border">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-semibold text-lg">Earn Points</h3>
                                <p className="text-gray-600 mt-2">Collect points for each correct answer</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={() => router.push('/quiz')}
                            >
                                Start New Quiz
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold leading-tight">
                            &quot;Unlock Your Learning Potential&quot;
                        </h1>
                        <p className="text-xl text-gray-600">
                            Create and deliver engaging quizzes that meet the needs of every learner.
                            Join thousands of teachers who are transforming education.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <BookOpen className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Diverse Question Types</h3>
                                    <p className="text-gray-600">Multiple choice, true/false, and more</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Timed Assessments</h3>
                                    <p className="text-gray-600">Keep learners engaged with time limits</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Target className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Progress Tracking</h3>
                                    <p className="text-gray-600">Monitor performance and improvement</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/auth/sign-up')}
                            >
                                Create Account
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-lg transform rotate-6 opacity-20"></div>
                            <div className="relative bg-white p-8 rounded-lg shadow-lg">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold">Quick Stats</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-primary/5 rounded-lg">
                                            <div className="text-3xl font-bold text-primary">1000+</div>
                                            <div className="text-sm text-gray-600">Active Users</div>
                                        </div>
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <div className="text-3xl font-bold text-blue-600">5000+</div>
                                            <div className="text-sm text-gray-600">Quizzes Created</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}