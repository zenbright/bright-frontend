import {
    ALLOWED_EXTENSIONS,
    FILE_SIZE_EXCEED,
    FILE_UNSUPPORTED,
} from '@/config/constants/strings.global';
import { addFile } from '@/config/slice/file-slice';
import { useUploadStatuses } from '@/hooks/file-upload/upload-status';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useFileSelection() {
    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState(null);
    const [isUploadFailed, setIsUploadFailed] = useState(false);
    const { resetStatus } = useUploadStatuses();

    const onDrop = useCallback(
        acceptedFiles => {
            const newFiles = [];
            const newUploadStatuses = {};

            acceptedFiles.forEach(file => {
                const extension = file.name.split('.').pop().toLowerCase();

                if (
                    ALLOWED_EXTENSIONS.includes(extension) &&
                    file.size <= 25000000
                ) {
                    newFiles.push(file);
                    newUploadStatuses[file.name] = {
                        progress: 0,
                        status: 'ready',
                    }; // Initialize each file's status
                    resetStatus(file.name); // Reset status if file was already uploaded
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

            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]); // Add new files to the array
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
