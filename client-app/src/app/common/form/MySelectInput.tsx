import { useField } from "formik";
import React from "react";
import './MySelectInput.css';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    selectclassname: string;
    errorclassname?: string;
    labelclassname?: string;
    onChange?: (e: any) => void;
    value?: any;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <div className={props.labelclassname}>
            <label className="select-label">{props.label}</label>
            <select
                className={props.selectclassname}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            >
                {props.options.map((option: any) => {
                    return (
                        <option key={option.value} value={option.value} >{option.text}</option>
                    );
                })}
            </select>
            {meta.touched && meta.error ? (
                <p className={props.errorclassname}>{meta.error}</p>
            ) : null}
        </div>
    );
}