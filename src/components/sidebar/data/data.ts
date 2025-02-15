import {
    Bell,
    Cable,
    Gem,
    HelpCircle,
    Home,
    Inbox,
    Newspaper,
    PanelsTopLeft,
    Plus,
    Quote,
} from 'lucide-react';

// Menu items.
export const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '/inbox',
        icon: Inbox,
    },
    {
        title: 'Projects',
        url: '/project',
        icon: PanelsTopLeft,
    },
    {
        title: 'Notifications',
        url: '/notification',
        icon: Bell,
    },
];

export const itemsHelp = [
    {
        title: 'Help',
        url: '#',
        icon: HelpCircle,
    },
    {
        title: 'Support',
        url: '#',
        icon: Cable,
    },
];

export const itemsAbout = [
    {
        title: 'About Us',
        url: '#',
        icon: Quote,
    },
    {
        title: 'Subscription',
        url: '#',
        icon: Gem,
    },
    {
        title: "What's New",
        url: '#',
        icon: Newspaper,
    },
];

export const listOfProjects = [
    {
        title: 'Bright',
        url: '#',
        icon: Plus,
    },
    {
        title: 'Eternal',
        url: '#',
        icon: Plus,
    },
    {
        title: 'Hive',
        url: '#',
        icon: Plus,
    },
];
