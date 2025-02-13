import { useState } from 'react';

export type UploadStatus = {
    progress: number;
    status: 'uploading' | 'complete' | 'ready';
};

export function useUploadStatuses() {
    const [uploadStatuses, setUploadStatuses] = useState<Record<string, UploadStatus>>({});

    const handleProgress = (fileName: string, percentage: number): void => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: percentage, status: 'uploading' },
        }));
    };

    const markAsComplete = (fileName: string): void => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: 100, status: 'complete' },
        }));
    };

    const removeStatus = (fileName: string): void => {
        setUploadStatuses(prevStatuses => {
            const updatedStatuses = { ...prevStatuses };
            delete updatedStatuses[fileName];
            return updatedStatuses;
        });
    };

    const resetStatus = (fileName: string): void => {
        setUploadStatuses(prevStatuses => ({
            ...prevStatuses,
            [fileName]: { progress: 0, status: 'ready' },
        }));
    };

    const clearStatuses = (): void => {
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
