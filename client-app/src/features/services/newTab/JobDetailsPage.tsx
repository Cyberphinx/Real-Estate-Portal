import './JobDetailsPage.css';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/common/loading/LoadingComponent";
import { JobMediaDto, JobNetworkRole, NetworkDto } from "../../../app/model/Job";
import { useStore } from "../../../app/stores/store";
import { dateFormatter } from "../../../app/common/HelperFunctions";
import Nav from '../../../app/layout/Nav';

export default observer(function JobDetailsPage() {
    const { id } = useParams();
    const { jobStore, userStore } = useStore();
    const { loadJob, loadingJob, selectedJob: job, cancelSelectJob } = jobStore;
    const { isLoggedIn, user } = userStore;

    const [applicant, setApplicant] = useState<NetworkDto>();

    useEffect(() => {
        if (id) loadJob(id);
        return () => cancelSelectJob();
    }, [id, loadJob, cancelSelectJob])

    const customer = job?.networks.find(x => x.role.toString() === "Customer");

    const userIcon = () => {
        if (job) {
            let customer = job.networks.find(x => x.role.toString() === "Customer");

            if (job.customerImage && job.customerImage.length > 0) {
                return job.customerImage;
            }

            if (customer && customer.image.length > 0) {
                return customer!.image;
            }
        }

        return "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-sheep_civgh4.svg"
    }

    if (loadingJob || !job) return <LoadingComponent content={"Loading job..."} />;

    return (
        <div>
            <Nav />
            <div className="job-page-container">
                <section>
                    <div className="job-author-container">
                        <img className="large-user-icon" src={userIcon()} alt="user" />
                        {customer?.displayName === null
                            ? <p>{customer?.username}</p>
                            : <p>{customer?.displayName}</p>}
                        <p>Description: {customer?.description}</p>
                        <p>Total jobs: {customer?.jobsCount}</p>
                        <p>Total reviews: {customer?.reviewsCount}</p>
                    </div>
                </section>

                <section className="job-contents-container">
                    <div className="thread-author">
                        <img className="default-user-icon" src={userIcon()} alt="user" />
                    </div>
                    <div className="job-thread-post">
                        <div className="thread-subtitle">
                            <span className="thread-location">
                                {job.jobLocations[0].townOrCity}
                            </span> - Posted by {customer?.displayName} - {dateFormatter(job.addedOn)}
                        </div>
                        <p className="thread-title">{job.title} </p>
                        <p className="thread-subtitle">{job.serviceCategories.map((category: string, index: number) => (
                            <span className="job-tag" key={index}># {category.toString().replace(/[A-Z]/g, ' $&').trim()} </span>
                        ))}</p>

                        <p className="thread-content">{job.description}</p>


                        <section className="thread-carousel" style={{ gridTemplateColumns: `repeat(${job!.jobMedia.length},calc(100vw / 10))` }}>
                            {job?.jobMedia.map((content: JobMediaDto, index: number) => (
                                <div style={{ position: "relative" }} key={content.id}>
                                    <img className="job-thumbnail" src={content.url} alt={content.caption} />
                                    <span className="job-numbering">{index + 1}</span>
                                </div>
                            ))}
                        </section>

                        <section className="job-applicants">
                            <div>
                                <p>Shortlisted applicants: </p>
                                {job.networks.filter(x => x.role.toString() === "ShortlistedCompany").map((network: NetworkDto) => (
                                    <div key={network.username} style={{ background: '#f5f5f5', margin: '1rem 0rem', padding: '0.3rem 1rem 1rem 1rem', borderRadius: '1rem' }}>
                                        <h3>{network.displayName ? network.displayName : network.username}</h3>
                                        <button className="networker-button" onClick={() => setApplicant(network)}>
                                            View profile
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>Interested applicants: </p>
                                {job.networks.filter(x => x.role.toString() === "InterestedCompany").map((network: NetworkDto, index: number) => (
                                    <div key={index} style={{ background: '#f5f5f5', margin: '1rem 0rem', padding: '0.3rem 1rem 1rem 1rem', borderRadius: '1rem' }}>
                                        <h3>{network.displayName ? network.displayName : network.username}</h3>
                                        <button className="networker-button" onClick={() => setApplicant(network)}>
                                            View profile
                                        </button>
                                        {isLoggedIn && user?.username === customer?.username &&
                                            <button className="networker-button">Shortlist applicant</button>
                                        }

                                    </div>
                                ))}
                            </div>
                        </section>

                        <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto auto auto", gridGap: "20px", marginTop: "20px" }}>
                            {userStore.isLoggedIn && userStore.user?.username === customer?.username
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
                            {userStore.isLoggedIn && userStore.user?.username === customer?.username
                                ? (applicant.role === JobNetworkRole.ShortlistedCompany
                                    ? <p>Paid/Not Paid</p>
                                    : <button className="thread-button" onClick={() => { }}>Shortlist Applicant</button>)
                                : null
                            }
                            {/* {userStore.isLoggedIn && userStore.user?.username === customer?.username &&
                                <div className="job-chats">
                                    <p>Message from {applicant.displayName ? applicant.displayName : applicant.username}: </p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                    <p>Chats</p>
                                </div>} */}
                        </div>
                        : null}
                </section>

            </div>
        </div>
    )
})