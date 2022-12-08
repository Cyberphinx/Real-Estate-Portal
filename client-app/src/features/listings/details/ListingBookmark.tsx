import { observer } from "mobx-react-lite";
import React from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import './ListingBookmark.css';

interface Props {
    multiListings: Listing[] | undefined;
}

export default observer(function ListingBookmark({ multiListings }: Props) {
    const { listingStore } = useStore();
    const { selectListing, selectedListing } = listingStore;

    return (
        <div className="listing-bookmark">
            {selectedListing && multiListings &&
                <section className="listing-bookmark-container">
                    {multiListings.map((item: Listing, index: number) => (
                        <div key={item.id} className="multiple-index">
                            <button className={item.id === selectedListing.id ? "selected-index-button" : "index-button"} onClick={() => selectListing(item.id)}>
                                <p className="index-numbering">Unit {index + 1}</p>
                            </button>
                        </div>
                    ))}
                </section>
            }
        </div>
    )
})