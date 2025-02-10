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
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSendOTPMutation, useVerifyOTPMutation } from '../utils/otpApi';

// Import the toast function from sonner

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

function OTPVerification({
    email,
    onComplete,
    onClose,
    cooldown,
    startCooldown,
    hasSentOTP,
}) {
    const [isOpen, setIsOpen] = useState(true); // State to manage dialog visibility
    const [sendOTP] = useSendOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    });

    useEffect(() => {
        const sendOTPRequest = async () => {
            if (hasSentOTP.current) return; // Check if OTP has already been sent
            hasSentOTP.current = true; // Mark OTP as sent

            try {
                await sendOTP({ email });
                startCooldown(); // Start cooldown after sending OTP
            } catch (error) {
                return;
            }
        };

        sendOTPRequest();
    }, [email, sendOTP, startCooldown, hasSentOTP]);

    const handleResendOTP = async () => {
        try {
            await sendOTP({ email });
            startCooldown(); // Restart cooldown after resending OTP
        } catch (error) {
            return;
        }
    };

    const onSubmit = async data => {
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
            onComplete(); // Call the onComplete callback
        } catch (error) {
            toast.error('Failed to verify OTP', {
                description: 'Please try again.',
            });
        }
    };

    const handleChange = value => {
        form.setValue('pin', value);
        if (value.length === 6) {
            form.handleSubmit(onSubmit)();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose(); // Call the onClose callback
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
}

OTPVerification.propTypes = {
    email: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    cooldown: PropTypes.number.isRequired,
    startCooldown: PropTypes.func.isRequired,
    hasSentOTP: PropTypes.object.isRequired,
};

export default OTPVerification;
