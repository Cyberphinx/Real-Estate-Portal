import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../../../app/stores/store";
import './PropertyTypes.css';

interface Props {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}

export default observer(function PropertyTypes({ items, checked, onChange }: Props) {
    const { listingStore } = useStore();
    const { predicate, maxValues } = listingStore;
    
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
        <div className="types-dropdown">
            {items.map((propertyType: string, index: number) => (
                <div
                    key={index}
                    className={checkedItems.includes(propertyType) ? "types-button-selected" : "types-button"}
                    onClick={() => handleChecked(propertyType)}
                >
                    <input
                        type="checkbox"
                        checked={checkedItems.includes(propertyType) ? true : false}
                        style={{ cursor: "pointer" }}
                    />
                    <label style={{ cursor: "pointer", paddingLeft:"3px" }}>{propertyType}</label>
                </div>
            ))}
            <button className="types-reset-button" 
            onClick={() => {
                setCheckedItems([]);
                predicate.delete("propertyTypes");
            }}
                >Reset</button>
        </div>
    )
});