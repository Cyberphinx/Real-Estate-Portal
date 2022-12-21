import React from "react";
import { Listing } from "../../model/ListingAggregate/Listing";
import './AgencyTag.css';

interface Props {
    listing: Listing | undefined;
    fontSize?: string;
}

export default function AgencyTag({ listing, fontSize }: Props) {
    
    return (
        <div style={{ position: "relative" }}>
            <span className="agency-tag" style={{fontSize:fontSize}} >
                {listing?.company.displayName}
            </span>
        </div>
    );
}