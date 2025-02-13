/* eslint-disable max-len */
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BACKEND_URL } from '@/config/constants/strings.global';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Position, toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@components/ui/button';
import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_IN,
    SIGN_IN_VALIDATOR,
} from '../../assets/strings';
import OTPVerification from '../otp-verification';

const defaultToastOptions = {
    style: { border: '1px solid #ccc' },
    position: 'top-right' as Position,
    duration: 3000,
};

const formSchema = z.object({
    email: z.string({ required_error: SIGN_IN_VALIDATOR.ACCOUNT }),
    password: z
        .string({ required_error: PASSWORD_INPUT_VALIDATOR.REQUIRED })
        .min(6, { message: PASSWORD_INPUT_VALIDATOR.SHORT })
        .max(50, { message: PASSWORD_INPUT_VALIDATOR.LONG }),
    remember: z.boolean().default(false).optional(),
});

function Loginform() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const hasSentOTP = useRef(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '', remember: false },
    });

    interface LoginFormValues {
        email: string;
        password: string;
        remember: boolean;
    }

    interface ToastOptions {
        style: { border: string };
        position: Position;
        duration: number;
        description?: string;
        action?: {
            label: string;
            onClick: () => void;
        };
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if email or password fields are empty
        if (!email.trim() || !password.trim()) {
            toast('Error', {
                ...defaultToastOptions,
                description: 'Both email and password are required',
            } as ToastOptions);
            return;
        }
        setSpinning(true);
        try {
            await axios.post(`${BACKEND_URL}/auth/signIn/email`, {
                email,
                password,
            } as LoginFormValues);
            toast('Success', {
                ...defaultToastOptions,
                description: 'Successfully signed in',
                action: {
                    label: 'Close',
                    onClick: () => { },
                },
            } as ToastOptions);
        } catch (error: any) {
            console.error(error);
            toast('Error', {
                ...defaultToastOptions,
                description: error.response?.data?.error || 'An error occurred',
            } as ToastOptions);
        }
        setSpinning(false);
    };

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const startCooldown = () => setCooldown(60);
    const onSubmit = async (data: LoginFormValues) => {
        // Check if email or password fields are empty
        if (!email.trim() || !password.trim()) {
            toast('Error', {
                ...defaultToastOptions,
                description: 'Both email and password are required',
            } as ToastOptions);
            return;
        }
        setSpinning(true);
        try {
            await axios.post(`${BACKEND_URL}/auth/signIn/email`, {
                email,
                password,
            } as LoginFormValues);
            toast('Success', {
                ...defaultToastOptions,
                description: 'Successfully signed in',
                action: {
                    label: 'Close',
                    onClick: () => { },
                },
            } as ToastOptions);
        } catch (error: any) {
            console.error(error);
            toast('Error', {
                ...defaultToastOptions,
                description: error.response?.data?.error || 'An error occurred',
            } as ToastOptions);
        }
        setSpinning(false);
    };
    const onError = (error: Record<string, unknown>): void => console.log(error);

    const handleOTPVerificationComplete = () => {
        setShowOTPVerification(false);
        navigate('/dashboard');
    };

    const handleOTPVerificationClose = () => {
        setShowOTPVerification(false);
        setSpinning(false);
    };

    return (
        <>
            <div className="flex flex-col gap-3 space-y-2 text-center">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {SIGN_IN.TITLE}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {SIGN_IN.DES}
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="flex flex-col gap-3"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Account Email"
                                            autoComplete="email"
                                            onChangeCapture={e =>
                                                setEmail(e.currentTarget.value)
                                            }
                                            className="border border-black/20 focus:border-transparent"
                            onClick={() => form.handleSubmit(onSubmit, onError)()}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            onChangeCapture={e =>
                                                setPassword(
                                                    e.currentTarget.value
                                                )
                                            }
                                            className="border border-black/30 focus:border-transparent"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="inline-flex h-8 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200"
                            disabled={spinning}
                        >
                            {spinning ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Please wait...</span>
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                            <FormField
                                control={form.control}
                                name="remember"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormLabel className="text-sm font-medium">
                                            Remember me
                                        </FormLabel>
                                        <FormItem>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <button
                            type="button"
                            className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                </Form>
                {showOTPVerification && (
                    <OTPVerification
                        email={email}
                        onComplete={handleOTPVerificationComplete}
                        onClose={handleOTPVerificationClose}
                        cooldown={cooldown}
                        startCooldown={startCooldown}
                        hasSentOTP={hasSentOTP}
                    />
                )}
            </div>
        </>
    );
}

export default Loginform;
