/* eslint-disable max-len */
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Info, PlusCircle, Image, SmilePlus, SendHorizonal, MessageCircleCode } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useRef, useState } from 'react';

import { SAMPLE_MESSAGE } from '../test/values';
import { Message } from '../utils/class';
import { MessageBubble } from './message-bubble';

interface MessageContentProps {
    selectedMessage: number;
    onlineStatus: boolean;
    userName?: string;
    userProfileImage?: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({
    selectedMessage,
    onlineStatus,
    userName = 'Unknown',
    userProfileImage,
}) => {
    const [userMessageInput, setUserMessageInput] = useState('');
    const [userMessage, setMessageList] = useState<Message[]>([]);
    const [isPageLoad, setIsPageLoad] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMessageList(SAMPLE_MESSAGE);
        console.log(messagesEndRef.current);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [isPageLoad, userMessage]);

    useEffect(() => {
        setMessageList(SAMPLE_MESSAGE);
        scrollToBottom();
    }, [selectedMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView?.({
            behavior: 'smooth',
            block: 'end',
        });
    };

    const onHandleSendMessage = () => {
        if (userMessageInput.trim() !== '') {
            const newMessage = new Message(
                userMessageInput,
                new Date(),
                'Quoc Doan'
            );
            setMessageList(prevMessages => [...prevMessages, newMessage]);
            setUserMessageInput('');
        }
    };

    const MessageList: React.FC = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {userMessage.map((message, index) => (
                    <MessageBubble
                        key={index}
                        content={message.content}
                        isUserMessage={message.isUserMessage}
                    />
                ))}
                <div
                    ref={view => {
                        messagesEndRef.current = view;
                        setIsPageLoad(true);
                    }}
                />
            </div>
        );
    };

    if (typeof selectedMessage === 'number' && selectedMessage === -1) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <MessageCircleCode
                    alt="Bubble icon"
                    className="mb-4 h-16 w-16 opacity-20"
                />
                <h1 className="text-2xl font-medium opacity-25">
                    {'Start a conversation'}
                </h1>
            </div>
        );
    } else {
        return (
            <div className="flex h-screen w-full flex-col justify-between">
                {/* Header */}
                <div className="top-0 flex h-20 w-full items-center justify-between gap-2 border-b px-4 py-5 align-baseline">
                    <div className="flex grow items-center">
                        <div className="relative h-10 w-10 rounded-full">
                            <Avatar>
                                <AvatarImage
                                    src={userProfileImage}
                                    alt="@shadcn"
                                />
                                <AvatarFallback>
                                    {userName.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className={`absolute rounded-full ${onlineStatus ? 'bg-green-400' : 'bg-gray-400'} bottom-0 left-8 h-3 w-3`}
                            />
                        </div>
                        <div className="ml-2">
                            <h1 className="font-medium">{userName}</h1>
                            <h1 className="flex items-center text-sm">
                                {onlineStatus ? 'Online now' : 'Offline'}
                            </h1>
                        </div>
                    </div>
                    <button className="h-6 w-6">
                        <Info />
                    </button>
                </div>

                {/* Message List */}
                <OverlayScrollbarsComponent
                    element="div"
                    options={{ scrollbars: { autoHide: 'auto' } }}
                    defer
                    className="flex-1 overflow-auto"
                >
                    <MessageList />
                </OverlayScrollbarsComponent>

                {/* Control Bar */}
                <div className="mt-2 mb-3 ml-4 flex items-center justify-start">
                    <Button variant="ghost" size="icon">
                        <PlusCircle className="h-6 w-6" strokeWidth={1.5} />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Image className="h-6 w-6" strokeWidth={1.5} />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <SmilePlus className="h-6 w-6" strokeWidth={1.5} />
                    </Button>

                    <input
                        type="text"
                        placeholder="Aa..."
                        value={userMessageInput}
                        onChange={e => setUserMessageInput(e.target.value)}
                        className="ml-2 h-10 w-4/5 rounded-full bg-gray-200/40 px-4 py-6 hover:bg-gray-200/60"
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4"
                        onClick={onHandleSendMessage}
                    >
                        <SendHorizonal className="h-6 w-6" strokeWidth={1.5} />
                    </Button>
                </div>
            </div>
        );
    }
};
