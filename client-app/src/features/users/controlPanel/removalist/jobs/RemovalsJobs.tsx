import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../../../app/common/loading/LoadingComponent";
import priceFormatter from "../../../../../app/common/PriceFormatter";
import DateTag from "../../../../../app/common/tags/DateTag";
import { Job, JobLocation } from "../../../../../app/model/Job";
import { useStore } from "../../../../../app/stores/store";
import "./RemovalsJobs.css";

export default observer(function RemovalsJobs() {
    const { userStore, jobStore } = useStore();
    const { user } = userStore;
    const { jobs, loadingJobs } = jobStore;

    return (
        <div className="view-listings" id="agent-listings">
            <div className="view-listings__toolbar">
                <h1 className="view-listings__title">
                    You have 3 jobs on Sanctum!
                </h1>

                <button className="view-listings__create-button">
                    <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to={'/create-listing'}
                        target="_blank"
                    >Create invoice</Link>
                </button>
            </div>

            <ul className="view-listings__filters">
                <li className='view-listings__filters-item'>
                    <div className="view-listings__button-group">
                        <button
                            className="view-listings__button"
                        >For rent</button>
                        <button
                            className="view-listings__button"
                        >For sale</button>
                    </div>
                </li>

                {/* <li className='view-listings__filters-item'>
                    <div ref={typesRef}>
                        <button
                            className={typesPanel ? "view-listings__filters-button-selected"
                                : (predicate.has("propertyTypes") ? "view-listings__filters-button-selected"
                                    : "view-listings__filters-button")}
                            onClick={toggleTypes}>
                            Property Type
                        </button>
                        {typesPanel && <PropertyTypes
                            checked={predicate.get("propertyTypes")}
                            onChange={(items: string[]) => setPredicate("propertyTypes", items)}
                            predicate={predicate}
                        />}
                    </div>
                </li> */}

                <li className='view-listings__filters-item'>
                    <input className="view-listings__input" placeholder="Enter job reference" onChange={() => { }} />
                    <button className="view-listings__search-button">
                        <img src="/assets/search.svg" alt="ref" className="view-listings__search-icon" />
                    </button>
                </li>
            </ul>

            <div className="view-listing__container">
                {loadingJobs ?
                    <div style={{ position: 'absolute', left: '40%', top: '60%' }}>
                        <LoadingComponent content={'Loading...'} />
                    </div>
                    :
                    jobs.map((job: Job) => (
                        <div key={job.id} className="view-listing__item">
                            <div className="view-listing__grid">
                                <Link to={`/listing/${job?.id}`} target="_blank" className="view-listing__link">
                                    <DateTag listing={job} />
                                    {job.jobMedia[0] ? <img className="agent-listing-image" src={job.jobMedia[0].url} alt="property" />
                                        : <img className="agent-listing-image"
                                            src={'https://res.cloudinary.com/dwcsdudyn/image/upload/v1674919816/Placeholder/Placeholder_view_vector_uufvu4.svg'}
                                            alt="property" />}
                                </Link>

                                <section style={{ position: 'relative', marginLeft: '2rem' }}>
                                    <article style={{ fontSize: '1.25rem' }}>
                                        <span>{job.title}</span>
                                    </article>

                                    <article style={{ position: 'absolute', top: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <span className="view-listing__reference" >
                                            {job.id}
                                        </span>
                                        <span className="view-listing__reference">
                                            Move date: 
                                        </span>
                                        <span className="view-listing__reference" >
                                            {job.jobLifeCycle}
                                        </span>
                                    </article>

                                    <article style={{ padding: '5rem 5rem 0 0', fontSize: '1.125rem' }}>
                                        <p>{job.propertyType}</p>
                                        <p>{job.bedrooms} bedrooms, {job.bathrooms} bathrooms</p>
                                        <p>{job.jobLocations.map((item: JobLocation) => (
                                            <div key={item.id}>
                                                <h2>{item.addressType}</h2>
                                                <p>{item.postalCode}</p>
                                                <p>{item.townOrCity}</p>
                                            </div>
                                        ))}</p>
                                    </article>
                                </section>
                            </div>
                            <button className="view-listing__edit-button">
                                <Link to={`/manage/${job.id}`} target="_blank"
                                    style={{ color: '#fff', textDecoration: 'none' }}
                                >Edit</Link>
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
})