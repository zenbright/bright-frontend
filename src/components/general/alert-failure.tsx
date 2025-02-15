import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FailureAlertProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    des: string;
}

export function FailureAlert({ open, setOpen, title, des }: FailureAlertProps): JSX.Element {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{des}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setOpen(false)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
