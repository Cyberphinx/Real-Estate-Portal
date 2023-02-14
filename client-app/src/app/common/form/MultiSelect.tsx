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
    const optionsRef = useRef(null);
    const [showOptions, setShowOptions] = useDetectOutsideClick(optionsRef, false);
    const toggleOptions = () => setShowOptions(!showOptions);
    const addOption = (item: any) => {
        let index: number = fieldValues!.indexOf(item.value);
        if (index === -1) {
            let newOptions = [...fieldValues!, item.value];
            setFieldValue(`${fieldName}`, newOptions);
        }

    }
    const removeOption = (space: any) => {
        let index: number = fieldValues!.indexOf(space, 0);
        if (index > -1) {
            let newOptions = fieldValues?.filter((x: any) => x !== space);
            setFieldValue(`${fieldName}`, newOptions);
        }
    };

    return (
        <div style={{ position: 'relative' }} ref={optionsRef}>
            <section className="multi-select">
                {fieldValues && fieldValues.map((item: any) => (
                    <button
                        className="multi-select__selected"
                        key={item.toString()}
                        onClick={() => removeOption(item)}
                        type="button"
                    >
                        {enumType[item.valueOf()] && <span>{enumType[item.valueOf()].charAt(0).toUpperCase()}</span>}
                        {enumType[item.valueOf()] ? <span>{enumType[item.valueOf()].toString().replace(/[A-Z]/g, ' $&').trim().slice(1)}</span>
                        : <span>{item.toString().replace(/[A-Z]/g, ' $&').trim()}</span>}
                    </button>
                ))}
                <span className="multi-select__input-label">{label}</span>
                {options.filter((x: any) => !fieldValues!.includes(x.value)).length === 0 ? null
                    : <button
                        className="multi-select__button-neutral"
                        onClick={toggleOptions}
                        style={showOptions === true ? { display: 'none' } : {}}
                        type="button"
                    >Add</button>}
                {fieldValues?.length === 0 && showOptions === true && <span style={{ fontSize: '1.125rem', color: 'grey' }}>Select items from below</span>}
            </section>
            {showOptions && <section className="multi-select-dropdown">
                {options.filter((x: any) => !fieldValues!.includes(x.value)).map((item: any) => (
                    <button
                        type="button"
                        key={item.value}
                        className="multi-select-options"
                        onClick={() => addOption(item)}
                    >
                        {item.text}
                    </button>
                ))}
            </section>}
        </div>
    )
}