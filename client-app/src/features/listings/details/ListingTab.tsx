import React, { useState } from "react";
import './ListingTab.css';
import { observer } from "mobx-react-lite";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import ListingBookmark from "./ListingBookmark";
import ListingOverview from "./ListingOverview";
import ListingDetails from "./ListingDetails";
import WatchButton from "../../../app/common/WatchButton";
import ListingChangeLog from "./ListingChangeLog";

interface Props {
    listing: Listing | undefined;
}

export default observer(function ListingTab({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings } = listingStore;

    const multiListings: Listing[] = listings.filter(x => x.listingLocation.latitude === listing?.listingLocation.latitude && x.listingLocation.longitude === listing?.listingLocation.longitude);

    const [tab, setTab] = useState<number>(0);

    const features = [
        <ListingOverview listing={listing!} />,
        <ListingDetails listing={listing!} />,
        <ListingChangeLog listing={listing} />
    ]

    return (
        <div className="details-container"  >
            {multiListings.length > 1 && <ListingBookmark multiListings={multiListings} />}
            <nav className='sticky-nav-container' style={multiListings.length > 1 ? { top: "51px" } : {}} >
                <div style={{ margin: "0px 5px" }}>
                    <button className={tab === 0 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(0)}>Overview</button>
                    <button className={tab === 1 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(1)}>Details</button>
                    <button className={tab === 2 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(2)}>Change Log</button>
                </div>
                <div style={{ position: "absolute", top: "0.3rem", right: "3rem" }}>
                    <WatchButton listing={listing} />
                </div>
            </nav>
            <div 
            className="details-contents" 
            style={(multiListings.length > 1) 
                ? { marginTop: "90px", height:'calc(100vh - 275px)' } 
                : {height:'calc(100vh - 225px)'}}
            >
                {features[tab]}
            </div>
        </div>
    );
});