import { XCircle } from 'lucide-react';
import React from 'react';
import ImageCropper from './image_cropper';

const UpdateUserAvatarModal = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div
            className="relative z-50"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-opacity-75 fixed inset-0 bg-gray-900 backdrop-blur-xs transition-all"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center px-2 py-12 text-center">
                    <div className="relative min-h-[60vh] w-[95%] rounded-2xl bg-gray-800 text-left text-slate-100 shadow-xl transition-all sm:w-[80%]">
                        <div className="px-5 py-4">
                            <button
                                type="button"
                                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 focus:outline-hidden"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close menu</span>
                                <XCircle />
                            </button>
                            <ImageCropper />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserAvatarModal;
