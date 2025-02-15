import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

interface BreadcrumbItemType {
    label: string;
    href?: string;
    isCurrent?: boolean;
    dropdownItems?: string[]; // Optional dropdown items
}

interface BreadcrumbProps {
    items: BreadcrumbItemType[];
}

const BreadCrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {item.dropdownItems ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                        <span className="sr-only">
                                            Toggle menu
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {item.dropdownItems.map(
                                            (dropdownItem, i) => (
                                                <DropdownMenuItem key={i}>
                                                    {dropdownItem}
                                                </DropdownMenuItem>
                                            )
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : item.href ? (
                                <BreadcrumbLink href={item.href}>
                                    {item.label}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;
