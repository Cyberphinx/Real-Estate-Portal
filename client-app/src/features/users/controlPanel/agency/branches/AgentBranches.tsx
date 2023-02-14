import React, { useEffect, useState } from "react";
import './AgentBranches.css';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { UserCompanyDto } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";


export default observer(function AgentBranches() {
    const { profileStore, jobStore } = useStore();
    const { profile, userCompanies, loadUserCompanies, loadingUserCompanies } = profileStore;
    const { selectJob, selectedJob } = jobStore;

    const [searchTerm, setSearchTerm] = useState<string>("_");

    // function displayDate(company: UserCompanyDto) {
    //     const addedDate = new Date(company!.addedOn);
    //     const title = `${addedDate.toLocaleDateString()}`;
    //     return title;
    // }


    return (
        <div className="agent-branches" id="agent-branches">

            <div className="agent-branches__toolbar">
                {loadingUserCompanies ? null
                    : <h1 className="agent-branches__title">
                        <span style={{ color: '#6807F9', paddingLeft: '1rem' }}>{userCompanies.length} branches</span>
                    </h1>}

                <button className="agent-branches__create-button">
                    <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to={'/create-listing'}
                        target="_blank"
                    >Create branch</Link>
                </button>

                {/* <select
                    className="view-listings__select-button"
                    defaultValue={predicate.get("companyId") !== null ? predicate.get("companyId") : "placeholder"}
                    onChange={(e: any) => handleChangeBranch(e.target.value)}
                >
                    <option disabled value="placeholder" > -- select a branch -- </option>
                    {loadingUserCompanies ?
                        <option>Loading branches...</option>
                        : userCompanies.map((company: UserCompanyDto) => (
                            <option key={company.id} value={company.id} >
                                {company.displayName} ({company.companyReference})
                            </option>
                        ))}
                </select> */}
            </div>

            {loadingUserCompanies ? <p>Loading branches...</p> :
                userCompanies.map((company: UserCompanyDto) => (
                    <div key={company.id} >
                        <Link to={`/company/${company?.id}`} target="_blank" className="my-jobs-link">
                            <div className="my-jobs-item">
                                <section>
                                    {/* <p>{job.id}</p> */}
                                    <p>Status: {company.accessStatus.toString() === "Private" ? "Offline" : "Online"}</p>
                                </section>
                                <section>
                                    <p>Company display name: {company.displayName}</p>
                                    <p>Company legal name: {company.legalName}</p>
                                </section>
                                <section>
                                    {company.isMain === true ? <b>Headquarter</b> : null}
                                    <div>Company Ref:{company.companyReference}</div>
                                </section>
                            </div>

                        </Link>
                    </div>
                ))
            }
        </div>
    )
})