import { Button } from '@components/ui/button';
import React from 'react';

export interface NotificationItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    sentAt: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
    icon,
    title,
    description,
    sentAt,
}) => {
    return (
        <Button
            className="m-0 flex w-full items-center rounded-none p-4 py-8 text-left"
            variant="ghost"
        >
            <div className="flex w-full gap-2">
                <div className="bg-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
                    {icon}
                </div>
                <div className="w-full truncate">
                    <div className="flex items-center justify-between gap-4">
                        <p className="truncate text-sm font-semibold">
                            {title}
                        </p>
                        <p className="text-xs text-neutral-300">{sentAt}</p>
                    </div>
                    <p className="truncate text-xs text-neutral-400">
                        {description}
                    </p>
                </div>
            </div>
        </Button>
    );
};
