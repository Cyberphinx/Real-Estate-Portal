import React, { useEffect, useState } from 'react';
import './ListView.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../app/stores/store';
import { PagingParams } from '../../app/model/Pagination';
import ListingFilters from './filters/ListingFilters';
import LoadingPlaceholder from '../../app/common/loading/LoadingPlaceholder';
import ListingCounter from './filters/ListingCounter';
import ListingPaging from './ListingPaging';

interface Props {
    clusters: any;
    supercluster: any;
}

export default observer(function ListView({ clusters, supercluster }: Props) {
    const { listingStore, featureStore } = useStore();
    const { predicate, listings, loadListings, setPagingParams, pagination, loadingInitial,
        loadingNext, setLoadingNext, combinedListing, setCombinedListing } = listingStore;
    const { isLocked } = featureStore;

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadListings().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        const clusterArray: any = [];
        clusters.forEach((cluster: any) => {
            const { cluster: isCluster } = cluster.properties;

            if (!isCluster) {
                clusterArray.push(cluster);
            } else {
                const leaves = supercluster.getLeaves(cluster.id, Infinity, 0);
                leaves.forEach((item: any) => {
                    clusterArray.push(item);
                });
            }
        });
        setCombinedListing(clusterArray);
        return () => { setCombinedListing([]) };
    }, [clusters, setCombinedListing]);

    return (
        <div className="listings-container" >
            <div className='listing-counter-container'>
                <ListingCounter loadMore={handleGetNext} />
            </div>
            <div>
                {loadingInitial && !loadingNext ? (
                    <div className='ph-container'>
                        <LoadingPlaceholder />
                        <LoadingPlaceholder />
                        <LoadingPlaceholder />
                        <LoadingPlaceholder />
                    </div>
                ) : (
                    <div>
                        <section>
                            <ListingPaging clusters={clusters} supercluster={supercluster} />
                        </section>
                        <section style={{ textAlign: "center", color: "#000" }}>
                            <p>Showing {isLocked ? listings.length : combinedListing.length} of {pagination?.totalItems} listings {isLocked ? null : "in map area"} for {predicate.get("channel")}</p>
                            <button
                                className="list-view-button"
                                onClick={handleGetNext}
                                disabled={(pagination?.totalPages === pagination?.currentPage) || pagination!.totalItems < 1}
                            >
                                <span className={"button-" + (loadingNext ? "loading" : "text")} style={{ paddingBottom: "20px" }}>Load {pagination?.itemsPerPage} More</span>
                            </button>
                        </section>
                    </div>
                )}
            </div>
            <div style={{padding:"1rem"}}>
                <p style={{ textAlign: "center", fontSize: "12px" }}>Contact us: info@sanctum.co.uk</p>
                <p style={{textAlign:"center", fontSize:"12px"}}>© {new Date().getFullYear() } Cerberus Cybernetics Ltd, All Rights Reserved.</p>
            </div>
        </div>
    );
})