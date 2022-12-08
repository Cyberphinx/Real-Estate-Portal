import { useField } from "formik";
import React from "react";
import './MySelectInput.css';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    selectclassname: string;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <div className="select-input-container">
            <label className="select-label">{props.label}</label>
            <select
                className={props.selectclassname}
                name={props.name}
                value={field.value}
                onChange={(event) => helpers.setValue(parseInt(event.target.value))}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            >
                {props.options.map((option: any) => {
                    return (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    );
                })}
            </select>
            {meta.touched && meta.error ? (
                <p className="login-error">{meta.error}</p>
            ) : null}
        </div>
    );
}