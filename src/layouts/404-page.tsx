import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Notfoundpage() {
    const isUserAuthenticated = useSelector(
        (state: any) => state.userLoginStatus.token
    );

    const navigate = useNavigate();

    const handleHomeClick = () => {
        if (isUserAuthenticated) {
            return navigate('/user/dashboard');
        }
        navigate('/');
    };

    return (
        <div className="bg-not_found_background w-full">
            <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-12">
                <div className="mx-auto flex max-w-lg flex-col items-center text-center">
                    <p className="text-foreground mb-4 rounded-full bg-transparent p-3 text-sm dark:bg-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-20 w-20"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </p>

                    <p className="text-primary-600 dark:text-primary-500 mb-2 text-4xl font-bold tracking-tight lg:text-4xl">
                        {'404 Not found'}
                    </p>

                    <p className="mt-4 font-semibold text-gray-500/70 dark:text-gray-400">
                        {
                            'We searched high and low, but couldn’t find what you’re looking for. Let’s find a better place for you to go.'
                        }
                    </p>

                    <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
                        <Button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="mr-2 h-5 w-5 rtl:rotate-180"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>
                            <span>Go back</span>
                        </Button>
                        <Button variant="link" onClick={handleHomeClick}>
                            Take me home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
