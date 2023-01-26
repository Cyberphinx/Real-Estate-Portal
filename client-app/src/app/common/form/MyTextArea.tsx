import { useField } from "formik";
import React from "react";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    cols: number;
    label?: string;
    inputclassname: string;
    errorclassname: string;
    labelclassname?: string;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <div className="text-area-input-container">
            <label className={props.labelclassname}>{props.label}</label>
            <textarea className={props.inputclassname} {...field} {...props}/>
            {meta.touched && meta.error? (
                <p className={props.errorclassname}>{meta.error}</p>
            ): null}
        </div>
    )
}