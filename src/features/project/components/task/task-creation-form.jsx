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
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    END_DATE_INPUT_VALIDATOR,
    TAGS_INPUT_VALIDATOR,
    TASK_CREATION_DES,
    TITLE_DES_INPUT_VALIDATOR,
    TITLE_INPUT_VALIDATOR,
} from '../../assets/strings';
import { TaskTagCreationForm } from './task-tag-creation-form';

// Define form schema
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

const TaskCreationForm = ({
    isOpen,
    onOpenChange,
    createTask,
    colId,
    isInEditView,
    taskToBeEditted,
}) => {
    const [endDateError, setEndDateError] = useState(null);
    const [tagError, setTagError] = useState(null);
    const [selectedTags, setSelectedTags] = useState(
        isInEditView ? taskToBeEditted.tags.map(tag => tag.toString()) : []
    );
    const [newTagTitle, setNewTagTitle] = useState('');
    const [isOpenTaskTagCreationForm, setIsOpenTaskTagCreationForm] =
        useState(false);

    useEffect(() => {
        if (newTagTitle && newTagTitle !== '') {
            setIsOpenTaskTagCreationForm(true);
        }
    }, [newTagTitle]);

    // Create form hook with schema
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: isInEditView ? taskToBeEditted.title : '',
            description: isInEditView ? taskToBeEditted.des : '',
            startDate: isInEditView
                ? new Date(taskToBeEditted.startDate)
                : new Date(),
        },
    });

    // Reset empty tag error on selected
    useEffect(() => {
        setTagError(null);
    }, [selectedTags]);

    // Handle form submit
    const onSubmit = values => {
        if (isInEditView) {
            // Update task
            taskToBeEditted.title = values.title;
            taskToBeEditted.des = values.description;
            taskToBeEditted.startDate = values.startDate;
            taskToBeEditted.endDate = values.endDate;
            taskToBeEditted.tags = taskToBeEditted.createTags(selectedTags);

            onOpenChange(false);
            return;
        }
        // Constraint: must be selected at least 1 tag
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

    // Handle failed to submit
    const onError = error => {
        console.log(error);

        // If error related to endDate
        if (error[''] && error[''].message) {
            setEndDateError(error[''].message);
        }
    };

    // Reset error on date changed
    const handleEndDateChange = () => {
        setEndDateError(undefined);
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
                        {/* Task title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{'Title *'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                isInEditView
                                                    ? taskToBeEditted.title
                                                    : 'Task title'
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Task Description */}
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
                                                isInEditView
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

                        {/* Date Seletection */}
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
                                            <FormMessage error="true">
                                                {endDateError}
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {!isInEditView && (
                            <FormField
                                control={form.control}
                                name="selectedTags"
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
                                            <FormMessage error="true">
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

                {isOpenTaskTagCreationForm !== '' && (
                    <TaskTagCreationForm
                        isOpen={isOpenTaskTagCreationForm}
                        onOpenChange={setIsOpenTaskTagCreationForm}
                        labelTitle={newTagTitle}
                        tagList={selectedTags}
                        setTagList={setSelectedTags}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TaskCreationForm;

TaskCreationForm.propTypes = {
    isCreateNewTask: PropTypes.bool,
    setIsCreateNewTask: PropTypes.func,
    createTask: PropTypes.func,
    colId: PropTypes.string,
};
