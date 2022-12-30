import React, { useState } from "react";
import './ListingTab.css';
import { observer } from "mobx-react-lite";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import ContactForm from "./ListingContact";
import ListingBookmark from "./ListingBookmark";
import ListingGallery from "./ListingOverview";
import ListingSummary from "./ListingFeatures";
import ListingDetails from "./ListingDetails";
import ListingContact from "./ListingContact";

interface Props {
    listing: Listing | undefined;
}

export default observer(function ListingTab({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings } = listingStore;

    const multiListings: Listing[] = listings.filter(x => x.listingLocation.latitude === listing?.listingLocation.latitude && x.listingLocation.longitude === listing?.listingLocation.longitude);

    const [tab, setTab] = useState<number>(0);

    const features = [
        <ListingGallery listing={listing!} />,
        <ListingSummary listing={listing!} />,
        <ListingDetails listing={listing!} />,
        <ListingContact listing={listing} />
    ]

    return (
        <div className="details-container"  >
            {multiListings.length > 1 && <ListingBookmark multiListings={multiListings} />}
            <nav className='sticky-nav-container' >
                <div style={{ margin: "0px 5px" }}>
                    <button className={tab === 0 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(0)}>Overview</button>
                    <button className={tab === 1 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(1)}>Features</button>
                    <button className={tab === 2 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(2)}>Details</button>
                    <button className={tab === 3 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(3)}>Contact Agent</button>
                </div>
            </nav>
            <div className="details-contents" style={(multiListings.length > 1) ? { marginTop: "60px" } : {}}>
                {features[tab]}
            </div>
        </div>
    );
});