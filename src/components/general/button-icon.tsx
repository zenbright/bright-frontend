import React from 'react';

export interface ButtonIconProps {
    size: string;
    background?: string;
    action?: React.MouseEventHandler<HTMLButtonElement>;
    borderRadius?: string;
    shape?: string;
    children?: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
    size,
    background,
    action,
    borderRadius,
    shape = 'rounded',
    children,
}) => {
    const buttonStyle = {
        width: `w-[${size}]`,
        height: `h-[${size}]`,
        background: background ? `bg-${background}` : undefined,
        borderRadius,
        padding: 'p-2',
    };

    if (shape === 'rounded') {
        buttonStyle.borderRadius = 'rounded-full';
        buttonStyle.background = 'bg-none';
    }

    // Filter out any undefined values before joining
    const style = Object.values(buttonStyle).filter(Boolean).join(' ');

    return (
        <button className={style} onClick={action}>
            {children}
        </button>
    );
};

export default ButtonIcon;
