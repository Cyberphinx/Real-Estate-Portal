import React from "react";
import './CompanyDetails.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Company } from "../../../app/model/CompanyAggregate/Company";

interface Props {
    company: Company | undefined;
}


export default observer(function CompanyDetails({company}: Props) {
    const { listingStore  } = useStore();
    const { selectedCompany } = listingStore;

    return (
        <div className="company-details-contents">
            {/* <CompanyTags company={companyData} /> */}
            <section>
                <img className="details-image" src={selectedCompany?.companyContents[0].url} alt="details" />
            </section>
            <section className="title-container">
                <h3>Business name: {company?.companyName}</h3>
            </section>
        </div>
    );
});
