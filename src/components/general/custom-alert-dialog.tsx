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
} from '@components/ui/alert-dialog';
import React, { FC, ReactNode } from 'react';

interface PrivateAlertDialogProps {
    title: string;
    description: string;
    onAction: () => void;
    actionLabel?: string;
    cancelLabel?: string;
    trigger?: ReactNode; // Optional custom trigger
}

const CustomAlertDialog: FC<PrivateAlertDialogProps> = ({
    title,
    description,
    onAction,
    actionLabel = 'Continue',
    cancelLabel = 'Cancel',
    trigger,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <button className="h-8 rounded border border-gray-300 text-rose-400">
                        Default Trigger
                    </button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;
