import React from 'react'
import {
    HelpCircle,
    ArrowRightCircle,
    Sun,
    Database
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
                    action: () => window.location.href = "/dashboard",
                },
                {
                    title: "Profile",
                    action: () => window.location.href = "/profile",
                },
                {
                    title: "Settings",
                    action: () => window.location.href = "/settings",
                },
                {
                    title: "Back",
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
            action: toggleTheme,
        },
        {
            title: "Change Data View",
            icon: <Database className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "V",
            action: changeDataView,
        },
    ],
}
