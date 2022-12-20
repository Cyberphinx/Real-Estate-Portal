import React from "react";
import { Company } from "../../model/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import './AgencyTag.css';

interface Props {
    listing: Listing | undefined;
}

export default function AgencyTag({ listing }: Props) {

    return (
        <div style={{ position: "relative" }}>
            <span className="agency-tag" >
                {listing?.company.displayName}
            </span>
        </div>
    );
}