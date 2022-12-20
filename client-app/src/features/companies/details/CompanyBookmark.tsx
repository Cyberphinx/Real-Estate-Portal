import { observer } from "mobx-react-lite";
import React from "react";
import { Company } from "../../../app/model/Company";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { useStore } from "../../../app/stores/store";
import './CompanyBookmark.css';

interface Props {
    multiCompanies: Company[] | undefined;
}

export default observer(function CompanyBookmark({ multiCompanies }: Props) {
    const { companyStore } = useStore();
    const { selectCompany, selectedCompany } = companyStore;

    return (
        <div className="listing-bookmark">
            {selectedCompany && multiCompanies &&
                <section className="listing-bookmark-container">
                    {multiCompanies.map((item: Company, index: number) => (
                        <div key={item.id} className="multiple-index">
                            <button className={item.id === selectedCompany.id ? "selected-index-button" : "index-button"} onClick={() => selectCompany(item.id)}>
                                <p className="index-numbering">Unit {index + 1}</p>
                            </button>
                        </div>
                    ))}
                </section>
            }
        </div>
    )
})