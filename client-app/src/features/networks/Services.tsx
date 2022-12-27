import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingPlaceholder from "../../app/common/loading/LoadingPlaceholder";
import { Job, JobContent } from "../../app/model/Job";
import { ServiceCategory } from "../../app/model/ServiceCategory";
import { useStore } from "../../app/stores/store";
import JobItem from "./JobItem";
import './Services.css';

export default observer(function Services() {
    const { jobStore, userStore, profileStore } = useStore();
    const { jobs, loadingJobs, loadJobs, selectJob, selectedJob } = jobStore;

    useEffect(() => {
        if (userStore.isLoggedIn) {
            profileStore.loadUserJobs(userStore.user!.username);
        };
    }, [userStore.isLoggedIn, userStore.user])

    return (
        <div className="services-hub">
            <div className="forum-toolbar">
                <div style={{ padding: "8px" }}>
                    <button>Heating</button>
                    <button>Handyman</button>
                    <button>Plumbing</button>
                    <button>Electrician</button>
                    <button>Gardening</button>
                    <button>Cleaning</button>
                    <button>Removals</button>
                </div>
                <div style={{ padding: "8px" }}>
                    <button style={{ float: "right" }}>Post a job</button>
                    <button style={{ float: "right" }}>Join as a tradesperson</button>
                </div>
            </div>
            <div className="forum-container">
                <section>

                </section>
                <section>
                    {loadingJobs ?
                        <div className='placeh-container'>
                            <LoadingPlaceholder />
                            <LoadingPlaceholder />
                            <LoadingPlaceholder />
                            <LoadingPlaceholder />
                        </div>
                        : jobs.map((job: Job) => (
                            <Link to={`/job/${job?.id}`} target="_blank" key={job.id} style={{textDecoration:"none"}}>
                                <JobItem job={job} />
                            </Link>
                        ))}
                </section>

                <section className="channel-profile">
                    {/* <article>
                        <p>Jobs Tagged #Central Heating</p>
                        <p style={{ fontSize: "14px" }}>When choosing the right heating engineer, there are some key issues you need to think about. In this article, we’ll take you through them step by step.</p>
                        <ul style={{ fontSize: "14px" }}>
                            <li>Choose someone with lots of specific experience</li>
                            <li>If your job involves gas, check whether the tradesperson is Gas Safe-registered</li>
                            <li>Get a detailed quote from each tradesperson you’re considering</li>
                            <li>Ask each tradesperson to explain what they plan to do</li>
                            <li>Ask about professional qualifications and accreditation</li>
                            <li>Discuss materials before work starts</li>
                        </ul>
                    </article>
                    <article>
                        <p>Price Guide</p>
                        <ul style={{ fontSize: "14px" }}>
                            <li>Underfloor heating costs</li>
                            <li>Cost of installing central heating</li>
                            <li>Boiler installation costs</li>
                            <li>Boiler replacement costs</li>
                            <li>Boiler replacement costs</li>
                            <li>Boiler service costs</li>
                            <li>Boiler repair costs</li>
                        </ul>
                    </article> */}
                </section>
            </div>
        </div>
    )
})