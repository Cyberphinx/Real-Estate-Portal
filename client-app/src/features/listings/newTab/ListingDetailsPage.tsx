import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../../app/layout/NavBar";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Close from "../../map/toolbar/Close";
import { ListingMediaDto, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";

export default observer(function ListingDetailsPage() {
    const { id } = useParams<string>();
    const { listingStore, featureStore } = useStore();
    const { selectedListing: listing, loadListing, loadingListing, cancelSelectListing } = listingStore;
    const { description, setDescription, contacts, setContacts } = featureStore;

    useEffect(() => {
        if (id) loadListing(id);
        return () => cancelSelectListing();
    }, [id, loadListing, cancelSelectListing])


    if (loadingListing || !listing) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <NavBar />
            <div style={{ position: "relative" }}>
                <section className="listing-contents__container" >
                    {/* {listing.contents.map((content: Content) => (
                        <div className="listing-content__wrapper" key={content.id}>
                            <img src={content.url} alt={content.caption} className="content-images" />
                        </div>
                    ))} */}
                    <div>
                        {listing.listingMedia!.slice(0, (listing.listingMedia!.length / 2)).map((content: ListingMediaDto) => (
                            <div className="listing-content__wrapper" key={content.id}>
                                <img src={content.url} alt={content.caption} className="content-image" />
                            </div>
                        ))}
                    </div>
                    <div>
                        {listing.listingMedia!.slice((listing.listingMedia!.length / 2), listing.listingMedia!.length).map((content: ListingMediaDto) => (
                            <div className="listing-content__wrapper" key={content.id}>
                                <img src={content.url} alt={content.caption} className="content-image" />
                            </div>
                        ))}
                    </div>

                </section>

                {description &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setDescription()} />
                        </div>
                        <div className="listing-descriptions-container">
                            {listing.detailedDescriptions.map((description: DetailedDescription) => (
                                <article key={description.id} >
                                    <h1>{description.heading}</h1>
                                    <span>
                                        {description.area !== 0
                                            && ` (${description.length} x ${description.width} = ${description.area} sq ${UnitOfLength[description.unit]})`}
                                    </span>
                                    <p>{description.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>}

                {contacts &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setContacts()} />
                        </div>
                        <article className="listing-contacts-container">
                            <h1>Phone</h1>
                            <p>{listing.company.companyContacts.phone}</p>
                            <h1>Email</h1>
                            <p>{listing.company.companyContacts.email}</p>
                        </article>
                    </section>}
            </div>
        </div>

    );
});