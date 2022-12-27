import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import priceFormatter from "../../../../app/common/PriceFormatter";
import AgencyTag from "../../../../app/common/tags/AgencyTag";
import DateTag from "../../../../app/common/tags/DateTag";
import WatchButton from "../../../../app/common/WatchButton";
import { Stock } from "../../../../app/model/Company";
import { Currency, Frequency, priceQualifier, PriceQualifier, rentFrequency, TransactionType } from "../../../../app/model/ListingAggregate/ListingEnums";
import { UserCompanyDto, WatcherListingDto } from "../../../../app/model/Profile";
import { useStore } from "../../../../app/stores/store";
import './AgentListings.css';


export default observer(function AgentListings() {
    const { profileStore, companyStore } = useStore();
    const { profile, userCompanies, loadUserCompanies, loadingUserCompanies } = profileStore;
    const { loadCompanyListings, loadingCompanyListings, companyListings } = companyStore;

    const [searchTerm, setSearchTerm] = useState<string>("rent");
    const [companyIndex, setCompanyIndex] = useState<number>(0);
    
    useEffect(() => {
        if (!userCompanies) loadUserCompanies(profile!.username, searchTerm);
        if (userCompanies) loadCompanyListings(userCompanies[companyIndex].id, searchTerm);
    }, [loadUserCompanies, loadCompanyListings, profile, searchTerm, companyIndex]);

    return (
        <div className="property-watchlist-container">
            <div className="watchlist-toolbar">
                <p className="watchlist-title">Property listings</p>
                <section className="watchlist-button-container">
                    <button className={searchTerm === "rent" ? "watchlist-button-active" : "watchlist-button"} onClick={() => setSearchTerm("rent")}>Rent</button>
                    <button className={searchTerm === "sale" ? "watchlist-button-active" : "watchlist-button"} onClick={() => setSearchTerm("sale")}>Sale</button>
                    <select className="agent-listing-master-button">
                        {userCompanies.map((company: UserCompanyDto) => (
                            <option key={company.id} onClick={() => setCompanyIndex(userCompanies.indexOf(company))}>
                                {company.displayName}
                            </option>
                        ))}
                    </select>
                    
                </section>
            </div>
            <div className="watchlist-container">
                {loadingCompanyListings ? <p>Loading listings...</p> :
                    companyListings.map((listing: Stock) => (
                        <div key={listing.id} className="watchlist-item">
                            <Link className="watchlist-item-link" to={`/listing/${listing?.id}`} target="_blank" >
                                <img className="saved-listing-image" src={listing.image} alt="property" />
                                <article className="watchlist-item-title">
                                    <b>{priceFormatter(listing.pricing.price, listing.pricing.currency)} </b>
                                    {listing.pricing.transactionType === 0 && <span>({Frequency[listing.pricing.rentFrequency].replace(/[A-Z]/g, ' $&').trim()})</span>}
                                    <span> for </span>
                                    <b>{TransactionType[listing.pricing.transactionType]}</b>
                                    <span> - {listing.listingLocation.townOrCity}, {listing.listingLocation.postalCode}</span>
                                </article>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})