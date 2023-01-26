import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import priceFormatter from "../../../../../app/common/PriceFormatter";
import DateTag from "../../../../../app/common/tags/DateTag";
import { Stock } from "../../../../../app/model/Company";
import { PagingParams } from "../../../../../app/model/Pagination";
import { UserCompanyDto } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";
import './ViewListings.css';

interface Props {
    setActivePane: (value: number) => void;
}

export default observer(function AgentListings({ setActivePane }: Props) {
    const { profileStore, companyStore, agentListingStore } = useStore();
    const { userCompanies, loadingUserCompanies } = profileStore;
    const { } = companyStore;
    const { loadAgentListings, loadingAgentListings, agentListings, predicate, setPredicate,
        setPagingParams, loadingNext, setLoadingNext, pagination } = agentListingStore;

    const [branch, setBranch] = useState<UserCompanyDto>(userCompanies[0]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage = 12));
        loadAgentListings().then(() => setLoadingNext(false));
    }

    return (
        <div className="view-listings__container">
            <div className="view-listings__toolbar">
                <p className="view-listings__title">Portfolio</p>
                <section className="view-listings__button-container">
                    <div style={{display:"flex",gap:"1rem"}}>
                        <select className="view-listings__select-button" defaultValue="placeholder">
                            {loadingUserCompanies ?
                                <option>Loading branches...</option>
                                : userCompanies.map((company: UserCompanyDto) => (
                                    <option
                                        key={company.id}
                                        onClick={() => {
                                            setBranch(company);
                                            setPredicate("agentId", company.id.toString());
                                        }}
                                        // value={predicate.get("agentId") === company.id ? true : false}
                                        value={company.displayName}
                                    >
                                        {company.displayName}
                                    </option>
                                ))}
                            <option disabled value="placeholder" > -- select a branch -- </option>
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


                    <button className="view-listings__button-accent" style={{ float: "right" }} onClick={() => setActivePane(1)}>Create listing</button>
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
                                    <b>{priceFormatter(listing.pricing.price!, listing.pricing.currency)} </b>
                                    {listing.pricing.transactionType === 0 && <span>({listing.pricing.rentFrequency.toString().replace(/[A-Z]/g, ' $&').trim()})</span>}
                                    <span> for </span>
                                    <b>{listing.pricing.transactionType}</b>
                                    <span> - {listing.listingLocation.townOrCity}, {listing.listingLocation.postalCode}</span>
                                </article>
                            </Link>
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