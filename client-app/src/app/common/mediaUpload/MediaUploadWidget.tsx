import React, { useEffect, useState } from "react";
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
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadMedia(listingId!, blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <div>
            <section>
                <p>Step 1 - Add Media</p>
                <MediaWidgetDropzone setFiles={setFiles} />
            </section>
            <section>
                <p>Step 2 - Resize Media</p>
                {files && files.length > 0 && (
                    <MediaWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </section>
            <section>
                <p>Step 3 - Preview & Upload</p>
                {files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <div>
                            <button onClick={onCrop}>Submit</button>
                            <button onClick={() => setFiles([])} >Cancel</button>
                        </div>
                    </>}
            </section>
        </div>
    )
}