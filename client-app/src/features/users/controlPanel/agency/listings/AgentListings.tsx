import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { PagingParams } from "../../../../../app/model/Pagination";
import { UserCompanyDto } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";
import './AgentListings.css';
import ListingForm from "./ListingForm";
import ViewListings from "./ViewListings";


export default observer(function AgentListings() {
    const { profileStore, companyStore, agentListingStore } = useStore();
    const { profile, userCompanies, loadUserCompanies } = profileStore;
    const { } = companyStore;
    const { loadAgentListings,setPagingParams,  setLoadingNext, pagination } = agentListingStore;

    const [activePane, setActivePane] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>("rent");
    const [branch, setBranch] = useState<UserCompanyDto>(userCompanies[0]);

    useEffect(() => {
        loadUserCompanies(profile!.username);
        if (userCompanies) loadAgentListings();
    }, [loadUserCompanies, loadAgentListings, profile, searchTerm, branch]);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination!.itemsPerPage = 12));
        loadAgentListings().then(() => setLoadingNext(false));
    }

    const panes = [
        <ViewListings setActivePane={setActivePane} />,
        <ListingForm setActivePane={setActivePane} />
    ]

    return (
        <div>
            {panes[activePane]}
        </div>
    )
})