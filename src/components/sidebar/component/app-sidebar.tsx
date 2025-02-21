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
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@components/ui/sidebar';
import {
    ChevronDown,
    ChevronUp,
    Layers2,
    Settings,
    UserCircle,
    UserRoundX,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { items, itemsAbout, itemsHelp } from '../data/data';
import { CollapsibleSidebarGroup } from '@/components/sidebar/component/collapsible-sidebar-group';

export function AppSidebar({ setOpen, open }: { setOpen: any; open: boolean }) {
    const [shouldCheckMousePosition, setShouldCheckMousePosition] =
        React.useState(false);
    const [sidebarWidth, setSidebarWidth] = React.useState(1);
    const [isOpenFooterDropdown, setIsOpenFooterDropdown] = React.useState(false);

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
            setIsOpenFooterDropdown(false);
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

    // Mouse event handlers.
    const handleEnter = () => {
        if (isPersistSidebarOn()) return;
        setOpen(true);
    };
    const handleLeave = () => {
        if (isPersistSidebarOn()) return;
        setShouldCheckMousePosition(true);
    };

    return (
        <div>
            <div
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
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to={`/settings`}>
                                        <span className="text-sm">
                                            {'Settings'}
                                        </span>
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
