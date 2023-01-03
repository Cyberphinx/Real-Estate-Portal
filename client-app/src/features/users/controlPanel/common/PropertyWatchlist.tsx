import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import priceFormatter from "../../../../app/common/PriceFormatter";
import WatchButton from "../../../../app/common/WatchButton";
import { Frequency, priceQualifier, TransactionType } from "../../../../app/model/ListingAggregate/ListingEnums";
import { WatcherListingDto } from "../../../../app/model/Profile";
import { useStore } from "../../../../app/stores/store";
import './PropertyWatchlist.css';


export default observer(function PropertyWatchlist() {
    const { profileStore } = useStore();
    const { profile, userListings, loadUserListings, loadingUserListings } = profileStore;

    const [searchTerm, setSearchTerm] = useState<string>("_");

    useEffect(() => {
        loadUserListings(profile!.username, searchTerm);
    }, [loadUserListings, profile, searchTerm]);

    return (
        <div className="property-watchlist-container">
            <div className="watchlist-toolbar">
                <p className="watchlist-title">Property watchlist</p>
                <section className="watchlist-button-container">
                    <button className={searchTerm === "_" ? "watchlist-button-active" : "watchlist-button"} onClick={() => setSearchTerm("_")}>All</button>
                    <button className={searchTerm === "rent" ? "watchlist-button-active" : "watchlist-button"} onClick={() => setSearchTerm("rent")}>Rent</button>
                    <button className={searchTerm === "sale" ? "watchlist-button-active" : "watchlist-button"} onClick={() => setSearchTerm("sale")}>Sale</button>
                </section>
            </div>
            <div className="watchlist-container">
                {loadingUserListings ? <p>Loading listings...</p> :
                    userListings.map((listing: WatcherListingDto) => (
                        <div key={listing.id} className="watchlist-item">
                            <WatchButton listing={listing} />
                            <Link className="watchlist-item-link" to={`/listing/${listing?.id}`} target="_blank" >
                                <img className="saved-listing-image" src={listing.image} alt="property" />
                                <article className="watchlist-item-title">
                                    <b>{priceFormatter(listing.price, listing.currency)} </b>
                                    {listing.transactionType === 0 && <span>({listing.rentFrequency.toString().replace(/[A-Z]/g, ' $&').trim()})</span>}
                                    <span> for </span>
                                    <b>{listing.transactionType}</b>
                                    <span> - {listing.city}, {listing.postcode}</span>
                                </article>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})