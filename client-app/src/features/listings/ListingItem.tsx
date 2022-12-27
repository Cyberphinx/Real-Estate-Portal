import React, { SyntheticEvent, useRef, useState } from "react";
import './ListingItem.css';
import { Listing } from "../../app/model/ListingAggregate/Listing";
import AgencyTag from "../../app/common/tags/AgencyTag";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Currency, priceQualifier, propertyType, rentFrequency } from "../../app/model/ListingAggregate/ListingEnums";
import RefTag from "../../app/common/tags/RefTag";
import { Content } from "../../app/model/ListingAggregate/ListingObjects";
import WatchButton from "../../app/common/WatchButton";

interface Props {
    listing: Listing | undefined;
    predicate: Map<any, any>;
}

export default observer(function ListingItem({ listing, predicate }: Props) {
    const { mapStore, listingStore } = useStore();
    const { setActiveListing } = mapStore;
    const { selectedListing } = listingStore;

    // const addedDate = new Date(listing!.addedOn);
    // const title = `Added on ${addedDate.toLocaleDateString()}`

    const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: Currency[listing!.pricing.currency].toUpperCase(), minimumFractionDigits: 0 });

    const [image, setImage] = useState<Content>(listing!.contents[0]);
    function handleImage(event: SyntheticEvent, state: Content) {
        event.stopPropagation();
        setImage(state);
    }

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

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
        if (listing!.contents.indexOf(image) < listing!.contents.length - 1) {
            setImage(listing!.contents[listing!.contents.indexOf(image) + 1]);
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
                <AgencyTag listing={listing} />
                <WatchButton listing={listing} />
                <section className="gallery">
                    <div style={{ position: "relative" }}>
                        <img src={image?.url} className="card-image" alt="property" />
                        <span className="img-numbering">Image {listing!.contents.indexOf(image) + 1} of {listing?.contents.length}</span>
                        <button className="left-arr" onClick={(e) => handlePrev(e)}><img className="left-ico" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arr" onClick={(e) => handleNext(e)}><img className="right-ico" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div className="carousel" style={{ gridTemplateColumns: `repeat(${listing!.contents.length}, calc(100vh / 13))` }} ref={scrollRef}>
                            {listing?.contents.map((content: Content, index: number) => (
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
                    <div className="card-price" title={`${priceQualifier(listing!.pricing.priceQualifier)} in ${Currency[listing!.pricing.currency].toUpperCase()}`}>
                        <b style={{ fontSize: "18px" }}>{priceFormat.format(listing!.pricing.price)}</b>
                        {predicate.get("channel") === "sale" ? null : <sup> {rentFrequency(listing!)}</sup>}
                    </div>
                    <div className="card-attribute">
                        <p style={{ fontSize: "16px", padding: "0px", margin: "0px" }}>{listing!.totalBedrooms} Beds {propertyType(listing!)}</p>
                    </div>
                </section>
                <section className="card-description">
                    <span style={{ fontSize: "12px" }}>{address}</span>
                </section>
            </div>
        </div>
    );
})