import React from "react";
import { Listing } from "../../model/ListingAggregate/Listing";
import './LifeCycleTag.css';

interface Props {
    listing: Listing | undefined;
}

export default function LifeCycleTag({ listing }: Props) {

    function LifeCycleColor(lifeCycleText: string) {
        switch (lifeCycleText) {
            case "Available":
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
            case "Other":
                return { backgroundColor: '#FFED00' }
            default:
                return { backgroundColor: '#FFED00' }
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className="life-cycle-tag" style={listing && LifeCycleColor(listing.lifeCycleStatus.toString())}>
                {listing?.lifeCycleStatus.toString()}
            </span>
        </div>
    );
}