import { observer } from "mobx-react-lite";
import React from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";
import { DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { useStore } from "../../../app/stores/store";
import './ListingDetails.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingDetails({ listing }: Props) {

    return (
        <div>
            <article className="detailed-info-container">
                <div>{listing?.detailedDescriptions.map((description: DetailedDescription) => (
                    <div key={description.id}>
                        <article>
                            <b className="listing-details-title">{description.heading}</b>
                            <span className="listing-details-dimensions">
                                {description.area !== 0
                                    && ` (${description.length} x ${description.width} = ${description.area} sq ${UnitOfLength[description.unit]})`}
                            </span>
                        </article>
                        <p className="listing-details-text">{description.text}</p>
                    </div>
                ))}</div>
            </article>
        </div>

    )
})