import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import priceFormatter from "../../app/common/PriceFormatter";
import { Frequency, priceQualifier, propertyType, rentFrequency } from "../model/ListingAggregate/ListingEnums";

export default observer(function NavBar() {
    const { listingStore, featureStore } = useStore();
    const { selectedListing: listing } = listingStore;
    const { setDescription, setContacts } = featureStore;

    const address = `
        ${listing?.listingLocation.townOrCity && (listing?.listingLocation.townOrCity + ", ")}
        ${listing?.listingLocation.county && (listing?.listingLocation.county + ", ")}
        ${listing?.listingLocation.postalCode && (listing?.listingLocation.postalCode)}
        `;

    return (
        <div>
            <ul className="nav-bar2">
                <li className="nav-bar-item"><img className="logo-large" src="/assets/sanctum.svg" alt="S" /></li>
                <li className="nav-bar2-item"><Link to="/">SANCTUM</Link></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    <span>{listing?.pricing.transactionType.toString() === "Sale" && priceQualifier(listing!.pricing.priceQualifier)} </span>
                    <b>{listing && priceFormatter(listing.pricing.price!, listing.pricing.currency)} </b>
                    <span>{listing?.pricing.transactionType.toString() === "Rent" && rentFrequency(listing!)}</span>
                </p></li>
                <li className="nav-bar2-item">
                    {listing && <p className="gist-style">
                        {listing.totalBedrooms} Beds {propertyType(listing)}
                    </p>}
                </li>
                <li className="nav-bar2-item"><p className="address-style">{address}</p></li>

                {/* {isLoggedIn ? <li className="nav-bar2-item-right" ><button className="nav-bar-user">Logged in as: {user?.username}</button></li> : null} */}
                <li className="nav-bar2-item-right"><button className="nav-bar-button"
                    onClick={() => {
                        setContacts();
                    }}>
                    Contact agent
                </button></li>
                <li className="nav-bar2-item-right"><button className="nav-bar-button"
                    onClick={() => {
                        setDescription()
                    }}>
                    Description
                </button></li>
            </ul>
        </div>
    );
});
