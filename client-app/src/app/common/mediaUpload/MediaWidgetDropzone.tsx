import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
    setFiles: (files: any) => void;
}

export default observer(function MediaWidgetDropzone({ setFiles }: Props) {
    const dzStyles = {
        border: 'dashed 3px grey',
        borderColor: '#000',
        borderRadius: '1rem',
        textAlign: 'center' as 'center',
        height: '12.5rem'
    }

    const dzActive = {
        borderColor: '#EA047E'
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} >
            <input {...getInputProps()} />
            {isDragActive ? <p style={{padding: '2rem',fontSize:'1.25rem'}}>Drop image here</p>
            : <p style={{padding: '2rem',fontSize:'1.25rem'}}>Drag and drop up to <b>6 files</b> here</p>} 
        </div>
    )
})