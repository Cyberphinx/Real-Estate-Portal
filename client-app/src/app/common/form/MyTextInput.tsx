import { useField } from "formik";
import React from "react";
import './MyTextInput.css';

interface Props {
    placeholder?: string;
    name: string;
    type?: string;
    label?: string;
    value?: string;
    disabled?: any;
    list?: string;
    inputclassname: string;
    errorclassname: string;
    labelclassname?: string;
    onChange?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    validate?: (value: any) => undefined | string | Promise<any>;
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <div className="text-input-container">
            <label className={props.labelclassname}>{props.label}</label>
            <input className={props.inputclassname} {...field} {...props} />
            {meta.touched && meta.error ? (
                <p className={props.errorclassname}>{meta.error}</p>
            ) : null}
        </div>
    )
}