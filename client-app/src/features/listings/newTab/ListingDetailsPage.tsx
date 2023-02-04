import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import './ListingDetailsPage.css';
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import NavBar from "../../../app/layout/NavBar";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import Close from "../../map/toolbar/Close";
import { ListingMediaDto, DetailedDescription } from "../../../app/model/ListingAggregate/ListingObjects";
import { UnitOfLength } from "../../../app/model/ListingAggregate/ListingEnums";
import { Listing } from "../../../app/model/ListingAggregate/Listing";

export default observer(function ListingDetailsPage() {
    const { id } = useParams<string>();
    const { listingStore, featureStore } = useStore();
    const { selectedListing: listing, loadListing, loadingListing, cancelSelectListing } = listingStore;
    const { description, setDescription, contacts, setContacts } = featureStore;

    const [currentListing, setCurrentListing] = useState<Listing | undefined>(undefined)

    useEffect(() => {
        if (id) loadListing(id).then(currentListing => setCurrentListing(new Listing(currentListing)));
        return () => setCurrentListing(undefined);
    }, [id, loadListing, setCurrentListing])


    if (loadingListing || !currentListing) return <LoadingComponent content={"Loading..."} />;

    return (
        <div>
            <NavBar />
            <div style={{ position: "relative" }}>
                <section className="listing-contents__container" >
                    <div>
                        {currentListing.listingMedia && currentListing.listingMedia!.slice(0, (currentListing.listingMedia!.length / 2)).map((content: ListingMediaDto) => (
                            <div className="listing-content__wrapper" key={content.id}>
                                <img src={content.url} alt={content.caption} className="content-image" />
                            </div>
                        ))}
                    </div>
                    <div>
                        {currentListing.listingMedia!.slice((currentListing.listingMedia!.length / 2), currentListing.listingMedia!.length).map((content: ListingMediaDto) => (
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
                        </div>
                    </section>}

                {contacts &&
                    <section>
                        <div className="close-position">
                            <Close close={() => setContacts()} />
                        </div>
                        <article className="listing-contacts-container">
                            <h1>Phone</h1>
                            <p>{currentListing.company.companyContacts.phone}</p>
                            <h1>Email</h1>
                            <p>{currentListing.company.companyContacts.email}</p>
                        </article>
                    </section>}
            </div>
        </div>

    );
});