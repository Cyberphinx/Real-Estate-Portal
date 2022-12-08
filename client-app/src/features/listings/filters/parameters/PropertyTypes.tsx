import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import './PropertyTypes.css';

interface Props {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}

export default observer(function PropertyTypes({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <div className="types-container">
            {items.map((propertyType: string) => (
                <button
                    key={propertyType}
                    className={checkedItems.includes(propertyType) ? "types-button-selected" : "types-button"}
                    onClick={() => handleChecked(propertyType)}>
                    <img className="types-icon" src={`/assets/property-icons/${propertyType.toLowerCase()}.svg`} alt={propertyType} />
                    <span className={checkedItems.includes(propertyType) ? "types-dot-selected" : "types-dot"}></span>
                    {/* <img className="check-mark" src="/assets/check-mark.png" /> */}
                    <span className="types-tooltip">{propertyType}</span>
                </button>
            ))}
        </div>
    )
});