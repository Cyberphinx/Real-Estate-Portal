import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../../app/layout/NavBar";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Close from "../../map/toolbar/Close";
import { Content, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
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
                <section className="listing-contents-container" >
                    {listing.contents.map((content: Content) => (
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
                            {listing.detailedDescriptions.map((description: DetailedDescription) => (
                                <article key={description.id} >
                                    <h1>{description.heading}</h1>
                                    <span>
                                        {description.area !== null
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