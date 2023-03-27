import React from "react";
import { dateFormatter } from "../../../app/common/HelperFunctions";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { ChangeLog } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingContact.css';


interface Props {
    listing: Listing | undefined;
}

export default function ListingChangeLog({ listing }: Props) {

    return (
        <div className="agent-contacts-container">
            <h3>Ref: {listing?.listingReference}</h3>
            <h4>STag: {listing?.spiderTag}</h4>
            <h5>{listing?.sourceUri}</h5>
            {listing?.changeLogs &&
                listing.changeLogs.map((log: ChangeLog) => (
                    <div key={log.id}>
                        <hr />
                        <h4 style={{ fontWeight: "bold", color: "#000", fontSize: "1rem" }}>{dateFormatter(log.lastModified)}</h4>
                        <p style={{ fontSize: "0.85rem" }}>{log.description}</p>
                    </div>
                ))
            }
        </div>
    )
}