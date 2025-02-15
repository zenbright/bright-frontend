import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface ConfirmationDialogProps {
    Trigger: React.ComponentType<{ onClick: () => void }>;
    title?: string;
    des?: string;
}

export function ConfirmationDialog({ Trigger, title = '', des = '' }: ConfirmationDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
                <Trigger onClick={() => setIsOpen(true)} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{des}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
