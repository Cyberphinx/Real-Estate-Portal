import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { propertyOptions, propertyTypeOptions } from "../../../../app/common/form/options";
import { useStore } from "../../../../app/stores/store";
import './PropertyTypes.css';

interface Props {
    checked: string[];
    onChange: (items: string[]) => void;
    predicate: Map<any, any>;
}

export default observer(function PropertyTypes({ checked, onChange, predicate }: Props) {

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
            <div className="types-reset-button__wrapper" >
                <button className="types-reset-button"
                    onClick={() => {
                        setCheckedItems([]);
                        predicate.delete("propertyTypes");
                    }}
                >Reset</button>
            </div>

            {propertyTypeOptions.map((item: any) => (
                <div
                    key={item.value}
                    className={checkedItems.includes(item.value) ? "types-button-selected" : "types-button"}
                    onClick={() => handleChecked(item.value)}
                >
                    <input
                        type="checkbox"
                        checked={checkedItems.includes(item.value) ? true : false}
                        style={{ cursor: "pointer" }}
                    />
                    <label style={{ cursor: "pointer", paddingLeft: "3px" }}>{item.text}</label>
                </div>
            ))}

        </div>
    )
});