import React, { useState } from 'react';
import ReactCrop, {
    PercentCrop,
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [crop, setCrop] = useState<PercentCrop | undefined>(undefined);
    const [error, setError] = useState('');

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || '';
            imageElement.src = imageUrl;
            imageElement.addEventListener('load', (e: Event) => {
                if (error) setError('');
                const target = e.currentTarget as HTMLImageElement;
                const { naturalWidth, naturalHeight } = target;
                if (
                    naturalHeight < MIN_DIMENSION ||
                    naturalWidth < MIN_DIMENSION
                ) {
                    setError('Image must be at least 150 x 150 pixels');
                    return setImageSrc('');
                }
            });
            setImageSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const cropWidthPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <>
            <label className="mb-3 block w-fit">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-700 file:px-2 file:py-1 file:text-xs file:text-sky-300 hover:file:bg-gray-600"
                />
            </label>
            {error && <p className="text-md text-rose-600">{error}</p>}
            {imageSrc && (
                <div>
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={1}
                        minWidth={150}
                    >
                        <img
                            src={imageSrc}
                            alt=""
                            style={{ maxHeight: '70vh' }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button className="mt-4 rounded-2xl bg-sky-500 px-4 py-2 font-mono text-xs text-white hover:bg-sky-600">
                        Crop Image
                    </button>
                </div>
            )}
        </>
    );
};

export default ImageCropper;
