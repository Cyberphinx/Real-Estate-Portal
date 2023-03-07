import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import './ListingContact.css';


interface Props {
    listing: Listing | undefined;
}

export default function ListingContact({ listing }: Props) {
    // const address = `${listing?.company.companyAddress.propertyNumberOrName && (listing?.company.companyAddress.propertyNumberOrName + ", ")}
    // ${listing?.company.companyAddress.streetName && (listing?.company.companyAddress.streetName + ", ")}
    // ${listing?.company.companyAddress.locality && (listing?.company.companyAddress.locality + ", ")}
    // ${listing?.company.companyAddress.townOrCity && (listing?.company.companyAddress.townOrCity + ", ")}
    // ${listing?.company.companyAddress.county && (listing?.company.companyAddress.county + ", ")}
    // ${listing?.company.companyAddress.postalCode && (listing?.company.companyAddress.postalCode)}
    // `;

    const address = "";

    return (
        <div className="agent-contacts-container">
            {listing?.company &&
                <>
                    <Link to={`/company/${listing?.company.id}`} target="_blank" style={{ textDecoration: "none" }} >
                        <h1 style={{ fontWeight: "bold", color: "#000", fontSize: "1.25rem" }}>{listing?.company.displayName}</h1>
                    </Link>
                    {/* <img src={listing?.company.logo} style={{float:"right"}} alt="logo"/> */}
                    <p style={{ fontSize: "14px" }}>Phone: {listing?.company.companyContacts.phone}</p>
                    <p style={{ fontSize: "14px" }}>Email: {listing?.company.companyContacts.email}</p>
                    <p style={{ fontSize: "14px" }}>Address: {listing?.company && address}</p>
                </>}
        </div>
    )
}