import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import './CompanyPage.css';
import { useParams } from "react-router-dom";
import CompanyProfile from "./CompanyProfile";
import { useStore } from "../../../app/stores/store";
import { CompanyFormValues } from "../../../app/model/CompanyAggregate/Company";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import NavBar from "../../../app/layout/NavBar";
import UpdateCompany from "./UpdateCompany";
import CompanyImages from "./CompanyImages";

export default observer(function CompanyPage() {
    const { id } = useParams<{ id: string }>();
    const { listingStore, companyStore, userStore } = useStore();
    const { selectedCompany, loadingInitial } = listingStore;
    const { editMode, setEditMode } = companyStore;
    const { user } = userStore;
    const [initialCompanyValues, setInitialCompanyValues] = useState<CompanyFormValues>(new CompanyFormValues());

    if (loadingInitial) return <div><NavBar /><LoadingComponent content="Loading company..." /></div>

    return (
        <div>
            <NavBar />
            <div className="company-page-container">
                {editMode
                    ? (<UpdateCompany id={id} initialCompanyValues={initialCompanyValues} setInitialCompanyValues={setInitialCompanyValues} />)
                    : (<CompanyProfile company={selectedCompany} user={user} setEditMode={setEditMode} />
                    )}
            </div>
        </div>
    );
});