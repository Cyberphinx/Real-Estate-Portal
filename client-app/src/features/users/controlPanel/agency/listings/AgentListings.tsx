import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import priceFormatter from "../../../../../app/common/PriceFormatter";
import DateTag from "../../../../../app/common/tags/DateTag";
import { Stock } from "../../../../../app/model/Company";
import { PagingParams } from "../../../../../app/model/Pagination";
import { UserCompanyDto } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";
import './AgentListings.css';


export default observer(function AgentListings() {
    const { profileStore, agentListingStore, userStore, featureStore } = useStore();
    const { userCompanies, loadUserCompanies, loadingUserCompanies } = profileStore;
    const { user, isLoggedIn } = userStore;
    const { loadAgentListings, loadingAgentListings, agentListings, predicate, setPredicate,
        setPagingParams, loadingNext, setLoadingNext, pagination } = agentListingStore;
    const {setActiveFeature} = featureStore;

    useEffect(() => {
        if (isLoggedIn) loadUserCompanies(user!.username);
        if (userCompanies) loadAgentListings();
        if (userCompanies[0]) setPredicate("companyId", userCompanies[0].id);
    }, [loadUserCompanies, loadAgentListings, isLoggedIn, user, setPredicate]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage = 12));
        loadAgentListings().then(() => setLoadingNext(false));
    }

    function handleChangeBranch(companyId: string) {
        setPredicate("companyId", companyId);
    }

    return (
        <div className="view-listings__container">
            <div className="view-listings__toolbar">
                <p className="view-listings__title">Portfolio</p>
                <section className="view-listings__button-container">
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <select
                            className="view-listings__select-button"
                            defaultValue={"placeholder"}
                            onChange={(e: any) => handleChangeBranch(e.target.value)}
                        >
                            <option disabled value="placeholder" > -- select a branch -- </option>
                            {loadingUserCompanies ?
                                <option>Loading branches...</option>
                                : userCompanies.map((company: UserCompanyDto) => (
                                    <option key={company.id} value={company.id} >
                                        {company.displayName}
                                    </option>
                                ))}
                        </select>

                        <div className="view-listings__button-group">
                            <button
                                className="view-listings__button"
                                style={predicate.get("channel") === "rent" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                                onClick={() => setPredicate("channel", "rent")}
                                disabled={predicate.get("channel") === "rent" ? true : false}
                            >For rent</button>
                            <button
                                className="view-listings__button"
                                style={predicate.get("channel") === "sale" ? { background: "#fff", cursor: "default", color: "#000", fontWeight: "bold" } : {}}
                                onClick={() => setPredicate("channel", "sale")}
                            >For sale</button>
                        </div>
                    </div>
                    <button
                        className="view-listings__button-accent"
                        style={{ float: "right" }}>
                        <Link
                            style={{ textDecoration: 'none', color:'#fff' }}
                            to={'/create-listing'} 
                            target="_blank"
                        >Create listing</Link>
                    </button>
                </section>
            </div>

            <div className="view-listing__container">
                {/* {loadingUserCompanies && <p>Loading branches...</p>} */}
                {loadingAgentListings && !loadingNext ? <p>Loading listings...</p> :
                    agentListings.map((listing: Stock) => (
                        <div key={listing.id} className="view-listing__item">
                            <div style={{ position: "relative" }}>
                                <span className="view-listing__reference" >
                                    {listing.listingReference}
                                </span>
                                <span className="view-listing__reference" style={{top:'2rem',background:'#888'}} >
                                    {listing.accessStatus}
                                </span>
                            </div>
                            <DateTag listing={listing} />
                            <img className="agent-listing-image" src={listing.image} alt="property" />
                            <article className="watchlist-item-title">
                                <b>{priceFormatter(listing.pricing.price!, listing.pricing.currency)} </b>
                                {listing.pricing.transactionType === 0 && <span>({listing.pricing.rentFrequency.toString().replace(/[A-Z]/g, ' $&').trim()})</span>}
                                <span> for </span>
                                <b>{listing.pricing.transactionType}</b>
                                <span> - {listing.listingLocation.townOrCity}, {listing.listingLocation.postalCode}</span>
                            </article>
                            <button className="view-listing__edit-button" onClick={() => setActiveFeature(2)}>
                                <Link to={`/manage/${listing.id}`} target="_blank">Edit</Link>
                            </button>
                        </div>
                    ))
                }
            </div>

            {agentListings.length > 0 ? <div className="agent-listing-pagination-container">
                <p style={{ fontSize: "14px" }}>Showing {agentListings.length} of {pagination?.totalItems} items</p>
                <button className={loadingNext ? "agent-listing-loading-button" : "agent-listing-load-button"}
                    onClick={() => handleGetNext()}>
                    {loadingNext && <span className="loading-next"></span>}
                    Load 12 more
                </button>
            </div>
                : (loadingAgentListings ? null : <p>Select a branch to view its listings.</p>)}

        </div>
    )
})