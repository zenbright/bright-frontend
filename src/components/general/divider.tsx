import React from 'react';

interface DividerProps {
    width?: string;
    color?: string;
    height?: string;
}

const Divider: React.FC<DividerProps> = ({
    width = "100%",
    color = "rgba(0, 0, 0, 0.1)",
    height = "1px"
}) => {
    const dividerStyle: React.CSSProperties = {
        width,
        height,
        backgroundColor: color,
    };

    return <div style={dividerStyle} />;
};

export default Divider;
