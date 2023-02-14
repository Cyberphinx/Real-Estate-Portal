import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import MediaWidgetCropper from "./MediaWidgetCropper";
import MediaWidgetDropzone from "./MediaWidgetDropzone";

interface Props {
    loading: boolean;
    uploadMedia: (listingId: string, file: Blob) => void;
}

export default function MediaUploadWidget({ loading, uploadMedia }: Props) {
    const { listingStore } = useStore();
    const { listingId } = listingStore;
    const { id } = useParams<string>();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            if (listingId) cropper.getCroppedCanvas().toBlob(blob => uploadMedia(listingId, blob!));
            if (id) cropper.getCroppedCanvas().toBlob(blob => uploadMedia(id, blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <div style={{display:'flex', gap:'1rem'}}>
            <section style={{width:'13rem', height:'13rem'}}>
                <p>Step 1 - Add Media</p>
                <MediaWidgetDropzone setFiles={setFiles} />
            </section>
            <section style={{width:'auto'}}>
                <p>Step 2 - Resize Media</p>
                {files && files.length > 0 && (
                    <MediaWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </section>
            <section style={{width:'18rem'}}>
                <p>Step 3 - Preview & Upload</p>
                {files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ height:'13rem', overflow: 'hidden' }} />
                        <div>
                            <button onClick={onCrop}>Submit</button>
                            <button onClick={() => setFiles([])} >Cancel</button>
                        </div>
                    </>}
            </section>
        </div>
    )
}