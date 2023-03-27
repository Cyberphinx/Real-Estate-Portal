import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { ListingMediaDto, DetailedDescription, KeyContact } from "../../../app/model/ListingAggregate/ListingObjects";
import { rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import Nav from "../../../app/layout/Nav";
import priceFormatter from "../../../app/common/PriceFormatter";
import ListingMediaModal from "./ListingMediaModal";
import { PascalToNormal } from "../../../app/common/HelperFunctions";

export default observer(function ListingDetailsPage() {
    const { id } = useParams<string>();
    const { listingStore, modalStore } = useStore();
    const { loadListing, loadingListing } = listingStore;
    const { openModal } = modalStore;

    const [currentListing, setCurrentListing] = useState<Listing | undefined>(undefined)

    useEffect(() => {
        if (id) loadListing(id).then(currentListing => setCurrentListing(new Listing(currentListing)));
        return () => setCurrentListing(undefined);
    }, [id, loadListing, setCurrentListing])

    const listingBigImages = currentListing?.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'));

    const address = `${currentListing?.company.companyAddress.propertyNumberOrName && (currentListing?.company.companyAddress.propertyNumberOrName + ", ")}
    ${currentListing?.company.companyAddress.streetName && (currentListing?.company.companyAddress.streetName + ", ")}
    ${currentListing?.company.companyAddress.locality && (currentListing?.company.companyAddress.locality + ", ")}
    ${currentListing?.company.companyAddress.townOrCity && (currentListing?.company.companyAddress.townOrCity + ", ")}
    ${currentListing?.company.companyAddress.county && (currentListing?.company.companyAddress.county + ", ")}
    ${currentListing?.company.companyAddress.postalCode && (currentListing?.company.companyAddress.postalCode)}
    `;


    if (loadingListing || !currentListing) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <Nav />
            <div className="listing-page__container">
                <section className="listing-page__section-one">
                    <div>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{priceFormatter(currentListing!.pricing.price!, currentListing!.pricing.currency)}</span>
                        {(currentListing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "16px" }}> {rentFrequency(currentListing!)} </span>}
                        <p style={{ fontSize: "1.25rem" }}>
                            {currentListing!.totalBedrooms} beds 
                            {currentListing.bathrooms > 0 && <span>{currentListing.bathrooms} baths</span>} {PascalToNormal(currentListing.propertyType.toString())}
                        </p>
                        <p style={{ fontSize: "1.25rem" }}>Address:</p>
                        <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{currentListing.listingLocation.displayAddress}</h1>
                    </div>
                    <hr />
                    {currentListing.keyContacts.length > 0 ?
                        currentListing.keyContacts.map((contact: KeyContact) => (
                            <div style={{ paddingTop: '1rem' }}>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{currentListing.company.displayName} - {contact.name}</h2>
                                <p style={{ fontSize: "1rem" }}>Phone:</p>
                                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>{contact.phone}</p>
                                {contact.mobile && <>
                                    <p style={{ fontSize: "1rem" }}>Mobile:</p>
                                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>{contact.mobile}</p>
                                </>}
                                <p style={{ fontSize: "1rem" }}>Email:</p>
                                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>{contact.email}</p>
                                <p style={{ fontSize: "1rem" }}>Address:</p>
                                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>{contact.address}</p>
                            </div>
                        ))
                        : <>
                            <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>{currentListing.company.displayName}</h2>
                            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Phone</p>
                            <p>{currentListing.company.companyContacts.phone}</p>
                            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Email</p>
                            <p>{currentListing.company && address}</p>
                        </>}
                </section>

                <section className="listing-page__section-two" id="listing-page__section-two" >
                    {listingBigImages && listingBigImages.map((media: ListingMediaDto) => (
                        <div className="listing-content__wrapper" key={media.id} onClick={() => openModal(<ListingMediaModal media={media} />)}>
                            <img src={media.url} alt={media.caption} className="content-image" />
                        </div>
                    ))}
                </section>

                <section className="listing-page__section-three">
                    {currentListing.detailedDescriptions.map((description: DetailedDescription) => (
                        <div key={description.id}>
                            <article>
                                <b className="listing-details-title">{description.heading}</b>
                                <span className="listing-details-dimensions">
                                    {description.area !== 0
                                        && ` (${description.length} x ${description.width} = ${description.area} sq ${description.unit})`}
                                </span>
                            </article>
                            <div dangerouslySetInnerHTML={{ __html: description.text }} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
});