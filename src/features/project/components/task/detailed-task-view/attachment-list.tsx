/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AudioLines, File, Plus } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useEffect, useState } from 'react';

import { RESULT_NOT_FOUND } from '@/config/constants/strings.global';
import { SAMPLE_ATTACHMENT_LIST } from '@features/project/components/task/detailed-task-view/test/values';

interface Attachment {
    url: string;
    title: string;
    mimeType: string;
    date: string;
    uploadedBy: string;
}

// File type mapping
const FILE_TYPE_MAPPING: Record<string, any> = {
    application: {
        icon: <File className="h-8 w-8 text-gray-400" />,
        text: 'Document',
        show_sub_title: true,
    },
    audio: {
        icon: <AudioLines className="h-8 w-8 text-gray-400" />,
        text: 'Audio',
        show_sub_title: true,
    },
    video: {
        text: 'Video',
        icon: (url: string, mimeType: string) => (
            <video
                controls
                className="h-full w-28 rounded-md"
                preload="metadata"
            >
                <source src={url} type={mimeType} />
                Your browser does not support the video tag.
            </video>
        ),
        show_sub_title: false,
    },
    image: {
        text: 'Image',
        icon: (url: string, title: string) => (
            <img src={url} className="h-full w-28 rounded-md" alt={title} />
        ),
        show_sub_title: false,
    },
};

const FilePreview = (attachment: Attachment) => {
    const file_type = attachment.mimeType.substring(
        0,
        attachment.mimeType.indexOf('/')
    );
    const file_type_config = FILE_TYPE_MAPPING[file_type];

    if (!file_type_config) {
        console.log('File not recognised');
        return null;
    }

    const { icon, text, show_sub_title } = file_type_config;
    const icon_element =
        typeof icon === 'function'
            ? icon(attachment.url, attachment.title)
            : icon;

    return (
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-gray-100">
            {icon_element}
            {show_sub_title && (
                <div className="text-xs font-normal text-gray-400">{text}</div>
            )}
        </div>
    );
};

interface AttachmentListProps {
    attachments?: Attachment[];
    isReload: boolean;
    onReloadTrigger: (value: boolean) => void;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({
    attachments = SAMPLE_ATTACHMENT_LIST,
    isReload,
    onReloadTrigger,
}) => {
    const [maxHeight, setMaxHeight] = useState(window.innerHeight);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filteredList, setFilteredList] = useState<Attachment[]>(attachments);

    // Calculate remaining height
    useEffect(() => {
        const updateMaxHeight = () => {
            const attachmentListElement =
                document.getElementById('attachment-list');
            if (attachmentListElement) {
                const rect = attachmentListElement.getBoundingClientRect();
                const remainingHeight = window.innerHeight - rect.top;
                setMaxHeight(remainingHeight);
            }
        };

        updateMaxHeight();

        window.addEventListener('resize', updateMaxHeight);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);

    // Calculate remaining height
    useEffect(() => {
        const updateMaxHeight = () => {
            const attachmentListElement =
                document.getElementById('attachment-list');
            if (attachmentListElement) {
                const rect = attachmentListElement.getBoundingClientRect();
                const remainingHeight = window.innerHeight - rect.top;
                setMaxHeight(remainingHeight);
            }
        };

        updateMaxHeight();

        window.addEventListener('resize', updateMaxHeight);

        onReloadTrigger(false);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, [isReload]);

    // Searching
    useEffect(() => {
        const filteredList = attachments.filter(attachment =>
            attachment.title.toLowerCase().includes(searchPhrase)
        );

        setFilteredList(filteredList);
    }, [searchPhrase, attachments]);

    return (
        <div>
            {/* Search bar */}
            <div className="flex justify-between">
                <Input
                    className="mb-3 w-72 border-gray-400/80"
                    type="text"
                    placeholder="search for a file..."
                    value={searchPhrase}
                    onChange={e => {
                        setSearchPhrase(e.target.value);
                    }}
                />

                <Button
                    className="border-gray-400/80"
                    variant="outline"
                    size="icon"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <OverlayScrollbarsComponent
                element="div"
                options={{ scrollbars: { autoHide: 'move' } }}
                style={{ maxHeight: `${maxHeight}px` }}
                id="attachment-list"
            >
                <div className="mb-2 flex flex-col gap-2">
                    {filteredList.length === 0 && (
                        <div className="mt-2 flex self-center font-semibold text-gray-800">
                            {RESULT_NOT_FOUND}
                        </div>
                    )}

                    {filteredList.length > 0 &&
                        filteredList.map((attachment, index) => (
                            <div
                                onClick={() => {
                                    window.location.href = attachment.url;
                                }}
                                key={index}
                                className="flex h-20 gap-4 rounded-md font-bold hover:cursor-pointer hover:bg-slate-100"
                            >
                                {/* Preview */}

                                {FilePreview(attachment)}

                                {/* Metadata */}
                                <div className="text-xs font-normal text-gray-400">
                                    <div className="text-base font-semibold text-black">
                                        {attachment.title}
                                    </div>
                                    <div>{attachment.mimeType}</div>
                                    <div>Uploaded: {attachment.date}</div>
                                    <div>By {attachment.uploadedBy}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
};
