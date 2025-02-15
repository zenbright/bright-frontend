import { Button } from '@components/ui/button';
import React, { FC } from 'react';

interface IconButtonProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component
    label?: string | number; // Optional label next to the icon
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click handler
    className?: string; // Additional CSS classes
}

const IconButton: FC<IconButtonProps> = ({
    icon: Icon,
    label,
    onClick,
    className,
}) => {
    return (
        <Button
            onClick={onClick}
            variant="ghost"
            className={`flex flex-row items-center gap-1 px-1.5 hover:rounded-md dark:text-neutral-300/80 ${className} text-xs`}
        >
            <Icon className="p-1" />
            {label !== undefined && <span>{label}</span>}
        </Button>
    );
};

export default IconButton;
