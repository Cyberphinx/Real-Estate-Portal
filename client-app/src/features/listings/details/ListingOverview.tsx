import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { KeyContact, ListingMediaDto } from "../../../app/model/ListingAggregate/ListingObjects";
import './ListingOverview.css';
import { lifeCycleStatusText, rentFrequency } from "../../../app/model/ListingAggregate/ListingEnums";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import PriceFormatter from "../../../app/common/PriceFormatter";
import { PascalToNormal } from "../../../app/common/HelperFunctions";
import { useHorizontalScroll } from "../../../app/hooks/useHorizontalScroll";


interface Props {
    listing: Listing;
}

export default observer(function ListingOverview({ listing }: Props) {
    const { listingStore } = useStore();
    const { image, setImage } = listingStore;

    const price = PriceFormatter(listing!.pricing.price!, listing!.pricing.currency);

    const listingImages = listing.listingMedia.filter(x => x.type.toString() === "Image").sort();
    const listingBigImages = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))
    const listingThumbnails = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/tbn'))
    const listingDocuments = listing.listingMedia.filter(x => x.type.toString() === "Document").sort();

    const transaction = listing.pricing.transactionType.toString();

    const placeholder = 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg';

    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        let imageReference = state.id.substring(state.id.indexOf("_"), state.id.length);
        let img = listingImages.find(x => x.id === `Sanctum/img${imageReference}`);
        setImage(img!);
    }

    const scrollRef = useHorizontalScroll();

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
    
    function getStatus() {
        switch (transaction) {
            case 'Sale':
                return 'For Sale';
            case 'Rent':
                return 'For Rent';  
            default:
                return '';
        }
    }

    return (
        <div>
            {listingImages && image && <section className="details-gallery">
                <div className="details-image__container" style={{ position: "relative" }}>
                    <Link to={`/listing/${listing?.id}`} target="_blank" >
                        {listingImages.length > 0 ?
                            <img className="details-image" src={image.url} alt={image.caption}
                                onError={(e) => {
                                    // if the image url doesn't exist or is 404
                                    if (e.currentTarget.src !== placeholder) {
                                        e.currentTarget.src = placeholder;
                                    }
                                }}
                            />
                            : <img className="details-image" src={placeholder} alt="cover" />}
                    </Link>
                    <span className="image-numbering">
                        Image {listingBigImages!.indexOf(image) + 1} of {listingBigImages?.length}
                    </span>
                    <button className="left-arrow" onClick={(e) => handlePrev(e)}><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arrow" onClick={(e) => handleNext(e)}><img className="right-icon" src="/assets/next.svg" alt="next" /></button>
                </div>
                <div style={{ position: "relative" }}>
                    <div
                        id="details-carousel"
                        className="details-carousel"
                        style={{ gridTemplateColumns: `repeat(${listingThumbnails.length}, calc(100vh / 6))` }}
                        ref={scrollRef}
                    >
                        {listingThumbnails?.map((content: ListingMediaDto, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="details-thumbnail" src={content.url} alt={content.caption}
                                    onClick={(e) => handleImage(e, content)}
                                    onError={(e) => {
                                        // if the image url doesn't exist or is 404
                                        if (e.currentTarget.src !== placeholder) {
                                            // replace image with placeholder
                                            e.currentTarget.src = placeholder;
                                        }
                                    }}
                                />
                                <span className="thumbnail-numbering">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                    {/* <button className="left-arrow-thumbnails" onClick={(e) => scroll(e, -240)} ><img className="left-icon" src="/assets/previous.svg" alt="previous" /></button> */}
                    {/* <button className="right-arrow-thumbnails" onClick={(e) => scroll(e, 240)} ><img className="right-icon" src="/assets/next.svg" alt="next" /></button> */}
                </div>
            </section>}
            <article className="header-container">
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{transaction === "Sale" && listing.pricing.priceQualifier.toString()} </span>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{price}</span>
                {(listing?.pricing.transactionType.toString() === "Rent") && <span style={{ fontSize: "1.25rem" }}> {price === 'POA' ? null : rentFrequency(listing!)} </span>}
                
                <p style={{ fontSize: "1.25rem" }}>Status:
                    <b> {lifeCycleStatusText(listing) === 'Other' ? getStatus() : lifeCycleStatusText(listing)}</b>
                </p>

                <p style={{ fontSize: "1.125rem" }}>
                    {listing!.totalBedrooms > 0 && <span>{listing!.totalBedrooms} beds </span>}
                    {listing.bathrooms > 0 && <span> {listing.bathrooms} baths </span>}
                    {listing.propertyType && PascalToNormal(listing.propertyType.toString())}
                </p>
                <p style={{ fontSize: "1rem" }}>Address: {listing.listingLocation.displayAddress}</p>
                {listing.keyContacts && listing.keyContacts.length > 0 ?
                    listing.keyContacts.map((contact: KeyContact) => (
                        <div key={contact.id}>
                            <p style={{ fontSize: "1rem" }}>Agent: {listing.company.displayName} - {contact.name}</p>
                            <p style={{ fontSize: "1rem" }}>Phone: {contact.phone}</p>
                            <p style={{ fontSize: "1rem" }}>Email: {contact.email}</p>
                        </div>
                    ))
                    : <div>
                        <p>Agent: {listing.company.displayName}</p>
                        <p>Phone: {listing.company.companyContacts.phone}</p>
                        <p>Email: {listing.company.companyContacts.email}</p>
                    </div>
                }
            </article>
            {listing.summaryDescription && <article className="header-container">
                <p style={{ fontSize: "1.125rem" }}>{listing.summaryDescription}</p>
            </article>}
            <article className="header-container" style={listingDocuments.length > 0 ? {} : { display: 'none' }}>
                {listingDocuments.map((document: ListingMediaDto) => (
                    <div key={document.id} style={{ padding: '1rem' }}>
                        <a href={document.url} rel="noreferrer noopener nofollow" target="_blank">{document.caption}</a>
                    </div>
                ))}
            </article>
            {/* <article className="header-container" style={listing.changeLogs.length > 0 ? {} : { display: 'none' }}>
                {listing.changeLogs.map((log: ChangeLog) => (
                    <p key={log.id}>{dateFormatter(log.lastModified)}: {log.description}</p>
                ))}
            </article> */}
        </div>

    )
})