import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import priceFormatter from "../../../../app/common/PriceFormatter";
import AgencyTag from "../../../../app/common/tags/AgencyTag";
import AgencyTagForCompany from "../../../../app/common/tags/AgencyTagForCompany";
import DateTag from "../../../../app/common/tags/DateTag";
import WatchButton from "../../../../app/common/WatchButton";
import { Stock } from "../../../../app/model/Company";
import { Currency, Frequency, priceQualifier, PriceQualifier, rentFrequency, TransactionType } from "../../../../app/model/ListingAggregate/ListingEnums";
import { PagingParams } from "../../../../app/model/Pagination";
import { UserCompanyDto, WatcherListingDto } from "../../../../app/model/Profile";
import { useStore } from "../../../../app/stores/store";
import './AgentListings.css';


export default observer(function AgentListings() {
    const { profileStore, companyStore, agentListingStore } = useStore();
    const { profile, userCompanies, loadUserCompanies, loadingUserCompanies } = profileStore;
    const { } = companyStore;
    const { loadAgentListings, loadingAgentListings, agentListings, predicate, setPredicate,
        setPagingParams, loadingNext, setLoadingNext, pagination } = agentListingStore;

    const [searchTerm, setSearchTerm] = useState<string>("rent");
    const [branch, setBranch] = useState<UserCompanyDto>(userCompanies[0]);

    useEffect(() => {
        loadUserCompanies(profile!.username);
        if (userCompanies) loadAgentListings();
    }, [loadUserCompanies, loadAgentListings, profile, searchTerm, branch]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage = 12));
        loadAgentListings().then(() => setLoadingNext(false));
    }

    return (
        <div className="property-watchlist-container">
            <div className="watchlist-toolbar">
                <p className="watchlist-title">Property listings</p>
                <section className="watchlist-button-container">
                    <button className={predicate.get("channel") === "rent" ? "watchlist-button-active" : "watchlist-button"}
                        onClick={() => setPredicate("channel", "rent")}>Rent</button>
                    <button className={predicate.get("channel") === "sale" ? "watchlist-button-active" : "watchlist-button"}
                        onClick={() => setPredicate("channel", "sale")}>Sale</button>
                    <select className="agent-listing-master-button">
                        {loadingUserCompanies ?
                            <option>Loading branches...</option>
                            : userCompanies.map((company: UserCompanyDto) => (
                                <option
                                    key={company.id}
                                    onClick={() => {
                                        setBranch(company);
                                        setPredicate("agentId", company.id.toString());
                                    }}
                                    selected={predicate.get("agentId") === company.id ? true : false}
                                >
                                    {company.displayName}
                                </option>
                            ))}
                        <option disabled selected={true} > -- select a branch -- </option>
                    </select>
                </section>
            </div>
            <div className="agent-listing-container">
                {/* {loadingUserCompanies && <p>Loading branches...</p>} */}
                {loadingAgentListings && !loadingNext ? <p>Loading listings...</p> :
                    agentListings.map((listing: Stock) => (
                        <div key={listing.id} className="watchlist-item">
                            <Link className="watchlist-item-link" to={`/listing/${listing?.id}`} target="_blank" >
                                <div style={{ position: "relative" }}>
                                    <span className="agent-tag" >
                                        {listing.agency}
                                    </span>
                                </div>
                                <DateTag listing={listing} />
                                <img className="agent-listing-image" src={listing.image} alt="property" />
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
            <div className="agent-listing-pagination-container">
                <p style={{ fontSize: "14px" }}>Showing {agentListings.length} of {pagination?.totalItems} items</p>
                <button className={loadingNext ? "agent-listing-loading-button" : "agent-listing-load-button"}
                 onClick={() => handleGetNext()}>
                    {loadingNext && <span className="loading-next"></span>}
                    Load 12 more
                    </button>
            </div>
        </div>
    )
})