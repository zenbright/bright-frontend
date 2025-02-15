import { API_BASE_URL } from '@/config/constants/strings.global';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface IFileArgs {
    file: File;
}

export function useFileUpload(
    onProgress: (fileName: string, percentage: number) => void
) {
    return useMutation<void, AxiosError, IFileArgs[]>({
        mutationFn: async files => {
            const uploadPromises = files.map(fileObj => {
                const formData = new FormData();
                formData.append('files', fileObj.file); // Append each file to its own FormData

                return axios.post(API_BASE_URL + 'file/fileUpload', formData, {
                    onUploadProgress: event => {
                        const percentage = event.total
                            ? Math.round((event.loaded * 100) / event.total)
                            : 0;
                        onProgress(fileObj.file.name, percentage);
                    },
                });
            });

            await Promise.allSettled(uploadPromises);
        },
    });
}
