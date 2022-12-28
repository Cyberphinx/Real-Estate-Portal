import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";
import priceFormatter from "../../../app/common/PriceFormatter";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { rentFrequency, propertyType, LifeCycleStatus, RentalTerm, UnitOfLength, propertyTypeLong, FurnishedState, CookerType, CouncilTaxBand, Utility } from "../../../app/model/ListingAggregate/ListingEnums";
import { Content, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { UnitOfTime } from "../../../app/model/Membership";
import { useStore } from "../../../app/stores/store";
import ContactForm from "../contactForm/ContactForm";
import './ListingSummary.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingSummary({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings, contacts, setContacts } = listingStore;

    const address = `${listing?.listingLocation.propertyNumberOrName && (listing?.listingLocation.propertyNumberOrName + ", ")}
        ${listing?.listingLocation.streetName && (listing?.listingLocation.streetName + ", ")}
        ${listing?.listingLocation.locality && (listing?.listingLocation.locality + ", ")}
        ${listing?.listingLocation.townOrCity && (listing?.listingLocation.townOrCity + ", ")}
        ${listing?.listingLocation.county && (listing?.listingLocation.county + ", ")}
        ${listing?.listingLocation.postalCode && (listing?.listingLocation.postalCode)}
        `;


    return (
        <div>
            <article className="header-container">
                <div className="header-one">
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{priceFormatter(listing!.pricing.price, listing!.pricing.currency)}</span>
                    {listing?.pricing.transactionType === 0 && <span style={{ fontSize: "16px" }}> {rentFrequency(listing!)} </span>}
                    <p style={{ fontSize: "16px"}}>{listing!.totalBedrooms} beds {listing.bathrooms} baths {propertyTypeLong(listing!)}</p>
                    <p style={{ fontSize: "14px" }}>Address: {address}</p>
                </div>
                {/* {!contacts && <div className="header-three">
                    <button className="contact-button" onClick={() => setContacts(true)}>Contact agent</button>
                </div>}
                {contacts && <div className="header-four">
                    {contacts && <ContactForm listing={listing} />}
                </div>} */}
            </article>

            <hr className="details-divider" />

            <article className="listing-summary-container">
                <div>
                    <p className="summary-text">Status: {LifeCycleStatus[listing!.lifeCycleStatus]}</p>
                    <p className="summary-text">New home: {listing?.newBuild}</p>
                    <p className="summary-text">House/Flat share: {listing?.sharedAccommodation}</p>
                    <p className="summary-text">Date added: {dateFormatterShort(listing!.addedOn)}</p>
                    <p className="summary-text">Date available: {dateFormatterShort(listing!.availableFromDate)}</p>
                    <p className="summary-text">Minimum contract length: {listing?.minimumContractLength} {UnitOfTime[listing!.minimumContractLengthUnits]}</p>
                    <p className="summary-text">Rental term: {RentalTerm[listing!.rentalTerm]}</p>
                    <div className="summary-text">All bills included: {listing.billsIncluded.map((bill: Utility, index: number) => (
                        <span key={index}>{Utility[bill]}, </span>
                    ))}</div>
                    <p className="summary-text">Council tax band: {CouncilTaxBand[listing.councilTaxBand]}</p>
                    <p className="summary-text">Business for sale: {listing.businessForSale}</p>
                    <p className="summary-text">Commercial use class: {listing.commercialUseClass}</p>
                </div>
            </article>

            <hr className="details-divider" />
            
            <article className="listing-summary-container">
                <div>
                    <p className="summary-text">Total floors: {listing.floors}</p>
                    <p className="summary-text">Floor levels: {listing?.floorLevels}</p>
                    <p className="summary-text">Condition: {listing?.decorativeCondition}</p>
                    <p className="summary-text">Accessibility: {listing.accessibility}</p>
                    <p className="summary-text">Pets allowed: {listing?.petsAllowed}</p>
                    <p className="summary-text">Smokers considered: {listing.smokersConsidered}</p>
                    <p className="summary-text">EPC rating: {listing.epcRatings.eerCurrentRating}</p>
                </div>
            </article>

            <hr className="details-divider" />
            
            <article className="listing-summary-container">
                <div>
                    <p>Facilities:</p>
                    <p className="summary-text">Furnished state: {FurnishedState[listing.furnishedState]}</p>
                    <p className="summary-text">Burglar alarm: {listing.burglarAlarm}</p>
                    <p className="summary-text">Central heating: {listing.centralHeating}</p>
                    <p className="summary-text">Washing machine: {listing.washingMachine}</p>
                    <p className="summary-text">Fridge: {listing.fridge}</p>
                    <p className="summary-text">Freezer: {listing.freezer}</p>
                    <p className="summary-text">Conservatory: {listing.conservatory}</p>
                    <p className="summary-text">Double glazing: {listing.doubleGlazing}</p>
                    <p className="summary-text">Fireplace: {listing.fireplace}</p>
                    <p className="summary-text">Dishwasher: {listing.dishwasher}</p>
                    <p className="summary-text">Cooker type: {CookerType[listing.cookerType]}</p>
                </div>
            </article>

        </div>

    )
})