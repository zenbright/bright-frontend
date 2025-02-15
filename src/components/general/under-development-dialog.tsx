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
import { BRIGHT_EMAIL } from '../../config/constants/strings.global';

interface UnderDevDialogProps {
    isOpen?: boolean;
    setIsOpen: (open: boolean) => void;
}

export function UnderDevDialog({ isOpen = false, setIsOpen }: UnderDevDialogProps) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">
                        Coming soon!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This feature is under development and not yet available
                        for use. We&apos;ll let you know when it&apos;s ready!
                    </AlertDialogDescription>
                    <AlertDialogDescription className="flex">
                        Contact us at:
                        <span className="ml-2 font-bold hover:cursor-pointer">
                            {BRIGHT_EMAIL}
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Close
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
