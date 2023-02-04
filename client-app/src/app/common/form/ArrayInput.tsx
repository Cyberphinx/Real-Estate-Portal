import { Field, FieldArray } from "formik";
import React from "react";
import './ArrayInput.css';

interface Props {
    fieldName: string;
    fieldValues: any;
    label: string;
}

export default function MultiSelect({ fieldName, fieldValues, label }: Props) {

    return (
        <div className="array-input" style={{ position: 'relative' }}>
            <span className="array-input__label">{label}</span>
            <FieldArray
                name={fieldName}
                render={arrayHelpers => (
                    <div className="array-input__wrapper" >
                        {fieldValues && fieldValues.length > 0 ? (
                            fieldValues.map((item: any, index: number) => (
                                <div key={index} style={{ position: 'relative' }} >
                                    <Field name={`${fieldName}.${index}`} className="array-input__item" />
                                    <button
                                        type="button"
                                        className="array-input__button"
                                        onClick={() => arrayHelpers.remove(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : null}
                        <button className="array-input__button-neutral" type="button" onClick={() => arrayHelpers.push('')}>
                            Add
                        </button>
                    </div>
                )}
            />
        </div>
    )
}