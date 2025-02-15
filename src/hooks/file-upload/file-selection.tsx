import React, { useState, useCallback } from 'react';
import {
    ALLOWED_EXTENSIONS,
    FILE_SIZE_EXCEED,
    FILE_UNSUPPORTED,
} from '@/config/constants/strings.global';
import { addFile } from '@/config/slice/file-slice';
import { useUploadStatuses } from '@/hooks/file-upload/upload-status';
import { useDispatch } from 'react-redux';

interface FileError {
    title: string;
    des: string;
}

export function useFileSelection() {
    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<FileError | null>(null);
    const [isUploadFailed, setIsUploadFailed] = useState<boolean>(false);
    const { resetStatus } = useUploadStatuses();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles: File[] = [];

            acceptedFiles.forEach((file: File) => {
                const extension = file.name.split('.').pop()?.toLowerCase();

                if (
                    extension &&
                    ALLOWED_EXTENSIONS.includes(extension) &&
                    file.size <= 25000000
                ) {
                    newFiles.push(file);
                    resetStatus(file.name);
                    dispatch(addFile(file));
                    setError(null);
                    setIsUploadFailed(false);
                } else {
                    if (file.size > 25000000) {
                        setError({
                            title: FILE_SIZE_EXCEED.TITLE,
                            des: FILE_SIZE_EXCEED.DES,
                        });
                    } else {
                        setError({
                            title: FILE_UNSUPPORTED.TITLE,
                            des: FILE_UNSUPPORTED.DES,
                        });
                    }
                    setIsUploadFailed(true);
                }
            });

            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        },
        [dispatch, resetStatus]
    );

    return {
        selectedFiles,
        error,
        isUploadFailed,
        onDrop,
        setError,
        setIsUploadFailed,
    };
}
