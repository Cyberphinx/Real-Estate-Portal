import React, { SyntheticEvent, useRef, useState } from "react";
import './ListingItem.css';
import { Listing } from "../../app/model/ListingAggregate/Listing";
import AgencyTag from "../../app/common/tags/AgencyTag";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { priceQualifier, propertyType, rentFrequencyShort } from "../../app/model/ListingAggregate/ListingEnums";
import { ListingMediaDto } from "../../app/model/ListingAggregate/ListingObjects";
import WatchButton from "../../app/common/WatchButton";
import RefTag from "../../app/common/tags/RefTag";
import priceFormatter from "../../app/common/PriceFormatter";

interface Props {
    listing: Listing | undefined;
    predicate: Map<any, any>;
}

export default observer(function ListingItem({ listing, predicate }: Props) {
    const { mapStore, listingStore, userStore } = useStore();
    const { setActiveListing } = mapStore;
    const { selectedListing } = listingStore;
    const { user, isLoggedIn } = userStore;

    function initialImage() {
        let initialMedia: ListingMediaDto; 
        if (listing!.listingMedia.some(m => m.isMain === true)) {
            initialMedia = listing!.listingMedia.find(m => m.isMain === true)!;
            return initialMedia;
        } else {
            initialMedia = listing!.listingMedia![0];
            return initialMedia;
        }
    }

    const [image, setImage] = useState<ListingMediaDto>(initialImage);
    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        setImage(state);
    }

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

    const addressShort = `
        ${listing?.listingLocation.streetName && (listing?.listingLocation.streetName + ", ")}
        ${listing?.listingLocation.locality && (listing?.listingLocation.locality + ", ")}
        ${listing?.listingLocation.townOrCity && (listing?.listingLocation.townOrCity + ", ")}
        ${listing?.listingLocation.county && (listing?.listingLocation.county + ", ")}
        ${listing?.listingLocation.postalCode && (listing?.listingLocation.postalCode)}
        `;

    function handlePrev(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing!.listingMedia!.indexOf(image) === 0) return null;
        else {
            setImage(listing!.listingMedia![listing!.listingMedia!.indexOf(image) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (listing!.listingMedia!.indexOf(image) < listing!.listingMedia!.length - 1) {
            setImage(listing!.listingMedia![listing!.listingMedia!.indexOf(image) + 1]);
        }
        else {
            return null;
        }
    }

    return (
        <div className="cards"
            onMouseEnter={() => setActiveListing(listing!)}
            onMouseLeave={() => setActiveListing(null)}
        >
            <div className={selectedListing?.id === listing!.id ? "card-selected" : "card"} >
                <RefTag listing={listing} />
                <WatchButton listing={listing} />
                <section className="gallery">
                    <div style={{ position: "relative" }}>
                        {listing!.listingMedia!.length > 0 ? <img src={image.url} className="card-image" alt="property" />
                            : <img src='https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg' className="card-image" alt="property" />}
                        <span className="img-numbering">Image {listing!.listingMedia!.indexOf(image) + 1} of {listing?.listingMedia!.length}</span>
                        <button className="left-arr" onClick={(e) => handlePrev(e)}><img className="left-ico" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arr" onClick={(e) => handleNext(e)}><img className="right-ico" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div className="carousel" style={{ gridTemplateColumns: `repeat(${listing!.listingMedia!.length}, calc(100vh / 13))` }} ref={scrollRef}>
                        {listing?.listingMedia!.map((content: ListingMediaDto, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                <span className="numbering">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                    <button className="left-arr-thumbnails" onClick={(e) => scroll(e, -120)}><img className="left-ico" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arr-thumbnails" onClick={(e) => scroll(e, 120)}><img className="right-ico" src="/assets/next.svg" alt="next" /></button>
                </section>
                <section className="card-overlay">
                    <div className="card-price" title={`${priceQualifier(listing!.pricing.priceQualifier)} in ${listing!.pricing.currency.toString().toUpperCase()}`}>
                        <b style={{ fontSize: "1.125rem" }}>{priceFormatter(listing!.pricing.price!, listing!.pricing.currency)}</b>
                        {predicate.get("channel") === "sale" ? null : <span style={{ fontSize: "10px" }}>{rentFrequencyShort(listing!)}</span>}
                    </div>
                    <div className="card-attribute">
                        <p style={{ fontSize: "1rem", padding: "0px", margin: "0px" }}><span>{listing!.totalBedrooms}</span> Beds {listing?.propertyType && propertyType(listing!)}</p>
                    </div>
                </section>
                <section className="card-description">
                    <span style={{ fontSize: "0.75rem" }}>{addressShort}</span>
                </section>
            </div>
        </div>
    );
})