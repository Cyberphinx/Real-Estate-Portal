import React, { useEffect, useState } from "react";
import './MediaUpload.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import MediaWidgetDropzone from "./MediaWidgetDropzone";
import { FormatBytes } from "./FormatBytes";
import { observer } from "mobx-react-lite";

interface Props {
    uploadMedia: (listingId: string, file: Blob) => void;
}

export default observer(function MediaUploadSimple({ uploadMedia }: Props) {
    const { listingStore } = useStore();
    const { uploading, files, setFiles } = listingStore;
    const { id } = useParams<string>();

    function onSubmit(blobs: Blob[]) {
        if (blobs) {
            if (id) blobs.forEach((blob: any) => uploadMedia(id, blob));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <div>
            <div className="media-upload__wrapper">
                <div style={{ width: '13rem', height: '13rem' }}>
                    <MediaWidgetDropzone setFiles={setFiles} />
                </div>
                {files && files.length > 0 && files.length <= 6 &&
                    files.map((file: any) => (
                        <div key={file.path} id='media-upload__preview-wrapper' style={{ position: 'relative' }}>
                            <img className="media-upload__preview"
                                style={file.size < 75000 ? { border: '3px solid #FF1E1E', margin: '-3px' } : {}}
                                src={file.preview} />
                            <span className="media-upload__preview-label">File size: {FormatBytes(file.size)}
                                {file.size < 75000 && <span style={{ color: '#FF1E1E' }}> - Too small</span>}
                            </span>
                            <button
                                className="media-upload__remove-button"
                                onClick={() => setFiles(files.filter((x: any) => x.path !== file.path))}
                            >Remove</button>
                        </div>
                    ))}
                {files && files.length > 6 &&
                    <p style={{ fontSize: '1.1252rem', margin: 'auto', textAlign: 'center' }}>Please upload <b>maximum 6 files</b> at a time</p>}
            </div>

            {files && files.length > 0 &&
                <div className="media-upload__button-container">
                    <button
                        className="media-upload__button"
                        onClick={() => onSubmit(files)}
                        disabled={files.length > 6 || files.some((x: any) => x.size < 75000)}
                    >
                        {uploading ? <span className="media-upload__submitting" /> : <span>Upload {files.length} files</span>}
                        {files.length <= 6 && files.some((x: any) => x.size < 75000) && <span className="media-upload__button-errors">Please upload files larger than 75kb</span>}
                        {files.length > 6 && <span className="media-upload__button-errors">Please upload up to 6 files at a time</span>}
                    </button>
                    <button
                        className="media-upload__button"
                        onClick={() => setFiles([])}
                    >
                        Cancel
                    </button>
                </div>}
        </div>

    )
})