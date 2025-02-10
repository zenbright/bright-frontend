import { useState } from 'react';

export function useUploadStatuses() {
    const [uploadStatuses, setUploadStatuses] = useState({});

    const handleProgress = (fileName, percentage) => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: percentage, status: 'uploading' },
        }));
    };

    const markAsComplete = fileName => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: 100, status: 'complete' },
        }));
    };

    const removeStatus = fileName => {
        setUploadStatuses(prevStatuses => {
            const updatedStatuses = { ...prevStatuses };
            delete updatedStatuses[fileName];
            return updatedStatuses;
        });
    };

    const resetStatus = fileName => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: 0, status: 'ready' },
        }));
    };

    const clearStatuses = () => {
        setUploadStatuses({});
    };

    return {
        uploadStatuses,
        handleProgress,
        markAsComplete,
        removeStatus,
        resetStatus,
        clearStatuses,
    };
}
