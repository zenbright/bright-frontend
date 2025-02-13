import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { differenceInDays } from 'date-fns';
import {
    Calendar,
    Flag,
    List,
    MoreHorizontal,
    Paperclip,
    UserRoundPlus,
} from 'lucide-react';
import React, { useRef, useLayoutEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

import Divider from '../../../../components/general/divider';
import { Task } from '../../utils/class';
import { DetailedTaskView } from '@features/project/components/task/detailed-task-view';
import IconButton from './icon-button';

interface TaskContainerProps {
    task: Task;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isShowTaskDetailed, setIsShowTaskDetailed] = useState(false);
    const [remainingDateText, setRemainingDateText] = useState('');

    // Calculate current task size
    useLayoutEffect(() => {
        if (ref.current) {
            const newWidth = ref.current.offsetWidth;
            const newHeight = ref.current.offsetHeight;
            setDimensions({ width: newWidth, height: newHeight });

            // Prevent value reset
            sessionStorage.setItem(
                'taskDimensions',
                JSON.stringify({ width: newWidth, height: newHeight })
            );
        }
    }, [task]);

    // Fetch size on first load
    useLayoutEffect(() => {
        // Retrieve dimensions from local storage when the component mounts
        const storedDimensions = sessionStorage.getItem('taskDimensions');
        if (storedDimensions) {
            const { width, height } = JSON.parse(storedDimensions);
            setDimensions({ width, height });
        }
        // Calculate due date
        if (task.endDate) {
            const endDate = new Date(task.endDate);
            const today = new Date();

            const differenceDays = differenceInDays(endDate, today);

            const remainingDateText =
                differenceDays > 0
                    ? `${differenceDays} days left`
                    : differenceDays == 0
                        ? 'Today'
                        : `${Math.abs(differenceDays)} days ago`;

            setRemainingDateText(remainingDateText);
        }
    }, []);

    // Handle drag n drop
    const {
        setNodeRef,
        attributes,
        transform,
        transition,
        listeners,
        isDragging,
    } = useSortable({
        id: task.id,
        data: { type: 'Task', task },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // Drag item placeholder
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    ...style,
                }}
                className="bg-card mb-1 rounded-md"
            />
        );
    }

    return (
        <div ref={ref}>
            {/* Task detailed view */}
            {isShowTaskDetailed && (
                <DetailedTaskView
                    isShowTaskDetailed={isShowTaskDetailed}
                    setIsShowTaskDetailed={setIsShowTaskDetailed}
                    task={task}
                />
            )}

            {/* Task Container */}
            <div
                ref={setNodeRef}
                style={style}
                className="bg-card text-foreground mb-1 rounded-lg border py-2"
                {...attributes}
                {...listeners}
            >
                <div
                    className="pr-1 pl-3"
                    onClick={() => setIsShowTaskDetailed(true)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            {task.tags &&
                                task.tags.slice(0, 2).map(tag => (
                                    <Badge
                                        key={tag.id}
                                        style={{
                                            backgroundColor: tinycolor(
                                                tag.color
                                            ).lighten(50).toString(),
                                            color: tinycolor(tag.color).toString(),
                                        }}
                                        className="h-6 rounded-md"
                                    >
                                        {tag.title}
                                    </Badge>
                                ))}

                            {task.tags.length > 2 && (
                                <Badge className="h-6 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200/80">
                                    + {task.tags.length - 2}
                                </Badge>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            onClick={e => e.stopPropagation()}
                            className="text-gray-500/60 hover:cursor-default hover:bg-transparent hover:text-gray-500/60"
                        >
                            <MoreHorizontal />
                        </Button>
                    </div>

                    <div>
                        {/* Task Contents */}
                        <div className="max-w-52 truncate text-lg font-semibold">
                            {task.title}
                        </div>

                        <div className="max-w-60 truncate text-sm">
                            {task.des}
                        </div>

                        <Divider
                            width="100%"
                            height="1px"
                            color="rgba(0,0,0,0.10)"
                        />

                        {/* Helper Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 text-sm">
                                {/* Todo Count Button */}
                                <IconButton
                                    icon={List}
                                    label={task.todos.length}
                                />

                                {/* Attachment Count Button */}
                                <IconButton
                                    icon={Paperclip}
                                    label={task.attachments.length}
                                />

                                {/* Add User Button */}
                                <IconButton
                                    icon={UserRoundPlus}
                                    onClick={e => e.stopPropagation()}
                                />

                                {task.endDate && (
                                    <IconButton
                                        icon={Calendar}
                                        label={remainingDateText}
                                    />
                                )}

                                {task.startDate && !task.endDate && (
                                    <IconButton
                                        icon={Calendar}
                                        label={String(task.startDate).slice(
                                            0,
                                            10
                                        )}
                                    />
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                                className="text-gray-500/60 hover:cursor-default hover:bg-transparent hover:text-gray-500/60"
                            >
                                <Flag className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
