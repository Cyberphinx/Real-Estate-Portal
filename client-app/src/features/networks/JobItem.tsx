import { Content } from "leaflet";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../app/common/HelperFunctions";
import { Job, JobContent, JobNetworkRole } from "../../app/model/Job";
import { ServiceCategory } from "../../app/model/ServiceCategory";
import { useStore } from "../../app/stores/store";
import './JobItem.css';


interface Props {
    job: Job;
}

export default observer(function JobItem({ job }: Props) {
    const { userStore, profileStore } = useStore();

    const [image, setImage] = useState<JobContent>(job!.jobContents[0]);
    function handleImage(event: SyntheticEvent, state: JobContent) {
        event.stopPropagation();
        setImage(state);
    }

    const scrollRef = useRef<any>(null);
    const scroll = (event: SyntheticEvent, scrollOffset: number) => {
        event.stopPropagation();
        scrollRef.current.scrollLeft += scrollOffset;
    };

    function handlePrev(event: SyntheticEvent) {
        if (job!.jobContents.indexOf(image) === 0) return null;
        else {
            setImage(job!.jobContents[job!.jobContents.indexOf(image) - 1]);
        }
    }

    function handleNext(event: SyntheticEvent) {
        event.stopPropagation();
        if (job!.jobContents.indexOf(image) < job!.jobContents.length - 1) {
            setImage(job!.jobContents[job!.jobContents.indexOf(image) + 1]);
        }
        else {
            return null;
        }
    }

    return (
        <article className="thread-container">
            <div className="thread-author">
                <img className="default-user-icon" src="/assets/default-user-icon.jpg" alt="user" />
            </div>
            <div className="thread-post">
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

                <section className="thread-gallery">
                    <div className="thread-carousel" style={{ gridTemplateColumns: `repeat(${job!.jobContents.length},calc(100vw / 10))` }} ref={scrollRef}>
                        {job?.jobContents.map((content: JobContent, index: number) => (
                            <div style={{ position: "relative" }} key={content.id}>
                                <img className="job-thumbnail" src={content.url} alt={content.caption} onClick={(e) => handleImage(e, content)} />
                                <span className="job-numbering">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                    {/* <button className="left-arr-thumbnails" onClick={(e) => scroll(e, -120)}><img className="left-ico" src="/assets/previous.svg" alt="previous" /></button>
                    <button className="right-arr-thumbnails" onClick={(e) => scroll(e, 120)}><img className="right-ico" src="/assets/next.svg" alt="next" /></button> */}
                </section>

                <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto auto auto", gridGap: "20px", marginTop: "20px" }}>
                    {userStore.isLoggedIn && profileStore.userJobs.find(x => x.id === job.id) ?
                        <button className="thread-button" style={{ fontWeight: "600", border: "1px solid #000" }}>Edit</button>
                        :
                        <button className="thread-button" style={{ fontWeight: "600", border: "1px solid #000" }}>Apply</button>
                    }

                    {/* <button className="thread-button">View</button> */}
                    <button className="thread-button">Share</button>
                </div>
            </div>
        </article>
    )
})