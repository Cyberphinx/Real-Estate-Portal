import React from "react";
import { Listing } from "../../model/ListingAggregate/Listing";
import './LifeCycleTag.css';

interface Props {
    listing: Listing | undefined;
}

export default function LifeCycleTag({ listing }: Props) {

    function LifeCycleColor(lifeCycleText: string) {
        switch (lifeCycleText) {
            case "ForSale":
                return { backgroundColor: '#38E54D' }
            case "ForRent":
                return { backgroundColor: '#38E54D' }
            case "UnderOffer":
                return { backgroundColor: '#FFED00' }
            case "ReferencesPending":
                return { backgroundColor: '#FFED00' }
            case "SoldSubjectToContract":
                return { backgroundColor: '#FFED00' }
            case "Sold":
                return { backgroundColor: '#E90064' }
            case "LetAgreed":
                return { backgroundColor: '#FFED00' }
            case "Let":
                return { backgroundColor: '#E90064' }
            case "OnHold":
                return { backgroundColor: '#DCDCDC' }
            case "OffMarket":
                return { backgroundColor: '#DCDCDC' }
            case "Other":
                return { backgroundColor: '#DCDCDC' }
            default:
                return { backgroundColor: '#FFED00' }
        }
    }

    function LifeCycleText(lifeCycleText: string) {
        switch (lifeCycleText) {
            case "Available":
                return "Available"
            case "UnderOffer":
                return "Under Offer"
            case "ReferencesPending":
                return "References Pending"
            case "SoldSubjectToContract":
                return "Sold STC"
            case "Sold":
                return "Sold"
            case "LetAgreed":
                return "Let Agreed"
            case "Let":
                return "Let"
            case "OnHold":
                return "On Hold"
            case "Other":
                return "Other"
            default:
                return "Available"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className="life-cycle-tag" style={listing && LifeCycleColor(listing.lifeCycleStatus.toString())}>
                {listing && LifeCycleText(listing.lifeCycleStatus.toString())}
            </span>
        </div>
    );
}