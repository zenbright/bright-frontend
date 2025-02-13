import { ListTodo, Paperclip, Podcast } from "lucide-react";

export const DEFAULT_TASK_TAG_ARRAY = [
    'medium?color=#b45309?title=Medium?description=Tasks with medium priority',
    'high?color=#be123c?title=High?description=Tasks with high priority',
    'low?color=#047857?title=Low?description=Tasks with low priority',
    'late?color=#9f1239?title=Late?description=Tasks that are late',
    'urgent?color=#6b21a8?title=Urgent?description=Urgent tasks',
    'enhancement?color=#c2410c?title=Enhancement?description=Tasks related to enhancements',
    'fix?color=#0369a1?title=Fix?description=Tasks to fix issues',
    'maintenance?color=#0f766e?title=Maintenance?description=Tasks for maintenance',
    'completed?color=#15803d?title=Completed?description=Completed tasks',
    'review?color=#a21caf?title=Review?description=Tasks under review',
];

export const TASK_DETAILED_TABS = [
    { name: 'Discussion', icon: Podcast, isDisabled: false },
    { name: 'Todos', icon: ListTodo, isDisabled: false },
    { name: 'Attachments', icon: Paperclip, isDisabled: false },
];
