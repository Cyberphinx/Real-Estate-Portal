import React from "react";
import { Listing } from "../../model/ListingAggregate/Listing";
import './AgencyTag.css';

interface Props {
    listing: Listing | undefined;
}

export default function AgencyTag({ listing }: Props) {

    return (
        <div style={{ position: "relative" }}>
            <span className="agency-tag" >
                {listing?.company.companyName}
            </span>
        </div>
    );
}