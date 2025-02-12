import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@components/ui/sidebar';
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Layers2,
    Plus,
    Settings,
    UserCircle,
    UserRoundX,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { items, itemsAbout, itemsHelp, listOfProjects } from '../data/data';

// Define the type for menu items
interface MenuItem {
    title: string;
    url: string;
    icon: any;
}

interface CollapsibleSidebarGroupProps {
    label: string;
    items: MenuItem[];
    actionTitle?: string;
    open?: boolean;
}

const CollapsibleSidebarGroup: React.FC<CollapsibleSidebarGroupProps> = ({
    label,
    items,
    open,
}) => (
    <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
            <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                    {label}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item, index) => {
                            const key = `${item.title}-${index}`;
                            if (item.title === 'Projects') {
                                return (
                                    <Collapsible
                                        key={key}
                                        defaultOpen
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <div className="flex">
                                                    <SidebarMenuButton asChild>
                                                        <NavLink to={item.url}>
                                                            <item.icon />
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </NavLink>
                                                    </SidebarMenuButton>

                                                    {item.title ===
                                                        'Projects' &&
                                                        open && (
                                                            <button
                                                                onClick={(
                                                                    e: any
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    console.log(
                                                                        'ok'
                                                                    );
                                                                }}
                                                            >
                                                                <Plus className="ml-auto h-4 w-4" />
                                                            </button>
                                                        )}
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {listOfProjects.map(
                                                        project => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    project.title
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={
                                                                            project.url
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                project.title
                                                                            }
                                                                        </span>
                                                                        <ArrowRight className="ml-auto" />
                                                                    </a>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            } else {
                                return (
                                    <SidebarMenuItem key={key}>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                to={item.url}
                                                className="flex items-center gap-4"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            }
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </CollapsibleContent>
        </SidebarGroup>
    </Collapsible>
);

export function AppSidebar({ setOpen, open }: { setOpen: any; open: boolean }) {
    const [shouldCheckMousePosition, setShouldCheckMousePosition] =
        React.useState(false);
    const [sidebarWidth, setSidebarWidth] = React.useState(1);

    useEffect(() => {
        const base = !open && !shouldCheckMousePosition ? 3 : 14;
        setSidebarWidth(
            base *
                parseFloat(getComputedStyle(document.documentElement).fontSize)
        );
    }, [open, shouldCheckMousePosition]);

    const handleMouseMove = (event: MouseEvent) => {
        if (event.clientX > sidebarWidth) {
            setOpen(false);
            setShouldCheckMousePosition(false);
        } else {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (!shouldCheckMousePosition) {
            window.removeEventListener('mousemove', handleMouseMove);
            return;
        }

        // Add mouse move event listener
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [shouldCheckMousePosition]);

    const isPersistSidebarOn = (): boolean | null => {
        const sidebarName = 'sidebar:state';
        const sidebarOpen = localStorage.getItem(sidebarName);

        console.log('sidebarOpen', sidebarOpen);
        if (sidebarOpen !== null) {
            return true;
        }

        return null; // Return null if the key does not exist
    };

    useEffect(() => {
        isPersistSidebarOn();
    }, [open]);

    // Define widths.
    const collapsedWidth = '3rem';
    const extendedWidth = '14rem';
    const overlayWidth = `calc(${extendedWidth} - ${collapsedWidth})`;

    // Mouse event handlers.
    const handleEnter = () => {
        if (isPersistSidebarOn()) return;
        setOpen(true);
    };
    const handleLeave = () => {
        if (isPersistSidebarOn()) return;
        // ...existing logic...
        setShouldCheckMousePosition(true);
    };

    return (
        <div>
            {/* Reserved (base) sidebar: occupies space in the layout */}
            <div
                className="relative z-40 transition-all duration-300 ease-in-out"
                style={{ width: collapsedWidth }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="py-6 text-base">
                                            <Layers2 />
                                            Workspace
                                            <ChevronDown className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                        <DropdownMenuItem>
                                            <span>Zen Bright</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Tutur3u</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <CollapsibleSidebarGroup
                            label="Project Management"
                            items={items}
                            actionTitle="Add Project"
                            open={open}
                        />
                        <CollapsibleSidebarGroup
                            label="Help"
                            items={itemsHelp}
                        />
                        <CollapsibleSidebarGroup
                            label="About"
                            items={itemsAbout}
                        />
                    </SidebarContent>

                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton>
                                            <UserCircle /> Mudoker
                                            <ChevronUp className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="top"
                                        className="w-[--radix-popper-anchor-width]"
                                        close={!open}
                                    >
                                        <DropdownMenuItem>
                                            <NavLink
                                                to={`/profile`}
                                                className="flex items-center gap-2"
                                            >
                                                <UserCircle size={16} />{' '}
                                                {'Profile'}
                                            </NavLink>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <NavLink
                                                to={`/settings`}
                                                className="flex items-center gap-2"
                                            >
                                                <Settings size={16} />{' '}
                                                {'Settings'}
                                            </NavLink>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-2">
                                                {' '}
                                                <UserRoundX size={16} /> Sign
                                                out
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
            </div>
        </div>
    );
}
