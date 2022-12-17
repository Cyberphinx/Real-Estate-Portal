import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../../app/layout/NavBar";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { Content } from "../../../app/model/ListingAggregate/Objects/Content";
import { DetailedDescription, UnitOfLength } from "../../../app/model/ListingAggregate/Objects/DetailedDescription";
import Close from "../../map/toolbar/Close";

export default observer(function ListingDetailsPage() {
    const { id } = useParams<string>();
    const { listingStore: { loadedListing, loadListing, loadingListing }, featureStore } = useStore();
    const { description, setDescription, contacts, setContacts } = featureStore;

    useEffect(() => {
        if (id) loadListing(id);
    }, [id, loadListing])

    if (loadingListing || !loadedListing) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <NavBar />
            <div style={{ position: "relative" }}>
                <section className="listing-contents-container" >
                    {loadedListing.contents.map((content: Content) => (
                        <div className="single-content-container" key={content.id}>
                            <img src={content.url} alt={content.caption} className="content-images" />
                        </div>
                    ))}
                </section>

                {description &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setDescription()} />
                        </div>
                        <div className="listing-descriptions-container">
                            {loadedListing.detailedDescriptions.map((description: DetailedDescription) => (
                                <article key={description.id} >
                                    <h1>{description.heading}</h1>
                                    <span>
                                        {description.dimensions !== null
                                            && ` (${description.dimensions?.length} x ${description.dimensions?.width} = ${description.dimensions?.area} sq ${UnitOfLength[description.dimensions?.unit]})`}
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
                        <div className="listing-contacts-container">
                            <h1>Phone</h1>
                            <p>{loadedListing.company.companyContacts.phone}</p>
                            <h1>Email</h1>
                            <p>{loadedListing.company.companyContacts.email}</p>
                        </div>
                    </section>}
            </div>
        </div>

    );
});