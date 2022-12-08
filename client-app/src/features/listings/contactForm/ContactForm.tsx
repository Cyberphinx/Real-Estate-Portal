import React from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import './ContactForm.css';


interface Props {
    listing: Listing | undefined;
}

export default function ContactForm({listing}:Props) {

    return (
        <div className="agent-contacts-container">
            <h4>{listing?.company.companyName}</h4>
            <p>Phone: {listing?.company.companyContacts.phone}</p>
            <p>Email: {listing?.company.companyContacts.email}</p>
        </div>
    )
}