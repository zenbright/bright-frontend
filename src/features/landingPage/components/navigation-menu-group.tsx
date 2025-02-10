/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import BrightLogo from '@assets/images/app-logo/logomini-dark.svg';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@components/ui/navigation-menu';
import React from 'react';

interface Component {
    title: string;
    href: string;
    description: string;
}

const components: Component[] = [
    {
        title: 'Bright - Project Management',
        href: '/docs/features/project-management',
        description:
            'Organize tasks and track progress with customizable boards.',
    },
    {
        title: 'AI-Powered Insights',
        href: '/docs/features/ai-support',
        description:
            'Automate workflows and receive intelligent recommendations.',
    },
    {
        title: 'GitHub Integration',
        href: '/docs/features/github-integration',
        description: 'Sync repositories and manage pull requests directly.',
    },
    {
        title: 'Real-Time Collaboration',
        href: '/docs/features/collaboration',
        description: 'Work together in real-time with shared workspaces.',
    },
    {
        title: 'Customizable Workspaces',
        href: '/docs/features/custom-workspaces',
        description: 'Tailor your workspace to fit your project needs.',
    },
    {
        title: 'Integrated API Management',
        href: '/docs/features/api-management',
        description: 'Monitor and manage APIs within your project.',
    },
];

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
    children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, ...props }, ref) => (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block space-y-1 rounded-md p-3 leading-none no-underline outline-none select-none hover:bg-[#F4F4F5] hover:text-[#18181B]',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-[#71717A]">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
);
ListItem.displayName = 'ListItem';

export const NavigationMenuGroup: React.FC = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        {'Getting started'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                                        href="/"
                                    >
                                        <img
                                            src={BrightLogo}
                                            alt="Bright Logo"
                                            className=""
                                        />
                                        <div className="mt-4 mb-2 text-lg font-medium">
                                            {'Zen Bright'}
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight">
                                            {
                                                'A project management and coding platform with AI insights, GitHub integration, and real-time collaboration to boost productivity.'
                                            }
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Introduction">
                                {
                                    'Tools to organize tasks, deadlines, and team workflows effectively.'
                                }
                            </ListItem>
                            <ListItem
                                href="/docs/installation"
                                title="Installation"
                            >
                                {
                                    'Steps to install necessary packages and configure our product.'
                                }
                            </ListItem>
                            <ListItem
                                href="/docs/primitives/typography"
                                title="Sponsor"
                            >
                                {
                                    'Support our development and help us create more features for the community.'
                                }
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map(component => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
