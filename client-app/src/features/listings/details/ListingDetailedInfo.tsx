import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatterShort } from "../../../app/common/HelperFunctions";
import priceFormatter from "../../../app/common/PriceFormatter";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { rentFrequency, propertyType, LifeCycleStatus, RentalTerm, UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";
import { Content, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { UnitOfTime } from "../../../app/model/Membership";
import { useStore } from "../../../app/stores/store";
import ContactForm from "../contactForm/ContactForm";
import './ListingDetailedInfo.css';

interface Props {
    listing: Listing;
}

export default observer(function ListingDetailedInfo({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings, contacts, setContacts } = listingStore;

    return (
        <div>
            <article className="detailed-info-container">
                <div>{listing?.detailedDescriptions.map((description: DetailedDescription) => (
                    <div key={description.id}>
                        <article style={{ paddingTop: "20px" }}>
                            <b >{description.heading}</b>
                            <span>
                                {description.area !== 0
                                    && ` (${description.length} x ${description.width} = ${description.area} sq ${UnitOfLength[description.unit]})`}
                            </span>
                        </article>
                        <p>{description.text}</p>
                    </div>
                ))}</div>
            </article>
        </div>

    )
})