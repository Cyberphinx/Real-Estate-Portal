import React, { SyntheticEvent } from "react";
import './ListingItem.css';
import { Listing } from "../../app/model/ListingAggregate/Listing";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { rentFrequencyShort } from "../../app/model/ListingAggregate/ListingEnums";
import { ListingMediaDto } from "../../app/model/ListingAggregate/ListingObjects";
import WatchButton from "../../app/common/WatchButton";
import LifeCycleTag from "../../app/common/tags/LifeCycleTag";
import DateTag from "../../app/common/tags/DateTag";
import PriceFormatter from "../../app/common/PriceFormatter";
import { PascalToNormal, truncate } from "../../app/common/HelperFunctions";
import { useHorizontalScroll } from "../../app/hooks/useHorizontalScroll";

interface Props {
    listing: Listing;
    predicate: Map<any, any>;
}

export default observer(function ListingItem({ listing, predicate }: Props) {
    const { mapStore, listingStore } = useStore();
    const { setActiveListing } = mapStore;
    const { selectedListing, selectListing, selectedListingForImage, selectListingForImage, image, setImage, setImageNotFound } = listingStore;

    const price = PriceFormatter(listing!.pricing.price!, listing!.pricing.currency);

    const placeholder = 'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg';

    const listingImages = listing.listingMedia.filter(x => x.type.toString() === "Image");
    const listingBigImages = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'));
    const listingThumbnails = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/tbn'));
    const mainImage = listing.listingMedia.find(x => x.isMain === true);


    function handleImage(event: SyntheticEvent, state: ListingMediaDto) {
        event.stopPropagation();
        if (selectedListing != undefined) selectListing(listing.id);
        selectListingForImage(listing.id);
        let imageReference = state.id.substring(state.id.indexOf("_"), state.id.length);
        let img = listingImages.find(x => x.id === `Sanctum/img${imageReference}`);
        setImage(img!);
    }

    const scrollRef = useHorizontalScroll();

    // function handlePrev(event: SyntheticEvent) {
    //     event.stopPropagation();

    //     if (selectedListing != undefined) selectListing(listing.id);
    //     selectListingForImage(listing.id);

    //     let currentImage = listingBigImages!.indexOf(image!) < 0 ? mainImage! : image!;

    //     if (listingBigImages!.indexOf(currentImage) === 0) return null;
    //     else {
    //         setImage(listingBigImages![listingBigImages!.indexOf(currentImage) - 1]);
    //     }
    // }

    // function handleNext(event: SyntheticEvent) {
    //     event.stopPropagation();

    //     if (selectedListing != undefined) selectListing(listing.id);
    //     selectListingForImage(listing.id);

    //     let currentImage = listingBigImages!.indexOf(image!) < 0 ? mainImage! : image!;


    //     if (listingBigImages!.indexOf(currentImage) < listingBigImages!.length - 1) {
    //         setImage(listingBigImages![listingBigImages!.indexOf(currentImage) + 1]);
    //     }
    //     else {
    //         return null;
    //     }
    // }

    return (
        <div className="cards"
            onMouseEnter={() => setActiveListing(listing!)}
            onMouseLeave={() => setActiveListing(null)}
        >
            {/* <DateTag listing={listing} /> */}

            <div className={selectedListing?.id === listing!.id ? "card-selected" : "card"} >
                {/* <DateTag listing={listing} /> */}
                {/* <WatchButton listing={listing} /> */}
                <section className="gallery">
                    <div style={{ position: "relative" }}>
                        {listingImages!.length > 0
                            ? <img
                                src={listingBigImages!.indexOf(image!) === -1 ? mainImage!.url : image!.url}
                                className="card-image"
                                alt="property"
                                onError={(e) => {
                                    // if the image url doesn't exist or is 404 Not Found
                                    if (e.currentTarget.src !== placeholder) {
                                        e.currentTarget.src = placeholder;
                                        setImageNotFound(true);
                                    }
                                }}
                            />
                            : <img src={placeholder} className="card-image" alt="property" />}
                        <span className="img-numbering">Image {
                            listingBigImages!.indexOf(image!) === -1 ? listingBigImages!.indexOf(mainImage!) + 1 : listingBigImages!.indexOf(image!) + 1
                        } of {listingBigImages!.length}</span>
                        {/* <button className="left-arr" onClick={(e) => handlePrev(e)}>
                            <img className="left-ico" src="/assets/previous.svg" alt="previous" />
                        </button>
                        <button className="right-arr" onClick={(e) => handleNext(e)}>
                            <img className="right-ico" src="/assets/next.svg" alt="next" />
                        </button> */}
                    </div>
                    <div
                        className="carousel"
                        style={{ gridTemplateColumns: `repeat(${listingThumbnails!.length}, calc((61.8vh * 0.382) * 0.382)` }}
                        ref={scrollRef}
                    >
                        {listingThumbnails!.map((content: ListingMediaDto, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="thumbnail" src={content.url} alt={content.caption}
                                    onClick={(e) => handleImage(e, content)}
                                    onError={(e) => {
                                        // if the image url doesn't exist or is 404
                                        if (e.currentTarget.src !== placeholder) {
                                            e.currentTarget.src = placeholder;
                                        }
                                    }}
                                />
                                <span className="numbering">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="card-description">
                    <LifeCycleTag listing={listing} />
                    <p style={{ fontSize: "1rem", padding: "0 0 0.5rem 0", margin: "0px" }}>
                        <b style={{ fontSize: "1.125rem" }}>{price}</b>
                        {listing.pricing.transactionType.toString() === "Sale" ? null : <span style={{ fontSize: "10px" }}>{price === 'POA' ? null : rentFrequencyShort(listing!)}</span>}
                    </p>
                    <p style={{ fontSize: "1rem", padding: "0 0 0.5rem 0", margin: "0px" }}>
                        {listing!.totalBedrooms > 0 && <span>{listing!.totalBedrooms} Beds </span>}
                        <span>{listing?.propertyType && PascalToNormal(listing.propertyType.toString())}</span>
                    </p>
                    <h1 style={{ fontSize: "1rem", fontWeight: 'normal', padding: "0px", margin: "0px", color:'grey' }}>
                        {listing?.listingLocation.displayAddress 
                        ? truncate(listing?.listingLocation.displayAddress, 30)
                        : '...'}
                    </h1>
                </section>
            </div>
        </div>
    );
})