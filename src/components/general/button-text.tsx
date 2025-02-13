import React from 'react';

interface ButtonTextProps {
    title: string;
    shape?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    leftIconPath?: string;
    rightIconPath?: string;
    onClick?: () => void;
}

const ButtonText: React.FC<ButtonTextProps> = ({
    title,
    shape,
    width,
    height,
    backgroundColor,
    textColor,
    leftIconPath,
    rightIconPath,
    onClick,
}) => {
    const buttonStyles: React.CSSProperties = {
        backgroundColor,
        width,
        height,
        color: textColor,
    };

    return (
        <div>
            <button
                className={`button-text ${shape || ''}`}
                style={buttonStyles}
                onClick={onClick}
            >
                {leftIconPath && <span className="left-icon">{leftIconPath}</span>}
                {title}
                {rightIconPath && <span className="right-icon">{rightIconPath}</span>}
            </button>
        </div>
    );
};

export default ButtonText;
