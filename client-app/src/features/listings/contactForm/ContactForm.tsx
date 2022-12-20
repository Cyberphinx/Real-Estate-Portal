import React from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import './ContactForm.css';


interface Props {
    listing: Listing | undefined;
}

export default function ContactForm({listing}:Props) {
    const address = `${listing?.company.companyAddress.propertyNumberOrName && (listing?.company.companyAddress.propertyNumberOrName + ", ")}
    ${listing?.company.companyAddress.streetName && (listing?.company.companyAddress.streetName + ", ")}
    ${listing?.company.companyAddress.locality && (listing?.company.companyAddress.locality + ", ")}
    ${listing?.company.companyAddress.townOrCity && (listing?.company.companyAddress.townOrCity + ", ")}
    ${listing?.company.companyAddress.county && (listing?.company.companyAddress.county + ", ")}
    ${listing?.company.companyAddress.postalCode && (listing?.company.companyAddress.postalCode)}
    `;

    return (
        <div className="agent-contacts-container">
            <h4>{listing?.company.displayName}</h4>
            <p>Phone: {listing?.company.companyContacts.phone}</p>
            <p>Email: {listing?.company.companyContacts.email}</p>
            <p>Address: {address}</p>
        </div>
    )
}