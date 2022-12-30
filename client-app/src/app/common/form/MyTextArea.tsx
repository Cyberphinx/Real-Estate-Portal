import { useField } from "formik";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    cols: number;
    label?: string;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        // the double exclamation marks !! makes the object into a Boolean
        <div className="text-area-input-container">
            <label>{props.label}</label>
            <textarea className="text-area-input" {...field} {...props}/>
            {meta.touched && meta.error? (
                <p className="textarea-error">{meta.error}</p>
            ): null}
        </div>
    )
}