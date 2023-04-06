import { observer } from "mobx-react-lite";
import React from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingDetails.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingDetails({ listing }: Props) {

    return (
        <div>
            {listing?.featureList &&
                <div className='listing-detailed-info-container'>
                    {listing?.featureList.map((feature: string, index: number) => (
                        <div key={index} style={{ marginBottom: '2rem' }}>
                            <article>
                                <b className="listing-details-title">{feature}</b>
                            </article>
                        </div>
                    ))}
                </div>}

            <div className='listing-detailed-info-container'>
                {listing?.detailedDescriptions.map((description: DetailedDescription) => (
                    <div key={description.id} style={{ marginBottom: '2rem' }}>
                        <article>
                            <b className="listing-details-title">{description.heading}</b>
                            <span className="listing-details-dimensions">
                                {description.area !== 0
                                    && ` (${description.length} x ${description.width} = ${description.area} sq ${description.unit})`}
                            </span>
                        </article>
                        <div dangerouslySetInnerHTML={{ __html: description.text }} />
                    </div>
                ))}
            </div>
        </div>
    )
})