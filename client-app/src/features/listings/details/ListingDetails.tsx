import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import './ListingDetails.css';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import AgencyTags from "../../../app/common/tags/AgencyTag";
import ContactForm from "../contactForm/ContactForm";
import { DetailedDescription, UnitOfLength } from "../../../app/model/ListingAggregate/Objects/DetailedDescription";
import { Content } from "../../../app/model/ListingAggregate/Objects/Content";
import { propertyType } from "../../../app/model/ListingAggregate/ListingEnums";
import ListingBookmark from "./ListingBookmark";
import priceFormatter from "../../../app/common/PriceFormatter";

interface Props {
    listing: Listing | undefined;
}

export default observer(function ListingDetails({ listing }: Props) {
    const { listingStore } = useStore();
    const { listings, cancelSelectListing, contacts, setContacts } = listingStore;

    const [image, setImage] = useState<Content>(listing!.contents[0]);
    function handleImage(event: SyntheticEvent, state: Content) {
        event.stopPropagation();
        setImage(state);
    }

    useEffect(() => {
        setImage(listing!.contents[0]);
    }, [listing])

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

    // const addedDate = new Date(listing!.addedOn);
    // const title = `Added on ${addedDate.toLocaleDateString()}`

    const address = `${listing?.listingLocation.propertyNumberOrName && (listing?.listingLocation.propertyNumberOrName + ", ")}
        ${listing?.listingLocation.streetName && (listing?.listingLocation.streetName + ", ")}
        ${listing?.listingLocation.locality && (listing?.listingLocation.locality + ", ")}
        ${listing?.listingLocation.townOrCity && (listing?.listingLocation.townOrCity + ", ")}
        ${listing?.listingLocation.county && (listing?.listingLocation.county + ", ")}
        ${listing?.listingLocation.postalCode && (listing?.listingLocation.postalCode)}
        `;

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing!.contents.indexOf(image) === 0) return null;
        else {
            setImage(listing!.contents[listing!.contents.indexOf(image) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        console.log(listing!.contents.length);
        if (listing!.contents.indexOf(image) < listing!.contents.length - 1) {
            setImage(listing!.contents[listing!.contents.indexOf(image) + 1]);
        }
        else {
            return null;
        }
    }

    const multiListings: Listing[] = listings.filter(x => x.listingLocation.coordinates.latitude === listing?.listingLocation.coordinates.latitude && x.listingLocation.coordinates.longitude === listing?.listingLocation.coordinates.longitude);

    return (
        <div className="details-container" >
            {multiListings.length > 1 && <ListingBookmark multiListings={multiListings} />}
            <div className="details-contents" style={(multiListings.length > 1) ? { marginTop: "60px" } : {}}>
                <AgencyTags listing={listing} />
                <section className="details-gallery">
                    <div style={{ position: "relative" }}>
                        <Link to={`/listing/${listing?.id}`} target="_blank" >
                            {/* <img className="details-image" src={image?.listingId !== listing?.id ? listing?.contents[0].url : image?.url} alt="cover" /> */}
                            <img className="details-image" src={image.url} alt="cover" />
                        </Link>
                        <span className="image-numbering">
                            Image {listing!.contents.indexOf(image) + 1} of {listing?.contents.length}
                        </span>
                        <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <section className="details-carousel" style={{ gridTemplateColumns: `repeat(${listing?.contents.length}, calc(100vh / 6))` }} ref={scrollRef}>
                            {listing?.contents.map((content: Content, index: number) => (
                                <div style={{ position: "relative" }} key={content.id}>
                                    <img className="details-thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                    <span className="thumbnail-numbering">{index + 1}</span>
                                </div>
                            ))}
                        </section>
                        <button className="left-arrow-thumbnails" onClick={(e) => scroll(e, -240)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arrow-thumbnails" onClick={(e) => scroll(e, 240)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                    </div>
                </section>

                <article className="header-container">
                    <div className="header-one">
                        <span style={{ fontSize: "24px", fontWeight: "600" }}>{priceFormatter(listing!.pricing.price, listing!.pricing.currency)} - </span>
                        <span style={{ fontSize: "24px" }}>{listing!.totalBedrooms} Beds {propertyType(listing!)}</span>
                    </div>
                    <div className="header-two">
                        {address}
                    </div>
                    {!contacts && <div className="header-three">
                        <button className="contact-button" onClick={() => setContacts(true)}>Contact agent</button>
                    </div>}
                    {contacts && <div className="header-four">
                        {contacts && <ContactForm listing={listing} />}
                    </div>}
                </article>

                <hr className="details-divider" />
                <article className="content">
                    <div>{listing?.detailedDescriptions.map((description: DetailedDescription) => (
                        <div key={description.id}>
                            <b>{description.heading}</b>
                            <span>
                                {description.dimensions !== null
                                    && ` (${description.dimensions?.length} x ${description.dimensions?.width} = ${description.dimensions?.area} sq ${UnitOfLength[description.dimensions?.unit]})`}
                            </span>
                            <p>{description.text}</p>
                        </div>
                    ))}</div>
                </article>

            </div>
        </div>
    );
});