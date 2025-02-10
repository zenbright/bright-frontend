import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BACKEND_URL } from '@/config/constants/strings.global';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import {
    PASSWORD_INPUT_VALIDATOR,
    SIGN_UP,
    SIGN_UP_VALIDATOR,
} from '../../assets/strings';
import { BirthdayPicker } from '../birthday-picker';

const defaultToastOptions = {
    style: { border: '1px solid #ccc' },
    position: 'top-right',
    duration: 3000,
};

const formSchema = z
    .object({
        firstname: z.string({
            required_error: SIGN_UP_VALIDATOR.NAME_REQUIRED,
        }),
        lastname: z.string({ required_error: SIGN_UP_VALIDATOR.NAME_REQUIRED }),
        email: z.string({ required_error: SIGN_UP_VALIDATOR.EMAIL }),
        password: z
            .string({ required_error: PASSWORD_INPUT_VALIDATOR.REQUIRED })
            .min(6, { message: PASSWORD_INPUT_VALIDATOR.SHORT })
            .max(50, { message: PASSWORD_INPUT_VALIDATOR.LONG }),
        confirm_password: z.string({
            required_error: PASSWORD_INPUT_VALIDATOR.RE_CONFIRM,
        }),
        dob: z.date().optional(),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'New password and confirm password must match',
        path: ['confirm_password'],
    });

function Signupform({ onSignUpComplete }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [remainingTime, setRemainingTime] = useState(5000);
    const [email, setEmail] = useState('');

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
            dob: null,
        },
    });

    const handleSignUp = async data => {
        setLoading(true);
        try {
            const body = {
                email: data.email,
                password: data.password,
                fullname: `${data.firstname} ${data.lastname}`,
                dob: new Date(data.dob).toISOString().slice(0, 10),
            };

            // Update: use axios to post the signup request similar to login form
            await axios.post(`${BACKEND_URL}/auth/signUp/email`, body);

            toast.success('Signup successful', {
                ...defaultToastOptions,
                description: 'Your account has been created successfully.',
            });

            setEmail(data.email);
            setShowVerificationPopup(true);
            setRemainingTime(5000);
        } catch (error) {
            toast.error('Signup failed', {
                ...defaultToastOptions,
                description:
                    error.response?.data?.error ||
                    'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer;
        if (showVerificationPopup) {
            timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 50) {
                        clearInterval(timer);
                        navigate('/auth');
                        setShowVerificationPopup(false);
                        window.location.reload();
                        return 0;
                    }
                    return prev - 50;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [showVerificationPopup, navigate]);

    const onError = errors => {
        console.log(errors);
    };

    const handleRedirect = () => {
        navigate('/auth'), setShowVerificationPopup(false);
        window.location.reload();
    };

    return (
        <div className="flex flex-col space-y-2 text-center">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {SIGN_UP.TITLE}
                </h1>
                <p className="text-muted-foreground text-sm">{SIGN_UP.DES}</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSignUp, onError)}
                    className="space-y-2"
                >
                    <div className="flex-cols-2 flex gap-2">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={'First Name'}
                                            className="border-auth_form_border border focus:border-transparent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {
                                            form.formState.errors.firstname
                                                ?.message
                                        }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={'Last Name'}
                                            className="border-auth_form_border border focus:border-transparent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {
                                            form.formState.errors.lastname
                                                ?.message
                                        }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>

                    <BirthdayPicker
                        date={form.watch('dob')}
                        setDate={date => form.setValue('dob', date)}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={'Account Email'}
                                        autoComplete={'email'}
                                        className="border-auth_form_border border focus:border-transparent"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.email?.message}
                                </FormMessage>
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
                                        placeholder={'Password'}
                                        autoComplete={'new-password'}
                                        className="border-auth_form_border border focus:border-transparent"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.password?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={'Confirm your Password'}
                                        className="border-auth_form_border border focus:border-transparent"
                                        autoComplete={'confirm-password'}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {
                                        form.formState.errors.confirm_password
                                            ?.message
                                    }
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        className="inline-flex h-9 w-full items-center rounded border border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-300"
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                        )}
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>

            {showVerificationPopup && (
                <Dialog open onOpenChange={setShowVerificationPopup}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Email Verification</DialogTitle>
                            <DialogDescription>
                                An email has been sent to{' '}
                                <strong>{email}</strong>. Please follow the
                                instruction in the email to verify your account.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                onClick={handleRedirect}
                                style={{
                                    background:
                                        remainingTime > 0
                                            ? `linear-gradient(to right, #000000 0%, #000000 ${(remainingTime / 5000) * 100}%, #808080 ${(remainingTime / 5000) * 100}%, #808080 100%)`
                                            : '#808080',
                                }}
                            >
                                Redirect in {Math.ceil(remainingTime / 1000)}s
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

Signupform.propTypes = {
    onSignUpComplete: PropTypes.func.isRequired,
};

export default Signupform;
