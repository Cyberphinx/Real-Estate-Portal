import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../../app/hooks/useDetectOutsideClick";
import { useStore } from "../../../app/stores/store";
import './ListingFilters.css';
import Price from "./parameters/Price";
import PropertyTypes from "./parameters/PropertyTypes";
import Bedrooms from "./parameters/Bedrooms";

export default observer(function ListingFilters() {
    const { listingStore } = useStore();
    const { predicate, setPredicate } = listingStore;

    const items = ["Detached", "SemiDetached", "Terraced", "Flat", "Land"];

    const bedsRef = useRef(null);
    const [bedsPanel, setBedsPanel] = useDetectOutsideClick(bedsRef, false);
    const toggleBeds = () => setBedsPanel(!bedsPanel);

    return (
        <div className="filters-container">
            <section className="listing-filters-two">
                <article className="channel-container">
                    <button
                        className={predicate.get("channel") === "rent" ? "channel-button-selected rent" : "channel-button rent"}
                        onClick={() => setPredicate("channel", "rent")}>
                        RENT
                    </button>
                    <button
                        className={predicate.get("channel") === "sale" ? "channel-button-selected sale" : "channel-button sale"}
                        onClick={() => setPredicate("channel", "sale")}>
                        SALE
                    </button>
                </article>
                <Price onChange={(values: string[]) => setPredicate("minMaxPrice", values)} />
                <article className="bed-container" ref={bedsRef}>

                    <button className="bed-button" onClick={toggleBeds}>
                        <img className="bed-icon" src="/assets/property-icons/bedrooms.svg" alt="beds" />
                        {/* <span className={bedsPanel ? "dot-selected" : "dot"}></span> */}
                        {predicate.has("minMaxBeds") && (
                            <>
                                <span className="beds-dot">{predicate.get("minMaxBeds").toString().split(",")[0]}-{predicate.get("minMaxBeds").toString().split(",")[1]}</span>
                            </>
                        )}
                        <span className="beds-tooltip">No. of Bedrooms</span>
                    </button>
                    <Bedrooms onChange={(inputs: string[]) => setPredicate("minMaxBeds", inputs)} bedsPanel={bedsPanel} />
                </article>
                <PropertyTypes items={items} checked={predicate.get("propertyTypes")} onChange={(items: string[]) => setPredicate("propertyTypes", items)} />
            </section>
        </div>
    )
})