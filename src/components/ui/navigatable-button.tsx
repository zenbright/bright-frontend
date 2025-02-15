import { Button } from '@components/ui/button';
import React from 'react';
import { NavLink } from 'react-router-dom';

export type NavigatableButtonProps = {
    to: string;
    children?: React.ReactNode;
    variant?: string;
    className?: string;
    onClick?: () => void;
};

export const NavigatableButton = (props: NavigatableButtonProps) => {
    const { to, ...rest } = props;
    return (
        <NavLink to={to} {...rest}>
            <Button
                className={rest.className}
                onClick={rest.onClick}
                variant={rest.variant}
            >
                {props.children}
            </Button>
        </NavLink>
    );
};
