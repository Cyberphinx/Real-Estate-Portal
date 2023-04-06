import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import './ListingCounter.css';

interface Props {
    loadMore: () => void;
}

export default observer(function ListingCounter({ loadMore }: Props) {
    const { featureStore, listingStore } = useStore();
    const { listings, combinedListing, pagination, loadingInitial, loadingNext, predicate } = listingStore;
    const { isLocked } = featureStore;

    const notPaginated = pagination?.totalPages === pagination?.currentPage;
    const sameNumbers = combinedListing.length === listings.length;
    // const currentTotalInView = isLocked || sameNumbers ? "" : `${combinedListing.length} in map area among `;

    return (
        <div className="listing-counter">
            <div style={{ paddingTop: "4px" }}>
                {notPaginated ?
                    <span>
                        {loadingInitial && !loadingNext
                            ? "Loading properties..."
                            : `Showing ${pagination?.totalItems} results`}
                    </span>
                    : <span>
                        {loadingInitial && !loadingNext
                            ? "Loading properties..."
                            : `Showing ${listings.length} of ${pagination?.totalItems} results`}
                    </span>
                }
                {predicate.has("searchTerm")
                    ? <span style={{ fontWeight: "600" }}> in {predicate.get("searchTerm")} </span>
                    : null}
                {/* <p>Current page: {pagination?.currentPage} - Items per page: {pagination?.itemsPerPage} - Total Items: {pagination?.totalItems} -  Total pages: {pagination?.totalPages}</p> */}
            </div>
            <div>
                {!notPaginated && <button
                    className="load-button"
                    onClick={loadMore}
                    disabled={notPaginated}
                >
                    Load {pagination?.itemsPerPage} More
                </button>}
            </div>
        </div>
    )
});