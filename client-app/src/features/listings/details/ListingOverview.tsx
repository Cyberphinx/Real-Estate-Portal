import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { ListingMediaDto } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingOverview.css';
import priceFormatter from "../../../app/common/PriceFormatter";
import { propertyTypeLong, rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";
import { MediaType } from "../../../app/model/Media";
import { nanoid } from "nanoid";


interface Props {
    listing: Listing;
}

export default function ListingOverview({ listing }: Props) {
    const [image, setImage] = useState<ListingMediaDto>(listing.listingMedia![0]);
    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        setImage(state);
    }

    useEffect(() => {
        if (listing.listingMedia) {
            setImage(listing.listingMedia![0]);
        } else {
            let placeholderMedia: ListingMediaDto = {
                id: nanoid(6),
                url: 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg',
                isMain: true,
                index: 0,
                type: MediaType.image,
                caption: 'Image coming soon...'
            }
            setImage(placeholderMedia);
        }
    }, [listing.listingMedia, setImage])

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing.listingMedia!.indexOf(image) === 0) return null;
        else {
            setImage(listing.listingMedia![listing.listingMedia!.indexOf(image) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing.listingMedia!.indexOf(image) < listing.listingMedia!.length - 1) {
            setImage(listing.listingMedia![listing.listingMedia!.indexOf(image) + 1]);
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
            {listing.listingMedia && <section className="details-gallery">
                <div style={{ position: "relative" }}>
                    <Link to={`/listing/${listing?.id}`} target="_blank" >
                        <img className="details-image" src={'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg'} alt="cover" />
                    </Link>
                    <span className="image-numbering">
                        Image {listing.listingMedia!.indexOf(image) + 1} of {listing.listingMedia?.length}
                    </span>
                    <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                </div>
                <div style={{ position: "relative" }}>
                    <section className="details-carousel" style={{ gridTemplateColumns: `repeat(${listing.listingMedia?.length}, calc(100vh / 6))` }} ref={scrollRef}>
                        {listing.listingMedia?.map((content: ListingMediaDto, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="details-thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                <span className="thumbnail-numbering">{index + 1}</span>
                            </div>
                        ))}
                    </section>
                    <button className="left-arrow-thumbnails" onClick={(e) => scroll(e, -240)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arrow-thumbnails" onClick={(e) => scroll(e, 240)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                </div>
            </section>}
            <article className="header-container">
                {/* <span style={{ fontSize: "20px", fontWeight: "600" }}>{priceFormatter(listing!.pricing.price!, listing!.pricing.currency)}</span> */}
                {(listing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "16px" }}> {rentFrequency(listing!)} </span>}
                {/* <p style={{ fontSize: "16px" }}>{listing!.totalBedrooms} beds {listing.bathrooms} baths {propertyTypeLong(listing!)}</p> */}
                <p style={{ fontSize: "14px" }}>Address: {address}</p>
            </article>
            <article className="header-container">
                <p style={{ fontSize: "14px" }}>{listing.summaryDescription}</p>
            </article>
        </div>

    )
}