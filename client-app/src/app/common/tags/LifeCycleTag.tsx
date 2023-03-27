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
                return { display: 'none' }
            case "ForRent":
                return { display: 'none' }
            case "UnderOffer":
                return { backgroundColor: '#dcdcdc', color:'#505050', border:'1px solid white' }
            case "ReferencesPending":
                return { backgroundColor: '#dcdcdc', color:'#505050', border:'1px solid white' }
            case "SoldSubjectToContract":
                return { backgroundColor: '#dcdcdc', color:'#505050', border:'1px solid white' }
            case "LetAgreed":
                return { backgroundColor: '#dcdcdc', color:'#505050', border:'1px solid white' }
            case "Sold":
                return { backgroundColor: 'black', color:'white' }
            case "Let":
                return { backgroundColor: 'black', color:'white' }
            case "OnHold":
                return { backgroundColor: '#dcdcdc' }
            case "OffMarket":
                return { backgroundColor: '#dcdcdc' }
            case "Other":
                return { backgroundColor: '#dcdcdc' }
            default:
                return { backgroundColor: '#FFED00' }
        }
    }

    function LifeCycleText(lifeCycleText: string) {
        switch (lifeCycleText) {
            case "ForSale":
                return "For Sale"
            case "ForRent":
                return "For Rent"
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
            case "OffMarket":
                return "Off Market"
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