import { observer } from "mobx-react-lite";
import React from "react";
import BranchPlaceholder from "../../../../app/common/loading/BranchPlaceholder";
import DateTag from "../../../../app/common/tags/RefTag";
import { Company } from "../../../../app/model/Company";
import { User } from "../../../../app/model/User";
import { useStore } from "../../../../app/stores/store";
import './Collection.css';

interface Props {
    user: User | null;
    setBranchForm: any;
    setPortfolio: any;
    setSelectedPortfolio: any;
    companies: Company[];
}

export default observer(function Collection({ setBranchForm, setPortfolio, setSelectedPortfolio, user, companies }: Props) {
    const { featureStore, listingStore } = useStore();
    const { setActiveAgencyPanel } = featureStore;
    const { loadingInitial } = listingStore;

    return (
        <div className="branches-container">
            <button className="create-button" onClick={() => setActiveAgencyPanel(1)}>
                <img src="/assets/add.svg" alt="create" className="add-folder" />
                <p style={{ paddingTop: "calc(100vw / 13)", fontSize: "16px" }}>Create branch</p>
            </button>
            {loadingInitial &&
                <div className="loading-branches">
                    <BranchPlaceholder />
                </div>
            }
            {loadingInitial &&
                <div className="loading-branches">
                    <BranchPlaceholder />
                </div>
            }
            {loadingInitial &&
                <div className="loading-branches">
                    <BranchPlaceholder />
                </div>
            }
            {companies.filter(x => x.username === user!.username).map((item) => (
                <div className="branch" key={item.id} onClick={() => { setActiveAgencyPanel(2); setSelectedPortfolio(item); }}>
                    <button className="branch-button edit">
                        <img className="branch-button-icon" src="/assets/edit.svg" alt="edit" />
                    </button>
                    <button className="branch-button delete">
                        <img className="branch-button-icon" src="/assets/bin.svg" alt="delete" />
                    </button>
                    <div className="folder-3">
                        <article className="branch-text-container">
                            <p className="branch-title">{item.displayName}</p>
                            <p className="branch-subtitle">{item.companyReference}</p>
                        </article>
                    </div>
                </div>
            ))}
        </div>
    )
});