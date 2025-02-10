import logo from '@/assets/images/app-logo/logomini-light.svg';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { WEBSITE_NAME } from '../../../config/constants/strings.global';
import AuthBackground from '../assets/bgimg.png';
import { QUOTE, WEB_BRIEF_INTRO } from '../assets/strings';
import Loginform from './login/login-form';
import Signupform from './signup/signup-form';

export const Page = () => {
    const [isUserLogin, setIsUserLogin] = useState(true);

    const divStyle = {
        backgroundImage: `url(${AuthBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    const redirectGoogleOAuth = () => {
        window.open(
            'http://127.0.0.1:4000/bright-backend/api/auth/google',
            '_self'
        );
    };

    const redirectGitHubOAuth = () => {
        window.location.href =
            'https://github.com/login/oauth/authorize?client_id=ce0a3e8be7b81c84ee8d';
    };

    const handleToggleLoginState = () => {
        setIsUserLogin(true);
    };

    return (
        <div>
            {/* Side Background */}
            <div className="md:hidden">
                <div style={divStyle} alt="Authentication" className="block" />
            </div>

            <div className="relative container hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Button
                    href="/login"
                    className="absolute top-4 right-4 md:top-8 md:right-8"
                    onClick={() => setIsUserLogin(!isUserLogin)}
                >
                    {isUserLogin ? 'Create account' : 'Sign In'}
                </Button>

                {/* Side panel */}
                <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0" style={divStyle} />

                    <div className="relative z-20 flex items-center text-lg font-medium hover:cursor-pointer">
                        <NavLink to={'/'}>
                            <img
                                src={logo}
                                alt="logo"
                                className="w-40 object-contain"
                            />
                        </NavLink>
                    </div>

                    <div className="relative z-20 mt-auto">
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold">
                                {WEBSITE_NAME.toUpperCase()}
                            </h1>

                            <h1 className="text-lg">{WEB_BRIEF_INTRO}</h1>
                        </div>

                        <blockquote className="space-y-2">
                            <p className="text-xl italic">{`“${QUOTE.CONTENT}”`}</p>

                            <footer className="text-lg font-semibold">
                                {' '}
                                {QUOTE.BY}{' '}
                            </footer>
                        </blockquote>
                    </div>
                </div>

                {/* Auth Form */}
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {isUserLogin ? (
                            <Loginform />
                        ) : (
                            <Signupform
                                onSignUpComplete={handleToggleLoginState}
                            />
                        )}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background text-muted-foreground px-2">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Button
                                onClick={redirectGitHubOAuth}
                                className="flex h-8 items-center justify-center rounded border border-gray-400 bg-white px-5 py-2.5 font-medium text-black hover:bg-gray-300"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                {'Sign in with GitHub'}
                            </Button>

                            <Button
                                onClick={redirectGoogleOAuth}
                                className="flex h-8 items-center justify-center rounded border border-gray-400 bg-white px-5 py-2.5 font-medium text-black hover:bg-gray-300"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                {'Sign in with Google'}
                            </Button>
                        </div>

                        {/* Terms and cons */}
                        <p className="text-muted-foreground px-8 text-center text-sm">
                            {'By clicking continue, you agree to our '}
                            <a
                                href="/terms"
                                className="hover:text-primary underline underline-offset-4"
                            >
                                {'Terms of Service'}
                            </a>

                            {' and '}

                            <a
                                href="/privacy"
                                className="hover:text-primary underline underline-offset-4"
                            >
                                {'Privacy Policy.'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
