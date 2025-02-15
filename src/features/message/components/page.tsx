import React from 'react';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useMemo, useState, ChangeEvent } from 'react';

import { MessagePreviewTab } from './message-preview-tab';
import { MessageContent } from './message-content';

interface Message {
    id: number;
    userName: string;
    profileImage: string;
    message: string;
    sentTime: Date;
}

const FakeMessages: Message[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    userName: faker.internet.username(),
    profileImage: faker.image.avatar(),
    message: faker.lorem.sentence(),
    sentTime: faker.date.recent(),
}));

export const MessagePage = () => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [searchPhrase, setSearchPhrase] = useState<string>('');

    const isContain = (str: string, search: string): boolean => {
        const normalizedStr = str.toLowerCase();
        const normalizedSearch = search.toLowerCase();
        for (const char of normalizedSearch) {
            if (normalizedStr.indexOf(char) === -1) {
                return false;
            }
        }
        return true;
    };

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchPhrase(value);
    };

    const filteredList = useMemo(() => {
        return FakeMessages.filter(
            message =>
                searchPhrase === '' || isContain(message.userName, searchPhrase)
        ).map(message => (
            <MessagePreviewTab
                key={message.id}
                onClick={() => {
                    setSelectedMessage(message);
                }}
                isSelected={selectedMessage?.id === message.id}
                sentTime={format(message.sentTime, 'hh:mm a')}
                userName={message.userName}
                profileImage={message.profileImage}
                message={message.message}
            />
        ));
    }, [searchPhrase, selectedMessage]);

    return (
        <div className="flex w-screen overflow-hidden">
            {/* Message section */}
            <div className="flex h-screen w-1/4 flex-col border-r">
                <input
                    type="text"
                    placeholder="Search..."
                    className="mx-2 mt-5 mb-1 h-10 rounded-md bg-gray-100/80 px-4 text-sm outline-hidden hover:bg-gray-200/80"
                    onChange={handleSearchInputChange}
                />

                <OverlayScrollbarsComponent
                    element="div"
                    options={{ scrollbars: { autoHide: 'scroll' } }}
                    defer
                    className="flex-1 overflow-auto"
                >
                    {filteredList.length === 0 ? (
                        <div className="flex w-full items-center justify-center">
                            <p className="mt-4 w-full text-center font-medium opacity-60">
                                {'No results found'}

                                {/* Placeholder */}
                                <MessagePreviewTab
                                    key={''}
                                    onClick={() => {
                                        setSelectedMessage(null);
                                    }}
                                    isSelected={false}
                                    sentTime={''}
                                    userName={''}
                                    profileImage={''}
                                    message={''}
                                />
                            </p>
                        </div>
                    ) : (
                        filteredList
                    )}
                </OverlayScrollbarsComponent>
            </div>

            {/* Message Content */}
            <div className="h-screen w-full overflow-auto">
                {selectedMessage && (
                    <MessageContent
                        selectedMessage={selectedMessage.id}
                        onlineStatus={false}
                        userName={selectedMessage.userName}
                        userProfileImage={selectedMessage.profileImage}
                    />
                )}
            </div>
        </div>
    );
};
