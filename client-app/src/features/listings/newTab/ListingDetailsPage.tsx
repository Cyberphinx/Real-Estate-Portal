import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { ListingMediaDto, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { propertyTypeLong, rentFrequency, UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import Nav from "../../../app/layout/Nav";
import priceFormatter from "../../../app/common/PriceFormatter";
import ListingMediaModal from "./ListingMediaModal";

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


    if (loadingListing || !currentListing) return <LoadingComponent content={"Loading..."} />;

    const address = `${currentListing?.listingLocation.propertyNumberOrName && (currentListing?.listingLocation.propertyNumberOrName + ", ")}
        ${currentListing?.listingLocation.streetName && (currentListing?.listingLocation.streetName + ", ")}
        ${currentListing?.listingLocation.locality && (currentListing?.listingLocation.locality + ", ")}
        ${currentListing?.listingLocation.townOrCity && (currentListing?.listingLocation.townOrCity + ", ")}
        ${currentListing?.listingLocation.county && (currentListing?.listingLocation.county + ", ")}
        ${currentListing?.listingLocation.postalCode && (currentListing?.listingLocation.postalCode)}
        `;

    return (
        <div>
            <Nav />
            <div className="listing-page__container">
                <section className="listing-page__section-one">
                    <div>
                        <span style={{ fontSize: "20px", fontWeight: "600" }}>{priceFormatter(currentListing!.pricing.price!, currentListing!.pricing.currency)}</span>
                        {(currentListing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "16px" }}> {rentFrequency(currentListing!)} </span>}
                        <p style={{ fontSize: "16px" }}>{currentListing!.totalBedrooms} beds {currentListing.bathrooms} baths {propertyTypeLong(currentListing!)}</p>
                        <p style={{ fontSize: "14px" }}>Address: {address}</p>
                    </div>
                        {currentListing.detailedDescriptions.map((description: DetailedDescription) => (
                            <article key={description.id} >
                                <h1>{description.heading}</h1>
                                <span>
                                    {description.area !== 0
                                        && ` (${description.length} x ${description.width} = ${description.area} sq ${UnitOfLength[description.unit]})`}
                                </span>
                                <p>{description.text}</p>
                            </article>
                        ))}
                </section>

                <section className="listing-page__section-two" id="listing-page__section-two" >
                    {currentListing.listingMedia && currentListing.listingMedia.map((media: ListingMediaDto) => (
                        <div className="listing-content__wrapper" key={media.id} onClick={() => openModal(<ListingMediaModal media={media} />)}>
                            <img src={media.url} alt={media.caption} className="content-image" />
                        </div>
                    ))}
                </section>

                <section className="listing-page__section-three">
                    <h2>Phone</h2>
                    <p>{currentListing.company.companyContacts.phone}</p>
                    <h2>Email</h2>
                    <p>{currentListing.company.companyContacts.email}</p>
                </section>
            </div>
        </div>
    );
});