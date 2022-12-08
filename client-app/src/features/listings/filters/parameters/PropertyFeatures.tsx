import { observer } from "mobx-react-lite";
import React from "react";
import { FeatureParams } from "../../../../app/model/Predicate";
import { useStore } from "../../../../app/stores/store";
import './Parameters.css';

export default observer(function PropertyFeatures() {
    const { listingStore } = useStore();
    const { predicate, setPredicate } = listingStore;
    
    return (
        <div className="filters-dropdown">
            <p>Property Features</p>
            <button className="option-button" >{FeatureParams[0]}</button>
            <button className="option-button" >{FeatureParams[1]}</button>
            <button className="option-button" >{FeatureParams[2]}</button>
            <button className="option-button" >{FeatureParams[3]}</button>
        </div>
    )
});