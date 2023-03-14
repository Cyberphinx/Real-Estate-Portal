import React, { SyntheticEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { ChangeLog, ListingMediaDto } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingOverview.css';
import priceFormatter from "../../../app/common/PriceFormatter";
import { lifeCycleStatusText, propertyTypeLong, rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";
import { dateFormatter } from "../../../app/common/HelperFunctions";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


interface Props {
    listing: Listing;
}

export default observer(function ListingOverview({ listing }: Props) {
    const { listingStore } = useStore();
    const { image, setImage } = listingStore;

    const listingImages = listing.listingMedia.filter(x => x.type.toString() === "Image").sort();
    const listingBigImages = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))
    const listingThumbnails = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/tbn'))
    const listingDocuments = listing.listingMedia.filter(x => x.type.toString() === "Document").sort();

    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        let imageReference = state.id.substring(state.id.indexOf("_"), state.id.length);
        let img = listingImages.find(x => x.id === `Sanctum/img${imageReference}`);
        setImage(img!);
    }

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (listingBigImages.indexOf(image!) === 0) return null;
        else {
            setImage(listingBigImages![listingBigImages.indexOf(image!) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (listingBigImages.indexOf(image!) < listingBigImages.length - 1) {
            setImage(listingBigImages[listingBigImages.indexOf(image!) + 1]);
        }
        else {
            return null;
        }
    }

    return (
        <div>
            {listingImages && image && <section className="details-gallery">
                <div style={{ position: "relative" }}>
                    <Link to={`/listing/${listing?.id}`} target="_blank" >
                        {listingImages.length > 0 ?
                            <img className="details-image" src={image.url} alt={image.caption} />
                            : <img className="details-image" src='https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg' alt="cover" />}
                    </Link>
                    <span className="image-numbering">
                        Image {listingBigImages!.indexOf(image) + 1} of {listingBigImages?.length}
                    </span>
                    <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                </div>
                <div style={{ position: "relative" }}>
                    <section
                        className="details-carousel"
                        style={{ gridTemplateColumns: `repeat(${listingThumbnails.length}, calc(100vh / 6))` }}
                        ref={scrollRef}>
                        {listingThumbnails?.map((content: ListingMediaDto, index: number) => (
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
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{priceFormatter(listing!.pricing.price!, listing!.pricing.currency)}</span>
                {(listing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "1.25rem" }}> {rentFrequency(listing!)} </span>}
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}> {listing.pricing.transactionType.toString() === "Sale" && listing.pricing.priceQualifier.toString()}</span>
                <p style={{ fontSize: "1.25rem" }}>Status: <b>{lifeCycleStatusText(listing)}</b></p>

                <p style={{ fontSize: "1.125rem" }}>{listing!.totalBedrooms} beds {listing.bathrooms} baths {listing.propertyType && propertyTypeLong(listing!)}</p>
                <p style={{ fontSize: "1rem" }}>Address: {listing.listingLocation.displayAddress}</p>
                <p style={{ fontSize: "1rem" }}>Listing reference: {listing.listingReference}</p>
                <p style={{ fontSize: "1rem" }}>{listing.sourceUri}</p>
            </article>
            <article className="header-container">
                <p style={{ fontSize: "1.125rem" }}>{listing.summaryDescription}</p>
            </article>
            <article className="header-container" style={listingDocuments.length > 0 ? {} : { display: 'none' }}>
                {listingDocuments.map((document: ListingMediaDto) => (
                    <div key={document.id} style={{ padding: '1rem' }}>
                        <a href={document.url} rel="noreferrer noopener nofollow" target="_blank">{document.caption}</a>
                    </div>
                ))}
            </article>
            <article className="header-container" style={listingDocuments.length > 0 ? {} : { display: 'none' }}>
                {listing.changeLogs.map((log: ChangeLog) => (
                    <p key={log.id}>{dateFormatter(log.lastModified)}: {log.description}</p>
                ))}
            </article>
        </div>

    )
})