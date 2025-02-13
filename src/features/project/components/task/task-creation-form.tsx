import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CreatableMultiSelectMenu } from '@/components/ui/creatable-multi-select-menu';
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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInDays, format } from 'date-fns';
import { CalendarPlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors, FieldValues, Control } from 'react-hook-form';
import { z } from 'zod';

import {
    END_DATE_INPUT_VALIDATOR,
    TAGS_INPUT_VALIDATOR,
    TASK_CREATION_DES,
    TITLE_DES_INPUT_VALIDATOR,
    TITLE_INPUT_VALIDATOR,
} from '../../assets/strings';
import { TaskTagCreationForm } from './task-tag-creation-form';
import { TaskTag } from '../../utils/class';

interface TaskCreationFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    createTask: (
        colId: string,
        title: string,
        description: string,
        startDate: Date,
        endDate?: Date,
        tags?: string[]
    ) => void;
    colId: string;
    isInEditView: boolean;
    taskToBeEditted?: {
        title: string;
        des: string;
        startDate: string;
        endDate?: string;
        tags: string[];
        createTags: (tags: string[]) => string[];
    };
}

const formSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(2, { message: TITLE_INPUT_VALIDATOR.SHORT })
            .max(50),
        description: z
            .string()
            .min(0, { message: TITLE_DES_INPUT_VALIDATOR.SHORT })
            .max(200, { message: TITLE_DES_INPUT_VALIDATOR.LONG }),
        startDate: z.date({
            required_error: 'A start date is required.',
        }),
        endDate: z.date().optional(),
        tags: z.array(z.string()).optional(),
    })
    .refine(
        data => {
            if (data.endDate !== undefined && data.endDate !== null) {
                return differenceInDays(data.endDate, data.startDate) >= 0;
            }
            return true;
        },
        { message: END_DATE_INPUT_VALIDATOR.ERROR }
    );

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({
    isOpen,
    onOpenChange,
    createTask,
    colId,
    isInEditView,
    taskToBeEditted,
}) => {
    const [endDateError, setEndDateError] = useState<string | null>(null);
    const [tagError, setTagError] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>(
        isInEditView && taskToBeEditted ? taskToBeEditted.tags.map(tag => tag.toString()) : []
    );
    const [newTagTitle, setNewTagTitle] = useState<string>('');
    const [isOpenTaskTagCreationForm, setIsOpenTaskTagCreationForm] =
        useState<boolean>(false);

    useEffect(() => {
        if (newTagTitle && newTagTitle !== '') {
            setIsOpenTaskTagCreationForm(true);
        }
    }, [newTagTitle]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: isInEditView && taskToBeEditted ? taskToBeEditted.title : '',
            description: isInEditView && taskToBeEditted ? taskToBeEditted.des : '',
            startDate: isInEditView && taskToBeEditted
                ? new Date(taskToBeEditted.startDate)
                : new Date(),
            endDate: isInEditView && taskToBeEditted && taskToBeEditted.endDate
                ? new Date(taskToBeEditted.endDate)
                : undefined,
        },
    });

    useEffect(() => {
        setTagError(null);
    }, [selectedTags]);

    const onSubmit: SubmitHandler<typeof formSchema._type> = values => {
        if (isInEditView && taskToBeEditted) {
            taskToBeEditted.title = values.title;
            taskToBeEditted.des = values.description;
            taskToBeEditted.startDate = values.startDate.toISOString();
            taskToBeEditted.endDate = values.endDate ? values.endDate.toISOString() : undefined;
            taskToBeEditted.tags = taskToBeEditted.createTags(selectedTags);

            onOpenChange(false);
            return;
        }

        if (selectedTags.length === 0) {
            setTagError(TAGS_INPUT_VALIDATOR.SHORT);
            return;
        }

        createTask(
            colId,
            values.title,
            values.description,
            values.startDate,
            values.endDate,
            selectedTags
        );

        onOpenChange(false);
    };

    const onError = (error: FieldErrors<typeof formSchema._type>) => {
        console.log(error);

        if (error.endDate && error.endDate.message) {
            setEndDateError(error.endDate.message);
        }
    };

    const handleEndDateChange = () => {
        setEndDateError(null);
    };

    const convertToTaskTags = (tags: string[]): TaskTag[] => {
        return tags.map(tagString => {
            const tagParts = tagString.split('?');
            const [_, colorPart, titlePart] = tagParts;
            const tagColor = colorPart.split('=')[1];
            const tagTitle = titlePart.split('=')[1];
            return new TaskTag(tagTitle, tagColor);
        });
    };

    const handleSetTagList = (tags: TaskTag[]) => {
        setSelectedTags(tags.map(tag => tag.toString()));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {isInEditView ? 'Edit Task' : 'Create a new Task'}
                    </DialogTitle>
                    <DialogDescription>
                        {isInEditView
                            ? TASK_CREATION_DES.EDIT
                            : TASK_CREATION_DES.CREATE}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-4"
                    >
                        <FormField<z.infer<typeof formSchema>>
                            control={form.control as Control<z.infer<typeof formSchema>>}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{'Title *'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                isInEditView && taskToBeEditted
                                                    ? taskToBeEditted.title
                                                    : 'Task title'
                                            }
                                            {...field}
                                            value={typeof field.value === 'string' ? field.value : field.value?.toString() || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{'Description'}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="max-h-40"
                                            placeholder={
                                                isInEditView && taskToBeEditted
                                                    ? taskToBeEditted.des
                                                    : 'Task description'
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{'Start Date *'}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                                                        variant={'outline'}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'PPP'
                                                            )
                                                        ) : (
                                                            <span>
                                                                {'Pick a date'}
                                                            </span>
                                                        )}
                                                        <CalendarPlus className="ml-3 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={date =>
                                                        date > new Date() ||
                                                        date <
                                                        new Date(
                                                            '1900-01-01'
                                                        )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            {'End Date (Optional)'}
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                                                        variant={'outline'}
                                                        onClick={() =>
                                                            handleEndDateChange()
                                                        }
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'PPP'
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarPlus className="ml-3 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={date =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        {endDateError && (
                                            <FormMessage>
                                                {endDateError}
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {!isInEditView && (
                            <FormField<z.infer<typeof formSchema>>
                                control={form.control as Control<z.infer<typeof formSchema>>}
                                name="tags"
                                render={() => (
                                    <FormItem className="flex flex-col justify-between">
                                        <FormLabel>{'Tags'}</FormLabel>
                                        <FormControl>
                                            <CreatableMultiSelectMenu
                                                selectedItemList={selectedTags}
                                                onSelectItem={setSelectedTags}
                                                onAddMoreItem={setNewTagTitle}
                                            />
                                        </FormControl>

                                        {tagError && (
                                            <FormMessage>
                                                {tagError}
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        )}

                        <Button className="w-full" type="submit">
                            {'Submit'}
                        </Button>
                    </form>
                </Form>

                {isOpenTaskTagCreationForm && (
                    <TaskTagCreationForm
                        isOpen={isOpenTaskTagCreationForm}
                        onOpenChange={setIsOpenTaskTagCreationForm}
                        labelTitle={newTagTitle}
                        tagList={convertToTaskTags(selectedTags)}
                        setTagList={handleSetTagList}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TaskCreationForm;
