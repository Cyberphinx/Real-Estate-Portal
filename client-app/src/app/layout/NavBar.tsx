import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import priceFormatter from "../../app/common/PriceFormatter";
import { priceQualifier, propertyType } from "../model/ListingAggregate/ListingEnums";

export default observer(function NavBar() {
    const { listingStore, featureStore } = useStore();
    const { loadedListing } = listingStore;
    const { setDescription, setContacts } = featureStore;

    const address = `
        ${loadedListing?.listingLocation.townOrCity && (loadedListing?.listingLocation.townOrCity + ", ")}
        ${loadedListing?.listingLocation.county && (loadedListing?.listingLocation.county + ", ")}
        ${loadedListing?.listingLocation.postalCode && (loadedListing?.listingLocation.postalCode)}
        `;

    return (
        <div>
            <ul className="nav-bar2">
                {/* <li className="nav-bar-item"><img className="logo" src="/assets/logo3.svg" alt="logo" /></li> */}
                <li className="nav-bar2-item"><Link to="/">SANCTUM</Link></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    {priceQualifier(loadedListing!)} <b>{priceFormatter(loadedListing!.pricing.price, loadedListing!.pricing.currency)}</b>
                </p></li>
                <li className="nav-bar2-item"><p className="gist-style">
                    {loadedListing!.totalBedrooms} Beds {propertyType(loadedListing!)}
                </p></li>
                <li className="nav-bar2-item"><p className="address-style">{address}</p></li>

                {/* {isLoggedIn ? <li className="nav-bar2-item-right" ><button className="nav-bar-user">Logged in as: {user?.username}</button></li> : null} */}
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setContacts()}>Contact agent</button></li>
                <li className="nav-bar2-item-right"><button className="nav-bar-button" onClick={() => setDescription()}>Description</button></li>
            </ul>
        </div>
    );
});
