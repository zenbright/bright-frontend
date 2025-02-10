import React from 'react'
import {
    HelpCircle,
    ArrowRightCircle,
    Sun,
    Database,
    User,
    Settings,
    Home,
    DatabaseZap,
    DatabaseBackup,
    Moon,
} from 'lucide-react'
import {
    toggleTheme,
    changeDataView,
} from '../utils/devFunctions'

// Order groups so that commonly used commands appear first.
export const commandData = {
    Common: [
        {
            title: "Help",
            icon: <HelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "H",
            action: () => console.log('Help opened'),
        },
        {
            title: "Navigate",
            icon: <ArrowRightCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "N",
            children: [
                {
                    title: "Dashboard",
                    icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                    action: () => window.location.href = "/dashboard",
                },
                {
                    title: "Profile",
                    icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                    action: () => window.location.href = "/profile",
                },
                {
                    title: "Settings",
                    icon: <Settings className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                    action: () => window.location.href = "/settings",
                },
                {
                    title: "Go to previous page",
                    icon: <ArrowRightCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                    action: () => { window.history.back() },
                },
            ],
        },
    ],
    Appearance: [
        {
            title: "Toggle Theme",
            icon: <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "T",
            children: [
                {
                    title: "Light Default",
                    icon: <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                },
                {
                    title: "Dark Default",
                    icon: <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                },
            ],
        },
        {
            title: "Change Data View",
            icon: <Database className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "V",
            children: [
                {
                    title: "Fake Data",
                    icon: <DatabaseZap className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                },
                {
                    title: "Real Data",
                    icon: <Database className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                },
                {
                    title: "Empty Data",
                    icon: <DatabaseBackup className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                }
            ],
        },
    ],
}
