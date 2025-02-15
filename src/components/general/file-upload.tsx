import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import {
    clearFiles,
    removeFile,
    selectFileQueue,
} from '@/config/slice/file-slice';
import { useFileSelection } from '@/hooks/file-upload/file-selection';
import { useUploadStatuses } from '@/hooks/file-upload/upload-status';
import { useFileUpload } from '@/lib/system-service/file-upload';
import { Upload, X } from 'lucide-react';
import { Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { FailureAlert } from './alert-failure';

interface FileWithName extends File {
    name: string;
}

export function FileUpload(): JSX.Element {
    const dispatch = useDispatch();
    const fileQueue = useSelector(selectFileQueue) as FileWithName[];
    const fileSelectInput = useRef<HTMLInputElement | null>(null);
    const {
        selectedFiles,
        error,
        isUploadFailed,
        onDrop,
        setError,
        setIsUploadFailed,
    } = useFileSelection();
    const {
        uploadStatuses,
        handleProgress,
        markAsComplete,
        removeStatus,
        clearStatuses,
    } = useUploadStatuses();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadStarted, setUploadStarted] = useState<boolean>(false);

    const { mutateAsync } = useFileUpload(handleProgress);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
        },
        multiple: true,
    });

    const handleUpload = async (): Promise<void> => {
        if (!fileQueue.length) return;

        setIsUploading(true);
        setUploadStarted(true);

        const filesToUpload = fileQueue.filter(
            file => uploadStatuses[file.name]?.status !== 'complete'
        );

        try {
            await mutateAsync(filesToUpload.map(file => ({ file })));
            filesToUpload.forEach(file => {
                markAsComplete(file.name);
            });
        } catch (uploadError: any) {
            setIsUploadFailed(true);
            setError({ title: 'Upload Failed', des: uploadError.message });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = (fileName: string): void => {
        dispatch(removeFile(fileName));
        removeStatus(fileName);
    };

    const handleClose = (): void => {
        dispatch(clearFiles());
        clearStatuses();
        setUploadStarted(false);
    };

    const allFilesUploaded =
        fileQueue.length > 0 &&
        fileQueue.every(
            file => uploadStatuses[file.name]?.status === 'complete'
        );

    return (
        <Dialog open={true}>
            <DialogContent
                className={`sm:max-w-[425px] ${isDragActive ? 'bg-slate-300' : 'bg-background'} `}
            >
                <DialogHeader>
                    <DialogTitle className="text-foreground text-xl font-bold">
                        Upload your attachments
                    </DialogTitle>
                    <DialogDescription>
                        Everyone with access to this task can see the attached files.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div
                        className={`border-drag_box text-foreground/60 flex h-44 w-full flex-col items-center justify-center border-2 border-dashed font-semibold ${
                            isDragActive ? 'border-blue-500' : ''
                        }`}
                        {...getRootProps()}
                    >
                        <Upload className="mb-5 h-7 w-7" />

                        <div className="mb-1 flex gap-1">
                            <div
                                className="text-foreground/70 font-bold hover:cursor-pointer hover:underline"
                                onClick={() => fileSelectInput.current?.click()}
                            >
                                Click to upload
                            </div>
                            or
                            <div>drop your files here</div>
                            <input {...getInputProps()} />
                        </div>

                        <div className="text-sm">
                            (Maximum file size: 25MB, multiple files allowed)
                        </div>
                    </div>

                    {fileQueue.length > 0 && (
                        <div className="text-foreground max-h-[300px] max-w-[375px] overflow-auto text-sm font-semibold">
                            {fileQueue.map((file, index) => (
                                <div key={index} className="pt-2">
                                    <div className="rounded-xl border px-2 py-2">
                                        <div className="flex items-center justify-between">
                                            <p className="w-[80%] truncate text-ellipsis">
                                                {file.name}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {uploadStarted && (
                                                    <div className="text-sm">
                                                        {uploadStatuses[file.name]?.status === 'complete' ? (
                                                            <Check className="h-4 w-4" />
                                                        ) : (
                                                            `${uploadStatuses[file.name]?.progress || 0}%`
                                                        )}
                                                    </div>
                                                )}
                                                <Button
                                                    className="rounded-full"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemoveFile(file.name)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {uploadStarted && (
                                            <Progress
                                                value={uploadStatuses[file.name]?.progress || 0}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={allFilesUploaded ? handleClose : handleUpload}
                        disabled={isUploading || fileQueue.length === 0}
                    >
                        {isUploading
                            ? 'Uploading...'
                            : allFilesUploaded
                            ? 'Close'
                            : 'Upload'}
                    </Button>
                </DialogFooter>

                {isUploadFailed && error && (
                    <FailureAlert
                        open={isUploadFailed}
                        setOpen={setIsUploadFailed}
                        title={error.title}
                        des={error.des}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
