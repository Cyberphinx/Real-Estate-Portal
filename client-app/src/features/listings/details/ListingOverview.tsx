import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { Content } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingOverview.css';
import priceFormatter from "../../../app/common/PriceFormatter";
import { propertyTypeLong, rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";


interface Props {
    listing: Listing;
}

export default function ListingOverview({ listing }: Props) {
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

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing!.contents.indexOf(image) === 0) return null;
        else {
            setImage(listing!.contents[listing!.contents.indexOf(image) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing!.contents.indexOf(image) < listing!.contents.length - 1) {
            setImage(listing!.contents[listing!.contents.indexOf(image) + 1]);
        }
        else {
            return null;
        }
    }

    const address = `${listing?.listingLocation.propertyNumberOrName && (listing?.listingLocation.propertyNumberOrName + ", ")}
        ${listing?.listingLocation.streetName && (listing?.listingLocation.streetName + ", ")}
        ${listing?.listingLocation.locality && (listing?.listingLocation.locality + ", ")}
        ${listing?.listingLocation.townOrCity && (listing?.listingLocation.townOrCity + ", ")}
        ${listing?.listingLocation.county && (listing?.listingLocation.county + ", ")}
        ${listing?.listingLocation.postalCode && (listing?.listingLocation.postalCode)}
        `;


    return (
        <div className="details-gallery-container">
            <section className="details-gallery">
                <div style={{ position: "relative" }}>
                    <Link to={`/listing/${listing?.id}`} target="_blank" >
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
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{priceFormatter(listing!.pricing.price, listing!.pricing.currency)}</span>
                    {(listing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "16px" }}> {rentFrequency(listing!)} </span>}
                    <p style={{ fontSize: "16px"}}>{listing!.totalBedrooms} beds {listing.bathrooms} baths {propertyTypeLong(listing!)}</p>
                    <p style={{ fontSize: "14px" }}>Address: {address}</p>
                </div>
                {/* {!contacts && <div className="header-three">
                    <button className="contact-button" onClick={() => setContacts(true)}>Contact agent</button>
                </div>}
                {contacts && <div className="header-four">
                    {contacts && <ContactForm listing={listing} />}
                </div>} */}
            </article>
        </div>

    )
}