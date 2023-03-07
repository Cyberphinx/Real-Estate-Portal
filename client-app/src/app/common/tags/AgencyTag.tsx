import React from "react";
import { Stock } from "../../model/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import './AgencyTag.css';

interface Props {
    listing: Listing | undefined;
    fontSize?: string;
}

export default function AgencyTag({ listing, fontSize }: Props) {

    function getAgencyName() {
        if (listing && listing.company && listing?.company.displayName) return listing?.company.displayName;
        else if (listing && listing.agency) return listing.agency;
        else return "Agency";
    }
    
    return (
        <div style={{ position: "relative" }}>
            <span className="agency-tag" style={{fontSize:fontSize}} >
                {getAgencyName()}
            </span>
        </div>
    );
}