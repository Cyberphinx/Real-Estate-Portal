import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DateTag from "../../../../app/common/tags/DateTag";
import { JobLifeCycle, JobNetworkRole } from "../../../../app/model/Job";
import { UserJobDto } from "../../../../app/model/Profile";
import { ServiceCategory } from "../../../../app/model/ServiceCategory";
import { useStore } from "../../../../app/stores/store";
import './MyJobPosts.css';


export default observer(function MyJobPosts() {
    const { profileStore, jobStore } = useStore();
    const { profile, userJobs, loadUserJobs, loadingUserJobs } = profileStore;
    const { selectJob, selectedJob } = jobStore;

    const [searchTerm, setSearchTerm] = useState<string>("_");

    useEffect(() => {
        loadUserJobs(profile!.username, searchTerm);
    }, [loadUserJobs, profile, searchTerm]);

    function displayDate(job: UserJobDto) {
        const addedDate = new Date(job!.addedOn);
        const title = `${addedDate.toLocaleDateString()}`;
        return title;
    }


    return (
        <div className="my-jobs-container">
            <div className="my-jobs-toolbar">
                <p className="my-jobs-title">My job posts</p>
                <section>
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
                </section>
            </div>
            <div className="my-jobs-contents">
                {loadingUserJobs ? <p>Loading jobs...</p> :
                    userJobs.map((job: UserJobDto) => (
                        <div key={job.id} >
                            <Link to={`/job/${job?.id}`} target="_blank" className="my-jobs-link">
                                <div className="my-jobs-item">
                                    <section>
                                        {/* <p>{job.id}</p> */}
                                        <p>Status: {JobLifeCycle[job.jobLifeCycle]}</p>
                                    </section>
                                    <section>
                                        <p>{job.title}</p>
                                        {/* <p>My role: {JobNetworkRole[job.role]}</p> */}
                                    </section>
                                    <section>
                                        <span>Posted on {displayDate(job)}</span>
                                        <div>{job.serviceCategories.map((cat: ServiceCategory, index: number) => (
                                            <span key={index}>#{ServiceCategory[cat]} </span>
                                        ))}</div>
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