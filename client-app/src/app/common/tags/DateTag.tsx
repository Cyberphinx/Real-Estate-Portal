import React from "react";
import { Company } from "../../model/CompanyAggregate/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import './DateTag.css';

interface Props {
    listing: Listing | undefined | Company;
}

export default function DateTag({ listing }: Props) {
    const addedDate = new Date(listing!.addedOn);

    return (
        <div style={{ position: "relative" }}>
            <span className="date-tag" >
                {addedDate.toLocaleDateString()}
            </span>
        </div>
    );
}