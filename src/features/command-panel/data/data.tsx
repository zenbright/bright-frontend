import React from 'react'
import {
    HelpCircle,
    ArrowRightCircle,
    LogOut,
    MoreHorizontal,
    MousePointer,
    Globe,
    Layout,
    RotateCw,
    Sun,
    Database
} from 'lucide-react'
import {
    toggleHighlightMode,
    toggleLanguage,
    toggleTheme,
    changeDataView,
    refreshData,
} from '../utils/devFunctions'

// Order groups so that commonly used commands appear first.
export const commandData = {
    Common: [
        {
            title: "/help",
            icon: <HelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "H",
            action: () => console.log('Help opened'),
        },
        {
            title: "/navigate",
            icon: <ArrowRightCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "N",
            children: [
                {
                    title: "Dashboard",
                    action: () => console.log("Navigating to /dashboard"),
                },
                {
                    title: "Profile",
                    action: () => console.log("Navigating to /profile"),
                },
                {
                    title: "Settings",
                    action: () => console.log("Navigating to /settings"),
                },
                {
                    title: "Back",
                    action: () => { }, // Handled in the panel via title check
                },
            ],
        },
        {
            title: "/logout",
            icon: <LogOut className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "O",
            action: () => console.log("Logging out"),
        },
        {
            title: "/etc",
            icon: <MoreHorizontal className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "E",
            action: () => console.log("Additional utilities"),
        },
    ],
    Developer: [
        {
            title: "Toggle Highlight Mode",
            icon: <MousePointer className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "S",
            action: toggleHighlightMode,
        },
        {
            title: "Select Language",
            icon: <Globe className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "L",
            children: [
                {
                    title: "English",
                    action: () => {
                        console.log("Language set to English")
                        toggleLanguage()
                    },
                },
                {
                    title: "Spanish",
                    action: () => {
                        console.log("Language set to Spanish")
                        toggleLanguage()
                    },
                },
                {
                    title: "French",
                    action: () => {
                        console.log("Language set to French")
                        toggleLanguage()
                    },
                },
                {
                    title: "Back",
                    action: () => { },
                },
            ],
        },
        {
            title: "Show Dimensions",
            icon: <Layout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "D",
            action: () => console.log('Displaying dimensions'),
        },
        {
            title: "Refresh Data",
            icon: <RotateCw className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            shortcut: "R",
            action: refreshData,
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
