import React from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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
    Plus,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {listOfProjects } from '@components/sidebar/data/data'

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

export const CollapsibleSidebarGroup: React.FC<CollapsibleSidebarGroupProps> = ({
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
