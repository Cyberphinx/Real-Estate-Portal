import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserCompanyDto } from "../../../../../app/model/Profile";
import { useStore } from "../../../../../app/stores/store";
import './AgencyBranches.css';


export default observer(function UserCompanies() {
    const { profileStore, jobStore } = useStore();
    const { profile, userCompanies, loadUserCompanies, loadingUserCompanies } = profileStore;
    const { selectJob, selectedJob } = jobStore;

    const [searchTerm, setSearchTerm] = useState<string>("_");

    useEffect(() => {
        loadUserCompanies(profile!.username, searchTerm);
    }, [loadUserCompanies, profile, searchTerm]);

    // function displayDate(company: UserCompanyDto) {
    //     const addedDate = new Date(company!.addedOn);
    //     const title = `${addedDate.toLocaleDateString()}`;
    //     return title;
    // }


    return (
        <div className="my-jobs-container">
            <div className="my-jobs-toolbar">
                <p className="my-jobs-title">Agency branches</p>
                <section>
                    <button
                        className={searchTerm === "_" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => {}}>
                        All
                    </button>
                    <button
                        className={searchTerm === "open" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => {}}>
                        Public
                    </button>
                    <button
                        className={searchTerm === "open" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => {}}>
                        Private
                    </button>
                    <button className="agent-listing-master-button" onClick={() => {}}>Create branch</button>
                </section>
            </div>
            <div className="my-jobs-contents">
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
        </div>
    )
})