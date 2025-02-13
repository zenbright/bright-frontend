import React, { useState, CSSProperties } from 'react';

interface MessageBubbleProps {
    content: string;
    isUserMessage: boolean;
}

interface Points {
    x: number;
    y: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content = 'hello', isUserMessage = false }) => {
    const bgColor = isUserMessage ? 'bg-black text-white' : 'bg-gray-100';
    const [isRightClicked, setRightClicked] = useState(false);
    const [isDeleted, setIsDeleteMessage] = useState(false);

    const [points, setPoints] = useState<Points>({
        x: 0,
        y: 0,
    });

    if (isDeleted) {
        return null;
    }

    const bubbleStyle: CSSProperties = {
        maxWidth: '300px',
        wordBreak: 'break-all',
        overflow: 'hidden',
        display: 'inline-block',
        alignSelf: !isUserMessage ? 'flex-start' : 'flex-end',
    };

    return (
        <span
            style={bubbleStyle}
            className={`mx-4 my-1 rounded-lg p-3 ${bgColor} text-md`}
            onContextMenu={e => {
                e.preventDefault();
                setRightClicked(true);
                setPoints({
                    x:
                        e.screenX + 200 >= window.innerWidth
                            ? window.innerWidth - 150
                            : e.pageX,
                    y:
                        e.screenY + 200 >= window.innerHeight
                            ? window.innerHeight - 200
                            : e.pageY,
                });
            }}
        >
            {content}
            {isRightClicked && (
                <div className="position-relative">
                    <div
                        className="absolute box-border w-200 rounded-lg bg-gray-800"
                        style={{ top: `${points.y}px`, left: `${points.x}px` }}
                        onMouseLeave={() => setRightClicked(false)}
                    >
                        <ul className="m-0 list-none p-2">
                            <li className="cursor-pointer p-3 hover:bg-black">
                                Forward
                            </li>
                            <li
                                className="cursor-pointer p-3 hover:bg-black"
                                onClick={() => setIsDeleteMessage(true)}
                            >
                                Delete
                            </li>
                            <li className="cursor-pointer p-3 hover:bg-black">
                                Pin
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </span>
    );
};
