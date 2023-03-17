import React, { SyntheticEvent, useRef } from "react";
import './ListingItem.css';
import { Listing } from "../../app/model/ListingAggregate/Listing";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { propertyType, rentFrequencyShort } from "../../app/model/ListingAggregate/ListingEnums";
import { ListingMediaDto } from "../../app/model/ListingAggregate/ListingObjects";
import WatchButton from "../../app/common/WatchButton";
import LifeCycleTag from "../../app/common/tags/LifeCycleTag";
import DateTag from "../../app/common/tags/DateTag";
import PriceFormatter from "../../app/common/PriceFormatter";

interface Props {
    listing: Listing;
    predicate: Map<any, any>;
}

export default observer(function ListingItem({ listing, predicate }: Props) {
    const { mapStore, listingStore } = useStore();
    const { setActiveListing } = mapStore;
    const { selectedListing, selectedListingForImage, selectListingForImage, image, setImage } = listingStore;

    const price = PriceFormatter(listing!.pricing.price!, listing!.pricing.currency);

    const placeholder = 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg';

    const listingImages = listing.listingMedia.filter(x => x.type.toString() === "Image");
    const listingBigImages = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'));
    const listingThumbnails = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/tbn'));

    // listing.listingMedia.filter(x => x.type.toString() === "Image").forEach(element => {
    //     console.log(element.id, element.url);
    // });

    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        selectListingForImage(listing.id);
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
        if (listingBigImages!.indexOf(image!) === 0) return null;
        else {
            setImage(listingBigImages![listingBigImages!.indexOf(image!) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (listingBigImages!.indexOf(image!) < listingBigImages!.length - 1) {
            setImage(listingBigImages![listingBigImages!.indexOf(image!) + 1]);
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
                {/* <RefTag listing={listing} /> */}
                <DateTag listing={listing} />
                <LifeCycleTag listing={listing} />
                <WatchButton listing={listing} />
                <section className="gallery">
                    <div style={{ position: "relative" }}>
                        {listingImages!.length > 0
                            ? <img src={selectedListingForImage?.id === listing!.id
                                ? image!.url
                                : listing.listingMedia.find(x => x.isMain === true)?.url
                            } className="card-image" alt="property" />
                            : <img src={placeholder} className="card-image" alt="property" />}
                        <span className="img-numbering">Image {listingBigImages!.indexOf(image!) + 1} of {listingBigImages!.length}</span>
                        <button className="left-arr" onClick={(e) => handlePrev(e)}><img className="left-ico" src="/assets/previous.svg" alt="previous" /></button>
                        <button className="right-arr" onClick={(e) => handleNext(e)}><img className="right-ico" src="/assets/next.svg" alt="next" /></button>
                    </div>
                    <div className="carousel" style={{ gridTemplateColumns: `repeat(${listingThumbnails!.length}, calc(100vh / 13))` }} ref={scrollRef}>
                        {listingThumbnails!.map((content: ListingMediaDto, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                <span className="numbering">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                    <button className="left-arr-thumbnails" onClick={(e) => scroll(e, -120)}>
                        <img className="left-ico" src="/assets/previous.svg" alt="previous" />
                    </button>
                    <button className="right-arr-thumbnails" onClick={(e) => scroll(e, 120)}>
                        <img className="right-ico" src="/assets/next.svg" alt="next" />
                    </button>
                </section>
                <section className="card-overlay">
                    <div className="card-price" title={`${listing!.pricing.priceQualifier} in ${listing!.pricing.currency.toString().toUpperCase()}`}>
                        <b style={{ fontSize: "1.125rem" }}>{price}</b>
                        {listing.pricing.transactionType.toString() === "Sale" ? null : <span style={{ fontSize: "10px" }}>{price === 'POA' ? null : rentFrequencyShort(listing!)}</span>}
                    </div>
                    <div className="card-attribute">
                        <p style={{ fontSize: "1rem", padding: "0px", margin: "0px" }}><span>{listing!.totalBedrooms}</span> Beds {listing?.propertyType && propertyType(listing!)}</p>
                    </div>
                </section>
                <section className="card-description">
                    <span style={{ fontSize: "1rem" }}>{listing?.listingLocation.displayAddress}</span>
                </section>
            </div>
        </div>
    );
})