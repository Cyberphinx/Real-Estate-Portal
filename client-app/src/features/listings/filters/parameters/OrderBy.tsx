import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../app/stores/store";
import './OrderBy.css';

export default observer(function OrderBy() {
    const { listingStore } = useStore();
    const { predicate, setPredicate } = listingStore;
    
    return (
        <div className="order-dropdown">
            <button className={predicate.get("orderBy") === "_" ? "option-button-selected" : "option-button"} 
            onClick={() => setPredicate("orderBy", "_")}>Newness</button>
            <button className={predicate.get("orderBy") === "priceDesc" ? "option-button-selected" : "option-button"} 
            onClick={() => setPredicate("orderBy", "priceDesc")}>Price high to low</button>
            <button className={predicate.get("orderBy") === "price" ? "option-button-selected" : "option-button"} 
            onClick={() => setPredicate("orderBy", "price")}>Price low to high</button>
        </div>
    )
});