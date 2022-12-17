import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import './CompanyFilters.css';

export default observer(function CompanyFilters() {
    const { companyStore } = useStore();
    const { companies } = companyStore;

    return (
        <div className="company-filters-container">
            <section className="company-filters">
            </section>
        </div>
    )
})