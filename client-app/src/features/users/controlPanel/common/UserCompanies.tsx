import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DateTag from "../../../../app/common/tags/DateTag";
import { AccessStatus } from "../../../../app/model/AccessStatus";
import { JobLifeCycle, JobNetworkRole } from "../../../../app/model/Job";
import { UserCompanyDto, UserJobDto } from "../../../../app/model/Profile";
import { ServiceCategory } from "../../../../app/model/ServiceCategory";
import { useStore } from "../../../../app/stores/store";
import './MyJobPosts.css';


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
                <p className="my-jobs-title">Branches</p>
                {/* <section>
                    <button
                        className={searchTerm === "_" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => setSearchTerm("_")}>
                        All
                    </button>
                    <button
                        className={searchTerm === "open" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => setSearchTerm("open")}>
                        Open
                    </button>
                    <button
                        className={searchTerm === "completed" ? "my-job-button-active" : "my-job-button"}
                        onClick={() => setSearchTerm("completed")}>
                        Completed
                    </button>
                </section> */}
            </div>
            <div className="my-jobs-contents">
                {loadingUserCompanies ? <p>Loading branches...</p> :
                    userCompanies.map((company: UserCompanyDto) => (
                        <div key={company.id} >
                            <Link to={`/company/${company?.id}`} target="_blank" className="my-jobs-link">
                                <div className="my-jobs-item">
                                    <section>
                                        {/* <p>{job.id}</p> */}
                                        <p>Status: {AccessStatus[company.accessStatus]}</p>
                                    </section>
                                    <section>
                                        <p>{company.displayName}</p>
                                        <p>{company.legalName}</p>
                                    </section>
                                    <section>
                                        {company.isMain === true ? <b>Main</b> : null}
                                        <div>{company.companyReference}</div>
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