import { observer } from "mobx-react-lite";
import React from "react";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { LifeCycleStatus, RentalTerm, FurnishedState, CookerType, CouncilTaxBand, Utility } from "../../../app/model/ListingAggregate/ListingEnums";
import { UnitOfTime } from "../../../app/model/Membership";
import './ListingFeatures.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingFeatures({ listing }: Props) {
    return (
        <div>
            <article className="listing-features-container">
                    <p style={{fontWeight:"bold"}}>Basic information</p>
                    <p className="feature-text">Status: {LifeCycleStatus[listing!.lifeCycleStatus]}</p>
                    <p className="feature-text">New home: {listing?.newBuild}</p>
                    <p className="feature-text">House/Flat share: {listing?.sharedAccommodation}</p>
                    <p className="feature-text">Date added: {dateFormatterShort(listing!.addedOn)}</p>
                    <p className="feature-text">Date available: {dateFormatterShort(listing!.availableFromDate)}</p>
                    <p className="feature-text">Minimum contract length: {listing?.minimumContractLength} {UnitOfTime[listing!.minimumContractLengthUnits]}</p>
                    <p className="feature-text">Rental term: {RentalTerm[listing!.rentalTerm]}</p>
                    <div className="feature-text">All bills included: {listing.billsIncluded.map((bill: Utility, index: number) => (
                        <span key={index}>{Utility[bill]}, </span>
                    ))}</div>
                    <p className="feature-text">Council tax band: {CouncilTaxBand[listing.councilTaxBand]}</p>
                    <p className="feature-text">Business for sale: {listing.businessForSale}</p>
                    <p className="feature-text">Commercial use class: {listing.commercialUseClass}</p>
                    <p className="feature-text">Total floors: {listing.floors}</p>
                    <p className="feature-text">Floor levels: {listing?.floorLevels}</p>
                    <p className="feature-text">Condition: {listing?.decorativeCondition}</p>
                    <p className="feature-text">Accessibility: {listing.accessibility}</p>
                    <p className="feature-text">Pets allowed: {listing?.petsAllowed}</p>
                    <p className="feature-text">Smokers considered: {listing.smokersConsidered}</p>
                    <p className="feature-text">EPC rating: {listing.epcRatings.eerCurrentRating}</p>
            </article>

            <hr className="details-divider" />
            
            <article className="listing-features-container">
                <div>
                    <p style={{fontWeight:"bold"}}>Facilities:</p>
                    <p className="feature-text">Furnished state: {FurnishedState[listing.furnishedState]}</p>
                    <p className="feature-text">Burglar alarm: {listing.burglarAlarm}</p>
                    <p className="feature-text">Central heating: {listing.centralHeating}</p>
                    <p className="feature-text">Washing machine: {listing.washingMachine}</p>
                    <p className="feature-text">Fridge: {listing.fridge}</p>
                    <p className="feature-text">Freezer: {listing.freezer}</p>
                    <p className="feature-text">Conservatory: {listing.conservatory}</p>
                    <p className="feature-text">Double glazing: {listing.doubleGlazing}</p>
                    <p className="feature-text">Fireplace: {listing.fireplace}</p>
                    <p className="feature-text">Dishwasher: {listing.dishwasher}</p>
                    <p className="feature-text">Cooker type: {CookerType[listing.cookerType]}</p>
                </div>
            </article>

        </div>

    )
})