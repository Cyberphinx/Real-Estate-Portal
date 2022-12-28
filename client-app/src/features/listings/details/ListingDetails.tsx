import React, { useEffect, useRef, useState } from "react";
import './ListingDetails.css';
import { observer } from "mobx-react-lite";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import ContactForm from "../contactForm/ContactForm";
import { LifeCycleStatus, PropertyType, propertyType, RentalTerm, rentFrequency, rentFrequencyShort, UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";
import ListingBookmark from "./ListingBookmark";
import priceFormatter from "../../../app/common/PriceFormatter";
import { Content, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { dateFormatter, dateFormatterShort } from "../../../app/common/HelperFunctions";
import { UnitOfTime } from "../../../app/model/Membership";
import ListingGallery from "./ListingGallery";
import useSticky from "../../../app/hooks/useSticky";
import classNames from "classnames";
import ListingSummary from "./ListingSummary";
import ListingDetailedInfo from "./ListingDetailedInfo";

interface Props {
    listing: Listing | undefined;
}

export default observer(function ListingDetails({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings, contacts, setContacts } = listingStore;

    

    const multiListings: Listing[] = listings.filter(x => x.listingLocation.latitude === listing?.listingLocation.latitude && x.listingLocation.longitude === listing?.listingLocation.longitude);

    const [tab, setTab] = useState<number>(0);

    const features = [
        <ListingGallery listing={listing!} />,
        <ListingSummary listing={listing!} />,
        <ListingDetailedInfo listing={listing!} />,
        <div style={{padding:"60px 20px 20px 20px"}}>
            <ContactForm listing={listing} />
        </div>
    ]

    return (
        <div className="details-container"  >
            {multiListings.length > 1 && <ListingBookmark multiListings={multiListings} />}
            <div className="details-contents" style={(multiListings.length > 1) ? { marginTop: "60px" } : {}}>

                <nav className='sticky-nav-container' >
                    <div style={{margin:"0px 5px"}}>
                        <button className={tab === 0 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(0)}>Gallery</button>
                        <button className={tab === 1 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(1)}>Summary</button>
                        <button className={tab === 2 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(2)}>Details</button>
                        <button className={tab === 3 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(3)}>Contact Agent</button>
                    </div>
                </nav>

                

                {features[tab]}

                

                

            </div>
        </div>
    );
});