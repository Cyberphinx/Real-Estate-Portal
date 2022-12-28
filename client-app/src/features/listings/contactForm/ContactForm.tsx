import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import './ContactForm.css';


interface Props {
    listing: Listing | undefined;
}

export default function ContactForm({ listing }: Props) {
    const address = `${listing?.company.companyAddress.propertyNumberOrName && (listing?.company.companyAddress.propertyNumberOrName + ", ")}
    ${listing?.company.companyAddress.streetName && (listing?.company.companyAddress.streetName + ", ")}
    ${listing?.company.companyAddress.locality && (listing?.company.companyAddress.locality + ", ")}
    ${listing?.company.companyAddress.townOrCity && (listing?.company.companyAddress.townOrCity + ", ")}
    ${listing?.company.companyAddress.county && (listing?.company.companyAddress.county + ", ")}
    ${listing?.company.companyAddress.postalCode && (listing?.company.companyAddress.postalCode)}
    `;

    return (
        <div className="agent-contacts-container">
            <Link to={`/company/${listing?.company.id}`} target="_blank" style={{ textDecoration: "none" }} >
                <h4 style={{ fontWeight: "600", color: "#000", fontSize:"18px" }}>{listing?.company.displayName}</h4>
            </Link>
            {/* <img src={listing?.company.logo} style={{float:"right"}} alt="logo"/> */}
            <p style={{fontSize:"14px"}}>Phone: {listing?.company.companyContacts.phone}</p>
            <p style={{fontSize:"14px"}}>Email: {listing?.company.companyContacts.email}</p>
            <p style={{fontSize:"14px"}}>Address: {address}</p>
        </div>
    )
}