import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { ListingFormValues } from "../../model/ListingAggregate/Listing";
import './MultiSelect.css';

interface Props {
    values?: ListingFormValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    fieldName: string;
    fieldValues: any;
    enumType: any;
    options: any;
    label: string;
}

export default function MultiSelect({ setFieldValue, fieldName, fieldValues, options, enumType, label }: Props) {
    const spacesRef = useRef(null);
    const [showSpaces, setShowSpaces] = useDetectOutsideClick(spacesRef, false);
    const toggleSpaces = () => setShowSpaces(!showSpaces);
    const addSpace = (item: any) => {
        let index: number = fieldValues!.indexOf(item.value);
        if (index === -1) {
            let newSpaces = [...fieldValues!, item.value];
            setFieldValue(`${fieldName}`, newSpaces);
        }

    }
    const removeSpace = (space: any) => {
        let index: number = fieldValues!.indexOf(space, 0);
        if (index > -1) {
            let newSpaces = fieldValues?.filter((x: any) => x !== space);
            setFieldValue(`${fieldName}`, newSpaces);
        }
    };

    return (
        <div style={{ position: 'relative' }} ref={spacesRef}>
            <section className="details__multi-select">
                {fieldValues && fieldValues!.map((item: any) => (
                    <button
                        className="details__multi-select__selected"
                        key={item.toString()}
                        onClick={() => removeSpace(item)}
                        type="button"
                    >
                        <span>{enumType[item.valueOf()].charAt(0).toUpperCase()}</span>
                        <span>{enumType[item.valueOf()].toString().replace(/[A-Z]/g, ' $&').trim().slice(1)}</span>
                    </button>
                ))}
                <span className="multiselect__input-label">{label}</span>
                {options.filter((x: any) => !fieldValues!.includes(x.value)).length === 0 ? null
                    : <button
                        className="details__button-neutral"
                        onClick={toggleSpaces}
                        style={showSpaces === true ? { display: 'none' } : {}}
                        type="button"
                    >Add</button>}
                {fieldValues?.length === 0 && showSpaces === true && <span style={{ fontSize: '1.125rem', color: 'grey' }}>Select items from below</span>}
            </section>
            {showSpaces && <section className="details__multi-select-dropdown">
                {options.filter((x: any) => !fieldValues!.includes(x.value)).map((item: any) => (
                    <button
                        type="button"
                        key={item.value}
                        className="details__multi-select-options"
                        onClick={() => addSpace(item)}
                    >
                        {item.text}
                    </button>
                ))}
            </section>}
        </div>
    )
}