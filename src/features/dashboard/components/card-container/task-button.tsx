import { Button } from '@components/ui/button';
import React from 'react';

export const TaskButton = ({
    taskID,
    title,
    time,
}: {
    taskID: string;
    title: string;
    time: string;
}) => {
    return (
        <Button
            variant="outline"
            className="h-14 w-[350px] text-xs text-neutral-500"
        >
            <div className="mr-4 w-12 text-xs">{taskID}</div>
            <span className="mx-2 truncate text-sm font-semibold dark:text-white">
                {title}
            </span>
            <span className="ml-auto text-xs">{time}</span>
        </Button>
    );
};
