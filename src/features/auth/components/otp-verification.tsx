import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSendOTPMutation, useVerifyOTPMutation } from '../utils/otpApi';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface OTPVerificationProps {
    email: string;
    onComplete: () => void;
    onClose: () => void;
    cooldown: number;
    startCooldown: () => void;
    hasSentOTP: { current: boolean };
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
    email,
    onComplete,
    onClose,
    cooldown,
    startCooldown,
    hasSentOTP,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [sendOTP] = useSendOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    useEffect(() => {
        const sendOTPRequest = async () => {
            if (hasSentOTP.current) return;
            hasSentOTP.current = true;

            try {
                await sendOTP({ email });
                startCooldown();
            } catch (error) {
                return;
            }
        };

        sendOTPRequest();
    }, [email, sendOTP, startCooldown, hasSentOTP]);

    const handleResendOTP = async () => {
        try {
            await sendOTP({ email });
            startCooldown();
        } catch (error) {
            return;
        }
    };

    const onSubmit: SubmitHandler<FormSchemaType> = async data => {
        try {
            const response = await verifyOTP({ email, userTypedOTP: data.pin });
            if (response.error) {
                toast.error('Failed to verify OTP', {
                    description: 'Please try again.',
                });
                return;
            }

            toast.success('OTP verified successfully', {
                description: 'You have successfully verified your OTP.',
            });
            setIsOpen(false);
            onComplete();
        } catch (error) {
            toast.error('Failed to verify OTP', {
                description: 'Please try again.',
            });
        }
    };

    const handleChange = (value: string) => {
        form.setValue('pin', value);
        if (value.length === 6) {
            form.handleSubmit(onSubmit)();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>OTP Verification</DialogTitle>
                    <DialogDescription>
                        Please enter your verification code to continue.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex w-full flex-col items-center justify-center gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={6}
                                                {...field}
                                                onChange={handleChange}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <div className="mt-4 flex justify-center">
                        <Button
                            variant="link"
                            onClick={handleResendOTP}
                            disabled={cooldown > 0}
                        >
                            {cooldown > 0
                                ? `Resend OTP in ${cooldown}s`
                                : 'Resend OTP'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OTPVerification;
