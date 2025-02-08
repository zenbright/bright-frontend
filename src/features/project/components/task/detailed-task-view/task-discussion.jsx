import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { TaskActivity } from '../../../utils/class';
import { timeAgo } from '../../../utils/utils';

// Sample instances array
const sampleActivities = [
    new TaskActivity(
        1,
        'Alice',
        'comment',
        '2023-06-17T09:00:00Z',
        'This task needs to be done by the end of the week.'
    ),
    new TaskActivity(
        2,
        'Bob',
        'update',
        '2023-06-17T09:00:00Z',
        null,
        'In Progress'
    ),
    new TaskActivity(
        3,
        'Charlie',
        'assign',
        '2023-06-17T09:00:00Z',
        null,
        'Alice'
    ),
    new TaskActivity(
        4,
        'Eve',
        'comment',
        '2023-06-17T09:00:00Z',
        'I can help with this task.'
    ),
    new TaskActivity(
        5,
        'Alice',
        'update',
        '2023-06-17T09:00:00Z',
        null,
        'Completed'
    ),
];

const TaskActivityComponent = ({
    activity,
    isLastItem,
    isEditCommentContent,
    setIsEditCommentContent,
    setDeleteCommentIndex,
}) => {
    const isComment =
        activity.comment !== null && activity.comment !== undefined;
    const [editedComment, setEditedComment] = useState(activity.comment);

    useEffect(() => {
        if (!editedComment) {
            setEditedComment(activity.comment);
        }

        if (isEditCommentContent) {
            setEditedComment(activity.comment);
        }
    }, [isEditCommentContent]);

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            setIsEditCommentContent(false);
        }
    };

    return (
        <ol className="relative border-gray-200 pr-3 dark:border-gray-700">
            <li className={`${isLastItem ? '' : 'mb-8'} ms-6`}>
                <span className="absolute -start-3 z-50 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-background">
                    <img
                        className="rounded-full shadow-lg"
                        src="https://github.com/shadcn.png"
                        alt={isComment ? 'Thomas Lean image' : 'Bonnie image'}
                    />
                </span>
                <div className="bg-discussion-background flex flex-col rounded-lg border border-discussion_border p-4 shadow-xs">
                    <div
                        className={`items-center justify-between ${isComment ? 'mb-3' : ''} sm:flex`}
                    >
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                            {timeAgo(activity.createdAt)}
                        </time>
                        <div className="gap-1 text-left text-sm font-normal text-gray-500 dark:text-gray-300">
                            <span className="font-bold">{activity.author}</span>{' '}
                            {activity.subtitle}{' '}
                            <span className="italic">
                                {activity.target ? activity.target : ''}
                            </span>
                        </div>
                    </div>

                    {/* Comment Content */}
                    {isComment && (
                        <div>
                            {isEditCommentContent ? (
                                <Input
                                    type="text"
                                    value={editedComment}
                                    onChange={e =>
                                        setEditedComment(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    className="text-xs font-normal"
                                    autoFocus
                                />
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="justify-between rounded-lg border border-gray-200 bg-comment_background p-3 text-xs font-normal italic text-comment_text hover:cursor-pointer hover:bg-comment_hover">
                                            {editedComment}
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setIsEditCommentContent(
                                                        true
                                                    )
                                                }
                                            >
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDeleteCommentIndex(
                                                        activity.id
                                                    );
                                                }}
                                            >
                                                <span className="text-rose-500">
                                                    Delete
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    )}
                </div>
            </li>
        </ol>
    );
};

export const TaskDiscussion = ({ isReload, onReloadTrigger }) => {
    const [comment, setComment] = useState('');
    const [activities, setActivities] = useState(sampleActivities);
    const activitySectionRef = useRef(null);
    const [isEditCommentContent, setIsEditCommentContent] = useState(false);
    const [deletedCommentIndex, setDeleteCommentIndex] = useState(null);
    const [maxHeight, setMaxHeight] = useState(window.innerHeight);
    const currentTheme = useSelector(state => state.currentTheme.value);
    const [scrollbarTheme, setScrollbarTheme] = useState(
        currentTheme === 'dark-default' ? 'os-theme-light' : 'os-theme-dark'
    );

    useEffect(() => {
        const theme =
            currentTheme === 'dark-default'
                ? 'os-theme-light'
                : 'os-theme-dark';
        setScrollbarTheme(theme);
    }, [currentTheme]);

    useEffect(() => {
        if (deletedCommentIndex === null) {
            return;
        }

        const newActivities = activities.filter(
            activity => activity.id !== deletedCommentIndex
        );

        setActivities(newActivities);
        setDeleteCommentIndex(null);
    }, [deletedCommentIndex]);

    const onCommentSubmit = () => {
        setActivities([
            ...activities,
            new TaskActivity(
                uuidv4(),
                'Quoc Doan',
                'comment',
                new Date(),
                comment
            ),
        ]);

        setComment('');
    };

    useEffect(() => {
        if (!activitySectionRef.current) {
            return;
        }

        const { viewport } = activitySectionRef.current.osInstance().elements();

        // scroll to bottom
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    }, [activities]);

    // Calculate remaining height
    useEffect(() => {
        const updateMaxHeight = () => {
            const activitySectionElement =
                document.getElementById('activity-section');
            if (activitySectionElement) {
                const rect = activitySectionElement.getBoundingClientRect();
                const remainingHeight = window.innerHeight - rect.top;
                setMaxHeight(remainingHeight);
            }
        };

        updateMaxHeight();

        window.addEventListener('resize', updateMaxHeight);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);

    // Calculate remaining height
    useEffect(() => {
        const updateMaxHeight = () => {
            const activitySectionElement =
                document.getElementById('activity-section');
            if (activitySectionElement) {
                const rect = activitySectionElement.getBoundingClientRect();
                const remainingHeight = window.innerHeight - rect.top;
                setMaxHeight(remainingHeight);
            }
        };

        updateMaxHeight();

        window.addEventListener('resize', updateMaxHeight);

        onReloadTrigger(false);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, [isReload]);

    return (
        <div className="flex h-full flex-col justify-between">
            <div className={`z-0 mb-3 flex items-center space-x-2`}>
                <Input
                    type="text"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            onCommentSubmit();
                        }
                    }}
                />

                <Button onClick={onCommentSubmit}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>

            <OverlayScrollbarsComponent
                element="div"
                id="activity-section"
                ref={activitySectionRef}
                options={{
                    scrollbars: { autoHide: 'move', theme: scrollbarTheme },
                }}
                style={{ maxHeight: `${maxHeight}px` }}
            >
                <div className="relative mb-3 overflow-y-auto pl-3">
                    <div className="absolute left-3 h-full border-s" />
                    {activities.map((activity, index) => (
                        <TaskActivityComponent
                            key={activity.id}
                            activity={activity}
                            isLastItem={index === activities.length - 1}
                            isEditCommentContent={isEditCommentContent}
                            setIsEditCommentContent={setIsEditCommentContent}
                            setDeleteCommentIndex={setDeleteCommentIndex}
                        />
                    ))}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
};
