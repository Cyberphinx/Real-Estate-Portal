import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../../app/hooks/useDetectOutsideClick";
import { useStore } from "../../../app/stores/store";
import './ListingFilters.css';
import Price from "./parameters/Price";
import PropertyTypes from "./parameters/PropertyTypes";
import Bedrooms from "./parameters/Bedrooms";
import OrderBy from "./parameters/OrderBy";
import { Link } from "react-router-dom";
import { Job } from "../../../app/model/Job";

export default observer(function ListingFilters() {
    const { listingStore, featureStore, jobStore } = useStore();
    const { predicate, setPredicate } = listingStore;
    const { isLocked, setLocked } = featureStore;
    const { jobs } = jobStore;

    const items = ["Detached", "SemiDetached", "Terraced", "Flat", "Land"];

    const bedsRef = useRef(null);
    const [bedsPanel, setBedsPanel] = useDetectOutsideClick(bedsRef, false);
    const toggleBeds = () => {
        setBedsPanel(!bedsPanel);
    };

    const priceRef = useRef(null);
    const [pricePanel, setPricePanel] = useDetectOutsideClick(priceRef, false);
    const togglePrice = () => {
        setBedsPanel(false);
        setPricePanel(!pricePanel);
    };

    const typesRef = useRef(null);
    const [typesPanel, setTypesPanel] = useDetectOutsideClick(typesRef, false);
    const toggleTypes = () => {
        setBedsPanel(false);
        setPricePanel(false);
        setTypesPanel(!typesPanel);
    };

    const sortingRef = useRef(null);
    const [sortingActive, setSortingActive] = useDetectOutsideClick(sortingRef, false);
    const toggleSorting = () => setSortingActive(!sortingActive);

    return (
        //     <section className="listing-filters-two">
        //         <PropertyTypes items={items} checked={predicate.get("propertyTypes")} onChange={(items: string[]) => setPredicate("propertyTypes", items)} />
        //     </section>
        <div className="filters-container">
            <ul className="filters-buttons-container">
                <li className="filters-item" >
                    <button className={predicate.get("channel") === "rent" ? "filters-button-selected" : "filters-button"}
                        onClick={() => setPredicate("channel", "rent")}>
                        Rent
                    </button>
                </li>
                <li className="filters-item" style={{borderRight:"1px solid #aaaeb3",paddingBottom:"5px",paddingRight:"10px",marginRight:"10px"}}>
                    <button className={predicate.get("channel") === "sale" ? "filters-button-selected" : "filters-button"}
                        onClick={() => setPredicate("channel", "sale")}>
                        Sale
                    </button>
                </li>
                <li className="filters-item" >
                    <div ref={priceRef}>
                        <button
                            className={pricePanel ? "filters-button-selected"
                                : (predicate.has("minMaxPrice") ? "filters-button-selected"
                                    : "filters-button")}
                            onClick={togglePrice}>
                            Price
                        </button>
                        {pricePanel && <Price
                            onChange={(inputs: string[]) => setPredicate("minMaxPrice", inputs)}
                        />}
                    </div>

                </li>
                <li className="filters-item" >
                    <div ref={bedsRef}>
                        <button
                            className={bedsPanel ? "filters-button-selected"
                                : (predicate.has("minMaxBeds") ? "filters-button-selected"
                                    : "filters-button")}
                            onClick={toggleBeds}>
                            Beds
                        </button>
                        {bedsPanel && <Bedrooms
                            onChange={(inputs: string[]) => setPredicate("minMaxBeds", inputs)}
                        />}
                    </div>

                </li>
                <li className="filters-item" >
                    <div ref={typesRef}>
                        <button
                            className={typesPanel ? "filters-button-selected"
                                : (predicate.has("propertyTypes") ? "filters-button-selected"
                                    : "filters-button")}
                            onClick={toggleTypes}>
                            Property Type
                        </button>
                        {typesPanel && <PropertyTypes
                            items={items}
                            checked={predicate.get("propertyTypes")}
                            onChange={(items: string[]) => setPredicate("propertyTypes", items)}
                        />}
                    </div>
                </li>
                <li className="filters-item" >
                    <button className="filters-button">Filters</button>
                </li>

                {/* {jobs.map((job: Job, index: number) => (
                    <li key={job.id}>
                        <button><Link to={`/job/${job?.id}`} target="_blank">Job{index}</Link></button>
                    </li>
                ))} */}

                <li className="filters-item-right">
                    <button className="lock-button" onClick={() => setLocked()}>
                        {isLocked === true ?
                            <div>
                                <img className="lock-icon" src="/assets/static.svg" alt="lock" />
                                <span className="lock-tooltip">Static list </span>
                            </div>
                            : <div>
                                <img className="lock-icon" src="/assets/dynamic.svg" alt="lock" />
                                <span className="lock-tooltip">Dynamic list</span>
                            </div>}
                    </button>
                </li>
                <li className="filters-item-right">
                    <div className="sort-button-container" ref={sortingRef}>
                        <button className="sort-button" onClick={toggleSorting}>
                            <img className="sort-icon" src="/assets/sort.svg" alt="sort" />
                            <span className="sort-tooltip">Sort by</span>
                        </button>
                        {sortingActive && <OrderBy />}
                    </div>
                </li>
            </ul>
        </div>
    )
})