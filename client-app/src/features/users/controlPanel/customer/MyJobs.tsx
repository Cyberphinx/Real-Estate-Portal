import React, { useEffect, useState } from "react";
import "./MyJobs.css";
import { UserJobDto } from "../../../../app/model/Profile";
import { useStore } from "../../../../app/stores/store";
import { Link } from "react-router-dom";
import { JobLifeCycle } from "../../../../app/model/Job";
import LoadingComponent from "../../../../app/common/loading/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function MyJobs() {
    const { profileStore, jobStore, userStore } = useStore();
    const { profile, userJobs, loadUserJobs, loadingUserJobs } = profileStore;
    const { selectJob, selectedJob, jobs } = jobStore;
    const { user, isLoggedIn } = userStore;

    const [searchTerm, setSearchTerm] = useState<string>("_");

    useEffect(() => {
        if (isLoggedIn && user) loadUserJobs(user.username, searchTerm);
    }, [loadUserJobs, user, searchTerm]);

    function displayDate(job: UserJobDto) {
        const addedDate = new Date(job!.addedOn);
        const title = `${addedDate.toLocaleDateString()}`;
        return title;
    }

    return (
        <div className="my-jobs" id="my-jobs">

            <div className="my-jobs__container">
                {loadingUserJobs ? <LoadingComponent content={"Loading..."} /> :
                    userJobs.map((job: UserJobDto) => (
                        <div className="my-jobs__item" key={job.id} >
                            <Link to={`/job/${job?.id}`} target="_blank" style={{ textDecoration: 'none', color: '#000' }} >
                                <h3>{job.title}</h3>
                            </Link>
                            <h4>{job.jobReference}</h4>
                            <div className="my-jobs__grid">
                                <div>
                                    <p>Status: {job.jobLifeCycle.toString()}</p>
                                    <p>My role: {job.role.toString()}</p>
                                </div>
                                <div>
                                    <p>Posted on {displayDate(job)}</p>
                                    <div>Job categories: {job.serviceCategories.map((category: string, index: number) => (
                                        <span key={index}>#{category} </span>
                                    ))}</div>
                                    <p></p>
                                </div>
                            </div>
                            <button className="my-jobs__edit-button">
                                Edit job
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )

})