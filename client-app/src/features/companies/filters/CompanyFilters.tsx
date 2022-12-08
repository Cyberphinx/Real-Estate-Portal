import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import './CompanyFilters.css';

export default observer(function CompanyFilters() {
    const { listingStore } = useStore();
    const { companies } = listingStore;

    return (
        <div className="company-filters-container">
            <section className="company-filters">
            </section>
        </div>
    )
})