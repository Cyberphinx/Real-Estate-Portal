import { observer } from "mobx-react-lite";
import React from "react";
import { Company } from "../../../../app/model/CompanyAggregate/Company";
import { Listing } from "../../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../../app/stores/store";
import ListingItem from "../../../listings/ListingItem";
import './Portfolio.css';

interface Props {
    listingForm: boolean;
    setListingForm: any;
    selectedPortfolio: Company | null;
}

export default observer(function Portfolio({ selectedPortfolio }: Props) {
    const { listingStore, featureStore } = useStore();
    const { listings, predicate } = listingStore;
    const { setActiveAgencyPanel } = featureStore;

    return (
        <div className="agency-listings-container">
            <button className="create-listing-button" onClick={() => setActiveAgencyPanel(3)}>
                <img src="/assets/add.svg" alt="create" className="add-listing-icon" />
                <div style={{ paddingTop: "calc(100vw / 13)", fontSize: "16px" }}>
                    <p>Create listing</p>
                    <b>{selectedPortfolio?.companyName}</b>
                </div>
            </button>
            {listings.filter(x => x.companyReference === "savills").map((item: Listing) => (
                <div key={item.listingReference} style={{ cursor: "pointer", marginTop:"1px" }}>
                    <ListingItem listing={item} predicate={predicate} />
                </div>
            ))}
        </div>
    )
})