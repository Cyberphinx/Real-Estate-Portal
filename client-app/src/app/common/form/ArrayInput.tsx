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
        <div className="details__field-array" style={{ position: 'relative' }}>
            <span className="basic-info__input-label">{label}</span>
            <FieldArray
                name={fieldName}
                render={arrayHelpers => (
                    <div className="details__array-wrapper" >
                        {fieldValues && fieldValues.length > 0 ? (
                            fieldValues.map((item: any, index: number) => (
                                <div key={index} style={{ position: 'relative' }} >
                                    <Field name={`${fieldName}.${index}`} className="details__array-item" />
                                    <button
                                        type="button"
                                        className="details__array-button"
                                        onClick={() => arrayHelpers.remove(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : null}
                        <button className="details__button-neutral" type="button" onClick={() => arrayHelpers.push('')}>
                            Add
                        </button>
                    </div>
                )}
            />
        </div>
    )
}