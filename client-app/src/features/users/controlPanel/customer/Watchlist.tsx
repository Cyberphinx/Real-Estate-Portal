import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import priceFormatter from "../../../../app/common/PriceFormatter";
import DateTag from "../../../../app/common/tags/DateTag";
import { useDetectOutsideClick } from "../../../../app/hooks/useDetectOutsideClick";
import { AccessStatus } from "../../../../app/model/AccessStatus";
import { Stock } from "../../../../app/model/Company";
import { PagingParams } from "../../../../app/model/Pagination";
import { useStore } from "../../../../app/stores/store";
import PropertyTypes from "../../../listings/filters/parameters/PropertyTypes";
import './Watchlist.css';


export default observer(function Watchlist() {
    const { profileStore, agentListingStore, userStore, featureStore, companyStore } = useStore();
    const { userCompanies, loadUserCompanies, loadingUserCompanies, activeTab } = profileStore;
    const { user, isLoggedIn } = userStore;
    const { loadAgentListings, loadingAgentListings, agentListings, predicate, setPredicate,
        setPagingParams, loadingNext, setLoadingNext, pagination, totalCount, countAgentListings } = agentListingStore;
    const { setActiveFeature } = featureStore;
    const { loadCompany, loadingCompany } = companyStore;

    const lifecycleStyle = (listing: Stock) => {
        switch (listing.lifeCycleStatus.toString()) {
            case "Available":
                return {background: '#00FFAB', color: '#000'}
            case "UnderOffer":
                return {background: '#FFCAC8', color: '#000'}
            case "LetAgreed":
                return {background: '#EB596E', color: '#fff'}
            case "SoldSubjectToContract":
                return {background: '#EB596E', color: '#fff'}
            case "Sold":
                return {background: '#D61C4E', color: '#fff'}
            case "Let":
                return {background: '#D61C4E', color: '#fff'}
        }
    }

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage = 12));
        loadAgentListings().then(() => setLoadingNext(false));
    }


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
        <div className="view-listings" id="agent-listings">

            <div className="view-listings__toolbar">
                {loadingCompany ? null
                    : <h1 className="view-listings__title">
                        <span style={{ color: '#6807F9', paddingLeft: '1rem' }}>You are watching {totalCount} listings</span>
                    </h1>}
            </div>

            <ul className="view-listings__filters">
                <li className='view-listings__filters-item'>
                    <div className="view-listings__button-group">
                        <button
                            className="view-listings__button"
                            style={predicate.get("channel") === "rent" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                            onClick={() => setPredicate("channel", "rent")}
                            disabled={predicate.get("channel") === "rent" ? true : false}
                        >For rent</button>
                        <button
                            className="view-listings__button"
                            style={predicate.get("channel") === "sale" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                            onClick={() => setPredicate("channel", "sale")}
                        >For sale</button>
                    </div>
                </li>

                <li className='view-listings__filters-item'>
                    <div ref={typesRef}>
                        <button
                            className={typesPanel ? "view-listings__filters-button-selected"
                                : (predicate.has("propertyTypes") ? "view-listings__filters-button-selected"
                                    : "view-listings__filters-button")}
                            onClick={toggleTypes}>
                            Property Type
                        </button>
                        {typesPanel && <PropertyTypes
                            checked={predicate.get("propertyTypes")}
                            onChange={(items: string[]) => setPredicate("propertyTypes", items)}
                            predicate={predicate}
                        />}
                    </div>
                </li>

                <li className='view-listings__filters-item'>
                    <input className="view-listings__input" placeholder="Enter listing reference" onChange={() => { }} />
                    <button className="view-listings__search-button">
                        <img src="/assets/search.svg" alt="ref" className="view-listings__search-icon" />
                    </button>
                </li>
            </ul>

            <div className="view-listing__container">
                {loadingAgentListings && !loadingNext ?
                    <div style={{ position: 'absolute', left: '40%', top: '60%' }}>
                        <LoadingComponent content={'Loading...'} />
                    </div>
                    :
                    agentListings.map((listing: Stock) => (
                        <div key={listing.id} className="view-listing__item">
                            <div className="view-listing__grid">
                                <Link to={`/listing/${listing?.id}`} target="_blank" className="view-listing__link">
                                    <DateTag listing={listing} />
                                    {listing.image ? <img className="agent-listing-image" src={listing.image} alt="property" />
                                        : <img className="agent-listing-image"
                                            src={'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg'}
                                            alt="property" />}
                                </Link>

                                <section style={{ position: 'relative', marginLeft: '2rem' }}>
                                    <article style={{ fontSize: '1.25rem' }}>
                                        <b>{priceFormatter(listing.pricing.price!, listing.pricing.currency)} </b>
                                        {listing.pricing.transactionType === 0 &&
                                            <span>({listing.pricing.rentFrequency.toString().replace(/[A-Z]/g, ' $&').trim()})</span>}
                                        <span> for </span>
                                        <b>{listing.pricing.transactionType}</b>
                                        <span> - {listing.listingLocation.townOrCity}, {listing.listingLocation.postalCode}</span>
                                    </article>

                                    <article style={{ position: 'absolute', top: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <span className="view-listing__reference" >
                                            {listing.listingReference}
                                        </span>
                                        <span className="view-listing__reference"
                                            style={(listing.accessStatus.toString() === 'Private' || AccessStatus[listing.accessStatus] === 'Private') ?
                                                { background: '#EEEEEE', color: '#000' }
                                                : { background: '#FBCB0A', color: '#000' }} >
                                            {listing.accessStatus}
                                        </span>
                                        <span className="view-listing__reference" style={lifecycleStyle(listing)} >
                                            {listing.lifeCycleStatus}
                                        </span>
                                    </article>

                                    <article style={{ padding: '5rem 5rem 0 0', fontSize: '1.125rem' }}>
                                        <p>{listing.propertyType.toString().replace(/[A-Z]/g, ' $&').trim()}</p>
                                        <p>{listing.totalBedrooms} bedrooms, {listing.bathrooms} bathrooms</p>
                                        <p>{listing.listingLocation.displayAddress}</p>
                                    </article>
                                </section>
                            </div>
                            <button className="view-listing__edit-button" onClick={() => setActiveFeature(2)}>
                                <Link to={`/manage/${listing.id}`} target="_blank"
                                    style={{ color: '#fff', textDecoration: 'none' }}
                                >Edit</Link>
                            </button>
                        </div>
                    ))
                }
            </div>

            {agentListings.length > 0 ?
                <div className="agent-listing-pagination-container">
                    <p style={{ fontSize: "1.25rem" }}>
                        Showing
                        {agentListings.length !== pagination?.totalItems && <span>{agentListings.length} of </span>}
                        <span> {pagination?.totalItems} items</span>
                    </p>
                    {agentListings.length > 12 && <button
                        className={loadingNext ? "agent-listing-loading-button" : "agent-listing-load-button"}
                        onClick={() => handleGetNext()}
                    >
                        {loadingNext && <span className="loading-next"></span>}
                        Load 12 more
                    </button>}
                </div>
                : (loadingAgentListings ? null : <p style={{ fontSize: "1.25rem", textAlign: 'center' }}>Select a branch to view its listings.</p>)}

            <div style={{ margin: "auto", bottom: "1rem" }}>
                <p style={{ textAlign: "center", fontSize: "0.85rem" }}>Contact us: info@sanctum.co.uk</p>
                <p style={{ textAlign: "center", fontSize: "0.75rem" }}>© {new Date().getFullYear()} Cerberus Cybernetics Ltd., All Rights Reserved.</p>
            </div>
        </div>
    )
})