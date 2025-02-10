import { useState } from 'react';

import {
    MESSAGE_TAB_WIDTH,
    NAV_BAR_WIDTH,
} from '../../../lib/constants/size.global';
import image from '../assets/images/rmitlogo.png';
import messageNew from '../assets/images/writing.png';
import { MessageContent } from '../components/message/messageContent';
import { MessagePreview } from '../components/message/messagePreview';
import Sidebar from '../components/screen/sidebar/Sidebar';

export const MessageView = () => {
    const [selectedMessage, setSelectedMessage] = useState(-1);
    const [selectedUserMessage, setSelectedUserMessage] = useState('');
    const [searchPhrase, setSearchPhrase] = useState('');

    const isContain = (str, search) => {
        const normalizedStr = str.toLowerCase();
        const normalizedSearch = search.toLowerCase();

        for (const char of normalizedSearch) {
            if (normalizedStr.indexOf(char) === -1) {
                return false;
            }
        }
        return true;
    };

    const handleSearchInputChange = event => {
        const value = event.target.value;
        setSearchPhrase(value);
    };

    const MessageList = () => {
        const filteredList = Array.from({ length: 10 }, (_, i) => (
            <MessagePreview
                key={i}
                onClick={() => {
                    setSelectedMessage(i);
                    setSelectedUserMessage(`Mudoker ${i}`);
                }}
                isSelected={selectedMessage === i}
                sentTime={'12:00 PM'}
                userName={`Mudoker ${i}`}
                profileImage={image}
                message={'Helloooooooooooooooooooooooooooooooooo'}
            />
        )).filter(
            message =>
                searchPhrase === '' ||
                isContain(message.props.userName, searchPhrase)
        );

        if (filteredList.length === 0) {
            return (
                <div className="flex items-center justify-center">
                    <p className="p-5 text-center font-medium opacity-60">
                        No results found
                    </p>
                </div>
            );
        }
        return filteredList;
    };

    return (
        <div className="flex h-screen w-screen">
            {/* Nav bar */}
            <div className="absolute z-50">
                <Sidebar></Sidebar>
            </div>
            <div
                className="h-screen bg-black"
                style={{ width: `${NAV_BAR_WIDTH}` }}
            />

            {/* Message section */}
            <div
                className="h-screen flex-col border-r"
                style={{ width: `${MESSAGE_TAB_WIDTH}` }}
            >
                <div className="flex h-20 items-center justify-between p-4 text-3xl font-medium">
                    <h1>Message</h1>
                    <button type="button" className="h-6 w-6">
                        <img src={messageNew} alt="writing" />
                    </button>
                </div>

                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="mx-2 mb-1 h-10 w-full rounded-lg bg-gray-200 px-4 py-2 outline-hidden"
                        onChange={handleSearchInputChange}
                    />
                </div>

                {/* Make the message list scrollable */}
                <div
                    className="scrollbar-thin scrollbar-thumb-gray-200 overflow-y-scroll"
                    style={{ maxHeight: 'calc(100vh - 124px)' }}
                >
                    <MessageList />
                </div>
            </div>

            {/* Message Content */}
            <div style={{ width: '72vw' }}>
                <MessageContent
                    selectedMessage={selectedMessage}
                    onlineStatus={false}
                    userName={selectedUserMessage}
                />
            </div>
        </div>
    );
};
