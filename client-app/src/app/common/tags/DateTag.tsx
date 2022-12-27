import React from "react";
import { Company } from "../../model/Company";
import { Listing } from "../../model/ListingAggregate/Listing";
import './DateTag.css';

interface Props {
    listing: any;
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