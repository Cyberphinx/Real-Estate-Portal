import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import '../../listings/details/ListingTab.css';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Company, CompanyContent, CompanyDescription } from "../../../app/model/Company";
import AgencyTagForCompany from "../../../app/common/tags/AgencyTagForCompany";
import CompanyBookmark from "./CompanyBookmark";
import CompanySummary from "./CompanySummary";
import CompanyDetails from "./CompanyDetails";

interface Props {
    company: Company | undefined;
}

export default observer(function CompanyTab({ company }: Props) {
    const { companyStore } = useStore();
    const { companies } = companyStore;

    const multiCompanies: Company[] = companies.filter(x => x.companyAddress.latitude === company?.companyAddress.latitude && x.companyAddress.longitude === company?.companyAddress.longitude);

    const [tab, setTab] = useState<number>(0);

    const features = [
        <CompanySummary company={company}  />,
        <CompanyDetails company={company} />
    ]

    return (
        <div className="details-container" >
            {multiCompanies.length > 1 && <CompanyBookmark multiCompanies={multiCompanies} />}
            <nav className='sticky-nav-container-multi' >
                <div style={{ margin: "0px 5px" }}>
                    <button className={tab === 0 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(0)}>Overview</button>
                    <button className={tab === 1 ? "sticky-nav-button-active" : "sticky-nav-button"} onClick={() => setTab(1)}>Details</button>
                </div>
            </nav>
            <div className="details-contents" style={(multiCompanies.length > 1) ? { marginTop: "60px" } : {}}>
                {features[tab]}
            </div>
        </div>
    );
});