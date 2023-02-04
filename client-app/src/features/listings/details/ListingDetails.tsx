import { observer } from "mobx-react-lite";
import React from "react";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { CookerType, CouncilTaxBand, FurnishedState, LifeCycleStatus, RentalTerm, UnitOfLength, Utility } from "../../../app/model/ListingAggregate/ListingEnums";
import { DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { UnitOfTime } from "../../../app/model/Membership";
import { useStore } from "../../../app/stores/store";
import './ListingDetails.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingDetails({ listing }: Props) {

    return (
        <div>
            <article className='listing-detailed-info-container'>
                <h3 className="listing-details-title">Basic information</h3>
                <p className="listing-details-text">Status: {listing?.lifeCycleStatus}</p>
                {listing.newBuild ? <p className="listing-details-text">New home: Yes </p> : null}
                <p className="listing-details-text">House/Flat share: {listing?.sharedAccommodation}</p>
                <p className="listing-details-text">Date added: {dateFormatterShort(listing!.addedOn)}</p>
                <p className="listing-details-text">Date available: {dateFormatterShort(listing!.availableFromDate)}</p>
                <p className="listing-details-text">Minimum contract length: {listing?.minimumContractLength} {listing.minimumContractLengthUnits}</p>
                <p className="listing-details-text">Rental term: {listing.rentalTerm}</p>
                <div className="listing-details-text">All bills included: {listing.billsIncluded.map((bill: Utility, index: number) => (
                    <span key={index}>{Utility[bill]}, </span>
                ))}</div>
                <p className="listing-details-text">Council tax band: {listing.councilTaxBand}</p>
                <p className="listing-details-text">EPC rating: {listing.eerCurrentRating}</p>
            </article>

            <article className='listing-detailed-info-container'>
                <h3 className="listing-details-title">Tenant eligibility</h3>
                <p className="listing-details-text">Pets allowed: {listing?.petsAllowed}</p>
                <p className="listing-details-text">Smokers considered: {listing.smokersConsidered}</p>
                <p className="listing-details-text">Students allowed: {listing.tenantEligibilityStudents}</p>
                <p className="listing-details-text">DSS allowed: {listing.tenantEligibilityDss}</p>
            </article>

            <article className='listing-detailed-info-container'>
                <h3 className="listing-details-title">Facilities:</h3>
                <p className="listing-details-text">Furnished state: {listing.furnishedState}</p>
                <p className="listing-details-text">Accessibility: {listing.accessibility}</p>
                {listing?.decorativeCondition ? <p className="listing-details-text">Decorative condition: {listing?.decorativeCondition}</p> : null}
                {listing.floors ? <p className="listing-details-text">Total floors: {listing.floors}</p> : null}
                {listing?.floorLevels ? <p className="listing-details-text">Floor levels: {listing?.floorLevels}</p> : null}
                <p className="listing-details-text">Central heating: {listing.centralHeating}</p>
                <p className="listing-details-text">Cooker type: {listing.cookerType}</p>
            </article>

            <article className='listing-detailed-info-container'>
                <h3 className="listing-details-title">Commercial information</h3>
                <p className="listing-details-text">Business for sale: {listing.businessForSale}</p>
                <p className="listing-details-text">Commercial use class: {listing.commercialUseClass}</p>
            </article>

            {listing?.detailedDescriptions.map((description: DetailedDescription) => (
                <div key={description.id} className='listing-detailed-info-container'>
                    <article>
                        <b className="listing-details-title">{description.heading}</b>
                        <span className="listing-details-dimensions">
                            {description.area !== 0
                                && ` (${description.length} x ${description.width} = ${description.area} sq ${description.unit})`}
                        </span>
                    </article>
                    <p className="listing-details-text">{description.text}</p>
                </div>
            ))}
        </div>

    )
})