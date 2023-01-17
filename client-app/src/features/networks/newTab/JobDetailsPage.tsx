import './JobDetailsPage.css';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import NavBarForJob from "../../../app/layout/NavBarForJob";
import { JobContent, JobNetworkRole, NetworkDto } from "../../../app/model/Job";
import { useStore } from "../../../app/stores/store";
import { ServiceCategory } from "../../../app/model/ServiceCategory";
import { dateFormatter } from "../../../app/common/HelperFunctions";

export default observer(function JobDetailsPage() {
    const { id } = useParams();
    const { jobStore, userStore } = useStore();
    const { loadJob, loadingJob, selectedJob: job, cancelSelectJob } = jobStore;

    const [applicant, setApplicant] = useState<NetworkDto>();

    useEffect(() => {
        if (id) loadJob(id);
        return () => cancelSelectJob();
    }, [id, loadJob, cancelSelectJob])

    if (loadingJob || !job) return <LoadingComponent content={"Loading job..."} />;

    return (
        <div>
            <NavBarForJob />
            <div className="job-page-container">
                <section>
                    <div className="job-author-container">
                        {job.networks.find(x => x.role.toString() === "Customer")?.image === null
                            ? <img className="large-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                            : <img className="large-user-icon" src={job.networks.find(x => x.role.toString() === "Customer")?.image} alt="profile-pic" />}
                        {job.networks.find(x => x.role.toString() === "Customer")?.displayName === null
                            ? <p>{job.networks.find(x => x.role.toString() === "Customer")?.username}</p>
                            : <p>{job.networks.find(x => x.role.toString() === "Customer")?.displayName}</p>}
                        <p>Description: {job.networks.find(x => x.role.toString() === "Customer")?.description}</p>
                        <p>Total jobs: {job.networks.find(x => x.role.toString() === "Customer")?.jobsCount}</p>
                        <p>Total reviews: {job.networks.find(x => x.role.toString() === "Customer")?.reviewsCount}</p>
                    </div>
                </section>

                <section className="job-contents-container">
                    <div className="thread-author">
                        <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                    </div>
                    <div className="job-thread-post">
                        <div className="thread-subtitle">
                            <span className="thread-location">
                                {job.jobLocation.townOrCity}
                            </span> - Posted by {job.networks.find(x => x.role.toString() === "Customer")?.username} - {dateFormatter(job.addedOn)}
                        </div>
                        <p className="thread-title">{job.title} </p>
                        <p className="thread-subtitle">{job.serviceCategories.map((category: ServiceCategory, index: number) => (
                            <span className="job-tag" key={index}># {category.toString().replace(/[A-Z]/g, ' $&').trim()} </span>
                        ))}</p>

                        <p className="thread-content">{job.description}</p>


                        <section className="thread-carousel" style={{ gridTemplateColumns: `repeat(${job!.jobContents.length},calc(100vw / 10))` }}>
                            {job?.jobContents.map((content: JobContent, index: number) => (
                                <div style={{ position: "relative" }} key={content.id}>
                                    <img className="job-thumbnail" src={content.url} alt={content.caption} />
                                    <span className="job-numbering">{index + 1}</span>
                                </div>
                            ))}
                        </section>

                        <section className="job-applicants">
                            <div>
                                <p>Shortlisted: </p>
                                {job.networks.filter(x => x.role.toString() === "ShortlistedCompany").map((network: NetworkDto) => (
                                    <div key={network.username}>
                                        <button className="networker-button" onClick={() => setApplicant(network)}>
                                            {network.displayName ? network.displayName : network.username}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>Interested: </p>
                                {job.networks.filter(x => x.role.toString() === "InterestedCompany").map((network: NetworkDto) => (
                                    <div key={network.username}>
                                        <button className="networker-button" onClick={() => setApplicant(network)}>
                                            {network.displayName ? network.displayName : network.username}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto auto auto", gridGap: "20px", marginTop: "20px" }}>
                            {userStore.isLoggedIn && userStore.user?.username === job.networks.find(x => x.role.toString() === "Customer")?.username
                                ?
                                <button className="thread-button" style={{ fontWeight: "600", border: "1px solid #000" }}>Edit</button>
                                :
                                <button className="thread-button" style={{ fontWeight: "600", border: "1px solid #000" }}>Apply</button>
                            }
                            <button className="thread-button">Share</button>
                        </div>


                    </div>
                </section>

                <section>
                    {applicant
                        ? <div className="job-author-container">
                            {applicant.role === JobNetworkRole.ShortlistedCompany ? <p>Shortlisted applicant:</p> : <p>Interested applicant:</p>}
                            {applicant.image !== null
                                ? <img className="large-user-icon" src={applicant.image} alt="profile-pic" />
                                : <img className="large-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
                            }
                            <p>{applicant.displayName ? applicant.displayName : applicant.username}</p>
                            <p>Description: {applicant.description}</p>
                            <p>Total jobs: {applicant.jobsCount}</p>
                            <p>Total reviews: {applicant.reviewsCount}</p>
                            {userStore.isLoggedIn && userStore.user?.username === job.networks.find(x => x.role.toString() === "Customer")?.username
                                ? (applicant.role === JobNetworkRole.ShortlistedCompany
                                    ? <p>Paid/Not Paid</p>
                                    : <button className="thread-button" onClick={() => { }}>Shortlist Applicant</button>)
                                : null
                            }
                            {userStore.isLoggedIn && userStore.user?.username === job.networks.find(x => x.role.toString() === "Customer")?.username &&
                                <div className="job-chats">
                                    <p>Message from {applicant.displayName ? applicant.displayName : applicant.username}: </p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                </div>}
                        </div>
                        : null}
                </section>

            </div>
        </div>
    )
})