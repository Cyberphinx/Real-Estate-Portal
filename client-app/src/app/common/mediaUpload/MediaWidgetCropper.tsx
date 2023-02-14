import React from "react";
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';   

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function MediaWidgetCropper({imagePreview, setCropper}: Props) {
    return (
        <Cropper   
            src={imagePreview}
            style={{height:'13rem', width: '100%'}}
            initialAspectRatio={16 / 9}
            aspectRatio={16 / 9}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}