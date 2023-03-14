import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { ListingMediaDto, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { propertyTypeLong, rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";
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
                        <span style={{ fontSize: "2rem", fontWeight: "600" }}>{priceFormatter(currentListing!.pricing.price!, currentListing!.pricing.currency)}</span>
                        {(currentListing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "16px" }}> {rentFrequency(currentListing!)} </span>}
                        <p style={{ fontSize: "1rem" }}>{currentListing!.totalBedrooms} beds {currentListing.bathrooms} baths {propertyTypeLong(currentListing!)}</p>
                        <p style={{ fontSize: "1rem" }}>Address: {currentListing.listingLocation.displayAddress}</p>
                    </div>
                    <br />
                    <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>{currentListing.company.displayName}</p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>Phone</p>
                    <p>{currentListing.company.companyContacts.phone}</p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>Email</p>
                    <p>{currentListing.company && address}</p>
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
                            {/* <h1>{description.heading}</h1>
                                <span>
                                    {description.area !== 0
                                        && ` (${description.length} x ${description.width} = ${description.area} sq ${UnitOfLength[description.unit]})`}
                                </span>
                                <p>{description.text}</p> */}
                            <div dangerouslySetInnerHTML={{ __html: description.text }} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
});