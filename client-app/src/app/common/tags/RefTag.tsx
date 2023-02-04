import React from "react";
import { Listing } from "../../model/ListingAggregate/Listing";
import './RefTag.css';

interface Props {
    listing: Listing | undefined;
}

export default function RefTag({ listing }: Props) {

    return (
        <div style={{ position: "relative" }}>
            <span className="ref-tag" >
                {listing?.listingReference}
            </span>
        </div>
    );
}